/**
 * Utilidades para generar IDs numéricos secuenciales para solicitudes
 */

import { prisma } from './prisma'

/**
 * Obtiene el siguiente número secuencial para solicitudes de visita
 */
export async function getNextVisitaNumber(): Promise<number> {
  try {
    // Buscar todas las solicitudes de visita ordenadas por creación
    const todasLasVisitas = await prisma.solicitudVisita.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Extraer números de los IDs que ya tienen formato VISITA-{numero}
    const numeros = todasLasVisitas
      .map(v => {
        if (v.id.startsWith('VISITA-')) {
          const numero = parseInt(v.id.replace('VISITA-', ''))
          return isNaN(numero) ? 0 : numero
        }
        return 0
      })
      .filter(n => n > 0)

    // Si hay números, encontrar el máximo y sumar 1
    if (numeros.length > 0) {
      const maxNumero = Math.max(...numeros)
      // Verificar que no exista ya el siguiente número (por si hay concurrencia)
      const siguienteId = `VISITA-${maxNumero + 1}`
      const existe = await prisma.solicitudVisita.findUnique({
        where: { id: siguienteId },
      })
      if (existe) {
        // Si existe, buscar el siguiente disponible
        let numero = maxNumero + 2
        while (true) {
          const idTest = `VISITA-${numero}`
          const existeTest = await prisma.solicitudVisita.findUnique({
            where: { id: idTest },
          })
          if (!existeTest) break
          numero++
        }
        return numero
      }
      return maxNumero + 1
    }

    // Si no hay números (solo IDs antiguos), empezar desde 1
    return 1
  } catch (error) {
    console.error('Error obteniendo siguiente número de visita:', error)
    // En caso de error, retornar timestamp como fallback
    return Date.now()
  }
}

/**
 * Obtiene el siguiente número secuencial para solicitudes de presupuesto
 */
export async function getNextPresupuestoNumber(): Promise<number> {
  try {
    // Buscar todas las solicitudes de presupuesto ordenadas por creación
    const todosLosPresupuestos = await prisma.solicitudPresupuesto.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Extraer números de los IDs que ya tienen formato PRESUPUESTO-{numero}
    const numeros = todosLosPresupuestos
      .map(p => {
        if (p.id.startsWith('PRESUPUESTO-')) {
          const numero = parseInt(p.id.replace('PRESUPUESTO-', ''))
          return isNaN(numero) ? 0 : numero
        }
        return 0
      })
      .filter(n => n > 0)

    // Si hay números, encontrar el máximo y sumar 1
    if (numeros.length > 0) {
      const maxNumero = Math.max(...numeros)
      // Verificar que no exista ya el siguiente número (por si hay concurrencia)
      const siguienteId = `PRESUPUESTO-${maxNumero + 1}`
      const existe = await prisma.solicitudPresupuesto.findUnique({
        where: { id: siguienteId },
      })
      if (existe) {
        // Si existe, buscar el siguiente disponible
        let numero = maxNumero + 2
        while (true) {
          const idTest = `PRESUPUESTO-${numero}`
          const existeTest = await prisma.solicitudPresupuesto.findUnique({
            where: { id: idTest },
          })
          if (!existeTest) break
          numero++
        }
        return numero
      }
      return maxNumero + 1
    }

    // Si no hay números (solo IDs antiguos), empezar desde 1
    return 1
  } catch (error) {
    console.error('Error obteniendo siguiente número de presupuesto:', error)
    // En caso de error, retornar timestamp como fallback
    return Date.now()
  }
}

/**
 * Genera un ID para una solicitud de visita
 */
export async function generateVisitaId(): Promise<string> {
  const numero = await getNextVisitaNumber()
  return `VISITA-${numero}`
}

/**
 * Genera un ID para una solicitud de presupuesto
 */
export async function generatePresupuestoId(): Promise<string> {
  const numero = await getNextPresupuestoNumber()
  return `PRESUPUESTO-${numero}`
}

