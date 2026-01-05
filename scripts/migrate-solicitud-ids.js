/**
 * Script para migrar IDs antiguos (CUID) a formato numérico (VISITA-1, PRESUPUESTO-1, etc.)
 * Ejecutar con: node scripts/migrate-solicitud-ids.js
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function migrateSolicitudIds() {
  try {
    console.log('🔄 Iniciando migración de IDs de solicitudes...')
    console.log('')

    // Migrar Solicitudes de Visita
    console.log('📋 Migrando Solicitudes de Visita...')
    const visitas = await prisma.solicitudVisita.findMany({
      orderBy: { createdAt: 'asc' },
    })

    let visitaNumero = 1
    for (const visita of visitas) {
      // Solo migrar si no tiene formato VISITA-{numero}
      if (!visita.id.startsWith('VISITA-')) {
        const nuevoId = `VISITA-${visitaNumero}`
        
        // Verificar que el nuevo ID no exista
        const existe = await prisma.solicitudVisita.findUnique({
          where: { id: nuevoId },
        })

        if (!existe) {
          try {
            // Actualizar referencias en pagos si existen
            // Buscar pagos que tengan el ID antiguo como idPedido o que tengan formato VISITA-{idAntiguo}
            await prisma.pago.updateMany({
              where: {
                OR: [
                  { idPedido: visita.id },
                  { idPedido: `VISITA-${visita.id}` },
                ],
              },
              data: {
                idPedido: nuevoId,
              },
            })

            // Crear nueva solicitud con nuevo ID
            await prisma.solicitudVisita.create({
              data: {
                id: nuevoId,
                nombre: visita.nombre,
                email: visita.email,
                telefono: visita.telefono,
                direccion: visita.direccion,
                localidad: visita.localidad,
                mensaje: visita.mensaje,
                estado: visita.estado,
                notas: visita.notas,
                createdAt: visita.createdAt,
                updatedAt: visita.updatedAt,
              },
            })

            // Eliminar la solicitud antigua
            await prisma.solicitudVisita.delete({
              where: { id: visita.id },
            })

            console.log(`   ✅ ${visita.id} → ${nuevoId}`)
          } catch (error) {
            console.error(`   ❌ Error migrando ${visita.id}:`, error.message)
          }
        } else {
          console.log(`   ⚠️  ${nuevoId} ya existe, saltando ${visita.id}`)
        }
        visitaNumero++
      } else {
        // Ya tiene formato correcto, verificar número
        const numero = parseInt(visita.id.replace('VISITA-', ''))
        if (!isNaN(numero) && numero >= visitaNumero) {
          visitaNumero = numero + 1
        }
        console.log(`   ✓ ${visita.id} ya tiene formato correcto`)
      }
    }

    console.log('')
    console.log('📋 Migrando Solicitudes de Presupuesto...')
    const presupuestos = await prisma.solicitudPresupuesto.findMany({
      orderBy: { createdAt: 'asc' },
    })

    let presupuestoNumero = 1
    for (const presupuesto of presupuestos) {
      // Solo migrar si no tiene formato PRESUPUESTO-{numero}
      if (!presupuesto.id.startsWith('PRESUPUESTO-')) {
        const nuevoId = `PRESUPUESTO-${presupuestoNumero}`
        
        // Verificar que el nuevo ID no exista
        const existe = await prisma.solicitudPresupuesto.findUnique({
          where: { id: nuevoId },
        })

        if (!existe) {
          try {
            // Actualizar referencias en pagos si existen
            // Buscar pagos que tengan el ID antiguo como idPedido o que tengan formato PRESUPUESTO-{idAntiguo}
            await prisma.pago.updateMany({
              where: {
                OR: [
                  { idPedido: presupuesto.id },
                  { idPedido: `PRESUPUESTO-${presupuesto.id}` },
                ],
              },
              data: {
                idPedido: nuevoId,
              },
            })

            // Crear nueva solicitud con nuevo ID
            await prisma.solicitudPresupuesto.create({
              data: {
                id: nuevoId,
                nombre: presupuesto.nombre,
                email: presupuesto.email,
                telefono: presupuesto.telefono,
                productos: presupuesto.productos,
                estado: presupuesto.estado,
                notas: presupuesto.notas,
                createdAt: presupuesto.createdAt,
                updatedAt: presupuesto.updatedAt,
              },
            })

            // Eliminar la solicitud antigua
            await prisma.solicitudPresupuesto.delete({
              where: { id: presupuesto.id },
            })

            console.log(`   ✅ ${presupuesto.id} → ${nuevoId}`)
          } catch (error) {
            console.error(`   ❌ Error migrando ${presupuesto.id}:`, error.message)
          }
        } else {
          console.log(`   ⚠️  ${nuevoId} ya existe, saltando ${presupuesto.id}`)
        }
        presupuestoNumero++
      } else {
        // Ya tiene formato correcto, verificar número
        const numero = parseInt(presupuesto.id.replace('PRESUPUESTO-', ''))
        if (!isNaN(numero) && numero >= presupuestoNumero) {
          presupuestoNumero = numero + 1
        }
        console.log(`   ✓ ${presupuesto.id} ya tiene formato correcto`)
      }
    }

    console.log('')
    console.log('✅ Migración completada')
  } catch (error) {
    console.error('❌ Error en la migración:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateSolicitudIds()

