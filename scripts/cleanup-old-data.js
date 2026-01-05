/**
 * Script para borrar todos los pagos y solicitudes que no sean de hoy
 * Ejecutar con: node scripts/cleanup-old-data.js
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanupOldData() {
  try {
    // Obtener la fecha de hoy a las 00:00:00
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    console.log(`🗑️  Limpiando datos anteriores a: ${today.toLocaleString('es-AR')}`)
    console.log('')

    // Contar registros a eliminar
    const [pagosCount, visitasCount, presupuestosCount, contactosCount] = await Promise.all([
      prisma.pago.count({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudVisita.count({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudPresupuesto.count({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudContacto.count({
        where: {
          createdAt: {
            lt: today
          }
        }
      })
    ])

    console.log('📊 Registros a eliminar:')
    console.log(`   - Pagos: ${pagosCount}`)
    console.log(`   - Solicitudes de Visita: ${visitasCount}`)
    console.log(`   - Solicitudes de Presupuesto: ${presupuestosCount}`)
    console.log(`   - Solicitudes de Contacto: ${contactosCount}`)
    console.log(`   - Total: ${pagosCount + visitasCount + presupuestosCount + contactosCount}`)
    console.log('')

    if (pagosCount === 0 && visitasCount === 0 && presupuestosCount === 0 && contactosCount === 0) {
      console.log('✅ No hay registros antiguos para eliminar.')
      return
    }

    console.log('⚠️  Esta operación eliminará permanentemente los registros listados arriba.')
    console.log('   Para continuar, edita este script y cambia CONFIRM_DELETE a true.')
    console.log('')

    const CONFIRM_DELETE = false // Cambiar a true para confirmar y ejecutar

    if (!CONFIRM_DELETE) {
      console.log('❌ Operación cancelada. Cambia CONFIRM_DELETE a true para ejecutar la limpieza.')
      return
    }

    // Eliminar registros
    console.log('🗑️  Eliminando registros...')
    
    const [deletedPagos, deletedVisitas, deletedPresupuestos, deletedContactos] = await Promise.all([
      prisma.pago.deleteMany({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudVisita.deleteMany({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudPresupuesto.deleteMany({
        where: {
          createdAt: {
            lt: today
          }
        }
      }),
      prisma.solicitudContacto.deleteMany({
        where: {
          createdAt: {
            lt: today
          }
        }
      })
    ])

    console.log('')
    console.log('✅ Limpieza completada:')
    console.log(`   - Pagos eliminados: ${deletedPagos.count}`)
    console.log(`   - Solicitudes de Visita eliminadas: ${deletedVisitas.count}`)
    console.log(`   - Solicitudes de Presupuesto eliminadas: ${deletedPresupuestos.count}`)
    console.log(`   - Solicitudes de Contacto eliminadas: ${deletedContactos.count}`)
    console.log(`   - Total eliminado: ${deletedPagos.count + deletedVisitas.count + deletedPresupuestos.count + deletedContactos.count}`)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupOldData()
