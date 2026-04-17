/**
 * Sistema de asignación round-robin con pesos para solicitudes.
 * Cada usuario tiene un "peso" que indica cuántas consultas consecutivas recibe
 * antes de pasar al siguiente. Ejemplo con Andrea(2) y Gonza(1):
 *   Consulta 1 → Andrea
 *   Consulta 2 → Andrea
 *   Consulta 3 → Gonza
 *   Consulta 4 → Andrea
 *   Consulta 5 → Andrea
 *   Consulta 6 → Gonza
 */

import { prisma } from './prisma'

interface AsignacionResult {
  userId: string
  nombre: string
}

export async function getNextAsignado(tipoSolicitud: 'visita' | 'presupuesto' | 'contacto'): Promise<AsignacionResult | null> {
  // Obtener usuarios habilitados, ordenados por nombre para consistencia
  const usuariosHabilitados = await prisma.user.findMany({
    where: { recibeConsultas: true },
    select: { id: true, name: true, pesoAsignacion: true },
    orderBy: { name: 'asc' },
  })

  if (usuariosHabilitados.length === 0) {
    return null
  }

  // Obtener el turno actual
  const turno = await prisma.asignacionTurno.findUnique({
    where: { tipoSolicitud },
  })

  const ultimoId = turno?.ultimoUsuarioId
  const contadorActual = turno?.contadorTurno ?? 0

  let nextUser: typeof usuariosHabilitados[0]
  let nuevoContador: number

  if (!ultimoId) {
    // Primera asignación: va al primer usuario
    nextUser = usuariosHabilitados[0]
    nuevoContador = 1
  } else {
    const currentIndex = usuariosHabilitados.findIndex(u => u.id === ultimoId)

    if (currentIndex < 0) {
      // El último usuario ya no está habilitado, empezar desde el primero
      nextUser = usuariosHabilitados[0]
      nuevoContador = 1
    } else {
      const currentUser = usuariosHabilitados[currentIndex]
      const pesoActual = currentUser.pesoAsignacion || 1

      if (contadorActual < pesoActual) {
        // Todavía le toca al mismo usuario
        nextUser = currentUser
        nuevoContador = contadorActual + 1
      } else {
        // Pasar al siguiente
        const nextIndex = (currentIndex + 1) % usuariosHabilitados.length
        nextUser = usuariosHabilitados[nextIndex]
        nuevoContador = 1
      }
    }
  }

  // Actualizar el turno
  await prisma.asignacionTurno.upsert({
    where: { tipoSolicitud },
    update: { ultimoUsuarioId: nextUser.id, contadorTurno: nuevoContador },
    create: { tipoSolicitud, ultimoUsuarioId: nextUser.id, contadorTurno: nuevoContador },
  })

  return {
    userId: nextUser.id,
    nombre: nextUser.name || nextUser.id,
  }
}
