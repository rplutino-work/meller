/**
 * Script para corregir pagos que tienen mercadoPagoStatus === 'refunded' 
 * pero estado === 'RECHAZADO' y cambiarlos a estado === 'DEVUELTO'
 * Ejecutar con: node scripts/fix-devueltos.js
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixDevueltos() {
  try {
    console.log('🔄 Buscando pagos devueltos con estado incorrecto...')
    console.log('')

    // Buscar pagos que tienen mercadoPagoStatus === 'refunded' pero estado !== 'DEVUELTO'
    const pagosDevueltos = await prisma.pago.findMany({
      where: {
        mercadoPagoStatus: 'refunded',
        estado: {
          not: 'DEVUELTO'
        }
      }
    })

    console.log(`📊 Encontrados ${pagosDevueltos.length} pagos a corregir`)
    console.log('')

    if (pagosDevueltos.length === 0) {
      console.log('✅ No hay pagos para corregir')
      return
    }

    let corregidos = 0
    for (const pago of pagosDevueltos) {
      try {
        await prisma.pago.update({
          where: { id: pago.id },
          data: {
            estado: 'DEVUELTO',
          },
        })
        console.log(`   ✅ ${pago.id.slice(-4)} - ${pago.cliente} - Cambiado de ${pago.estado} a DEVUELTO`)
        corregidos++
      } catch (error) {
        console.error(`   ❌ Error corrigiendo ${pago.id}:`, error.message)
      }
    }

    console.log('')
    console.log(`✅ Corrección completada: ${corregidos} pagos actualizados`)
  } catch (error) {
    console.error('❌ Error en la corrección:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixDevueltos()



