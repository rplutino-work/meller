/**
 * Sistema de asignación round-robin para solicitudes.
 * Asigna consultas de forma alternada entre los usuarios habilitados (recibeConsultas = true).
 */

import { prisma } from './prisma'

interface AsignacionResult {
  userId: string
  nombre: string
}

/**
 * Obtiene el siguiente usuario en el turno round-robin para un tipo de solicitud.
 * La lógica es estrictamente secuencial: si el último fue Andrea, el siguiente es Gonza, y viceversa.
 * Si solo queda un usuario habilitado, siempre se le asigna a él.
 * Si no hay usuarios habilitados, retorna null.
 */
export async function getNextAsignado(tipoSolicitud: 'visita' | 'presupuesto' | 'contacto'): Promise<AsignacionResult | null> {
  // Obtener usuarios habilitados para recibir consultas, ordenados por nombre para consistencia
  const usuariosHabilitados = await prisma.user.findMany({
    where: { recibeConsultas: true },
    select: { id: true, name: true },
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

  // Encontrar el índice del último usuario asignado
  let nextIndex = 0
  if (ultimoId) {
    const lastIndex = usuariosHabilitados.findIndex(u => u.id === ultimoId)
    if (lastIndex >= 0) {
      nextIndex = (lastIndex + 1) % usuariosHabilitados.length
    }
    // Si el último usuario ya no está habilitado, empieza desde 0
  }

  const nextUser = usuariosHabilitados[nextIndex]

  // Actualizar el turno
  await prisma.asignacionTurno.upsert({
    where: { tipoSolicitud },
    update: { ultimoUsuarioId: nextUser.id },
    create: { tipoSolicitud, ultimoUsuarioId: nextUser.id },
  })

  return {
    userId: nextUser.id,
    nombre: nextUser.name || nextUser.id,
  }
}
