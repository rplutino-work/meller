import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'

const prisma = new PrismaClient()

async function dump() {
  console.log('Conectando a Neon...')

  const data = {}

  console.log('Dumping Users...')
  data.users = await prisma.user.findMany()
  console.log(`  -> ${data.users.length} users`)

  console.log('Dumping SolicitudVisita...')
  data.solicitudVisita = await prisma.solicitudVisita.findMany()
  console.log(`  -> ${data.solicitudVisita.length} solicitudes de visita`)

  console.log('Dumping SolicitudPresupuesto...')
  data.solicitudPresupuesto = await prisma.solicitudPresupuesto.findMany()
  console.log(`  -> ${data.solicitudPresupuesto.length} solicitudes de presupuesto`)

  console.log('Dumping SolicitudContacto...')
  data.solicitudContacto = await prisma.solicitudContacto.findMany()
  console.log(`  -> ${data.solicitudContacto.length} solicitudes de contacto`)

  console.log('Dumping AsignacionTurno...')
  data.asignacionTurno = await prisma.asignacionTurno.findMany()
  console.log(`  -> ${data.asignacionTurno.length} asignaciones`)

  console.log('Dumping ConfiguracionFormulario...')
  data.configuracionFormulario = await prisma.configuracionFormulario.findMany()
  console.log(`  -> ${data.configuracionFormulario.length} configuraciones de formulario`)

  console.log('Dumping Configuracion...')
  data.configuracion = await prisma.configuracion.findMany()
  console.log(`  -> ${data.configuracion.length} configuraciones`)

  console.log('Dumping HeroBanner...')
  data.heroBanner = await prisma.heroBanner.findMany()
  console.log(`  -> ${data.heroBanner.length} banners`)

  console.log('Dumping Pago...')
  data.pago = await prisma.pago.findMany()
  console.log(`  -> ${data.pago.length} pagos`)

  const outputPath = '/Users/rodri/meller/scripts/neon-dump.json'
  writeFileSync(outputPath, JSON.stringify(data, null, 2))
  console.log(`\nDump completo guardado en ${outputPath}`)

  await prisma.$disconnect()
}

dump().catch(e => {
  console.error('Error:', e)
  process.exit(1)
})
