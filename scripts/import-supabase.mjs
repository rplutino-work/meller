import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()

async function importData() {
  const dump = JSON.parse(readFileSync('/Users/rodri/meller/scripts/neon-dump.json', 'utf-8'))

  console.log('Importando a Supabase...\n')

  // 1. Users
  console.log(`Importando ${dump.users.length} users...`)
  for (const user of dump.users) {
    await prisma.user.create({ data: user })
  }
  console.log('  ✓ Users OK')

  // 2. AsignacionTurno
  console.log(`Importando ${dump.asignacionTurno.length} asignaciones...`)
  for (const item of dump.asignacionTurno) {
    await prisma.asignacionTurno.create({ data: item })
  }
  console.log('  ✓ AsignacionTurno OK')

  // 3. ConfiguracionFormulario
  if (dump.configuracionFormulario.length > 0) {
    console.log(`Importando ${dump.configuracionFormulario.length} config formularios...`)
    for (const item of dump.configuracionFormulario) {
      await prisma.configuracionFormulario.create({ data: item })
    }
    console.log('  ✓ ConfiguracionFormulario OK')
  } else {
    console.log('  - No hay ConfiguracionFormulario')
  }

  // 4. Configuracion
  console.log(`Importando ${dump.configuracion.length} configuraciones...`)
  for (const item of dump.configuracion) {
    await prisma.configuracion.create({ data: item })
  }
  console.log('  ✓ Configuracion OK')

  // 5. HeroBanner
  console.log(`Importando ${dump.heroBanner.length} banners...`)
  for (const item of dump.heroBanner) {
    await prisma.heroBanner.create({ data: item })
  }
  console.log('  ✓ HeroBanner OK')

  // 6. SolicitudVisita
  console.log(`Importando ${dump.solicitudVisita.length} solicitudes de visita...`)
  for (const item of dump.solicitudVisita) {
    await prisma.solicitudVisita.create({ data: item })
  }
  console.log('  ✓ SolicitudVisita OK')

  // 7. SolicitudPresupuesto
  console.log(`Importando ${dump.solicitudPresupuesto.length} solicitudes de presupuesto...`)
  for (const item of dump.solicitudPresupuesto) {
    await prisma.solicitudPresupuesto.create({ data: item })
  }
  console.log('  ✓ SolicitudPresupuesto OK')

  // 8. SolicitudContacto
  if (dump.solicitudContacto.length > 0) {
    console.log(`Importando ${dump.solicitudContacto.length} solicitudes de contacto...`)
    for (const item of dump.solicitudContacto) {
      await prisma.solicitudContacto.create({ data: item })
    }
    console.log('  ✓ SolicitudContacto OK')
  } else {
    console.log('  - No hay SolicitudContacto')
  }

  // 9. Pago
  console.log(`Importando ${dump.pago.length} pagos...`)
  for (const item of dump.pago) {
    await prisma.pago.create({ data: item })
  }
  console.log('  ✓ Pago OK')

  console.log('\n✅ Importación completa!')

  // Verificar conteos
  const counts = {
    users: await prisma.user.count(),
    visitas: await prisma.solicitudVisita.count(),
    presupuestos: await prisma.solicitudPresupuesto.count(),
    contactos: await prisma.solicitudContacto.count(),
    banners: await prisma.heroBanner.count(),
    pagos: await prisma.pago.count(),
    configuraciones: await prisma.configuracion.count(),
    asignaciones: await prisma.asignacionTurno.count(),
  }
  console.log('\nVerificación de conteos:')
  for (const [table, count] of Object.entries(counts)) {
    console.log(`  ${table}: ${count}`)
  }

  await prisma.$disconnect()
}

importData().catch(e => {
  console.error('Error:', e)
  process.exit(1)
})
