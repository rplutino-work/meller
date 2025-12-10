const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@meleroller.com.ar' },
    update: {},
    create: {
      email: 'admin@meleroller.com.ar',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuario admin creado:', admin.email)

  // Crear configuración de formularios
  const configs = [
    {
      nombreFormulario: 'visita',
      emailDestino: 'info@meleroller.com.ar',
      asuntoEmail: 'Nueva solicitud de visita - MeleRoller',
      mensajeExito: 'Gracias por tu solicitud. Nos pondremos en contacto para coordinar la visita.',
    },
    {
      nombreFormulario: 'presupuesto',
      emailDestino: 'info@meleroller.com.ar',
      asuntoEmail: 'Nueva solicitud de presupuesto - MeleRoller',
      mensajeExito: 'Gracias por tu solicitud. Te enviaremos tu cotización dentro de las próximas 24 hs. hábiles.',
    },
  ]

  for (const config of configs) {
    await prisma.configuracionFormulario.upsert({
      where: { nombreFormulario: config.nombreFormulario },
      update: {},
      create: config,
    })
    console.log('✅ Configuración creada:', config.nombreFormulario)
  }

  // Crear algunas solicitudes de ejemplo
  await prisma.solicitudVisita.create({
    data: {
      nombre: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      telefono: '11 1234 5678',
      direccion: 'Av. Corrientes 1234',
      localidad: 'CABA',
      mensaje: 'Me interesan las cortinas roller blackout para mi departamento.',
      estado: 'PENDIENTE',
    },
  })

  await prisma.solicitudVisita.create({
    data: {
      nombre: 'Ana López',
      email: 'ana@ejemplo.com',
      telefono: '11 5555 6666',
      direccion: 'Calle Falsa 123',
      localidad: 'Burzaco',
      mensaje: 'Necesito cortinas para toda la casa.',
      estado: 'EN_PROCESO',
    },
  })

  await prisma.solicitudPresupuesto.create({
    data: {
      nombre: 'María García',
      email: 'maria@ejemplo.com',
      telefono: '11 8765 4321',
      productos: JSON.stringify([
        { tipo: 'Roller Blackout', ancho: '150', alto: '200' },
        { tipo: 'Roller Sun Screen (5%)', ancho: '180', alto: '220' },
      ]),
      estado: 'PENDIENTE',
    },
  })

  await prisma.solicitudPresupuesto.create({
    data: {
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
      telefono: '11 9999 8888',
      productos: JSON.stringify([
        { tipo: 'Roller Eclipse', ancho: '200', alto: '250' },
      ]),
      estado: 'COMPLETADO',
    },
  })

  console.log('✅ Datos de ejemplo creados')
  console.log('')
  console.log('🎉 Seed completado!')
  console.log('')
  console.log('📌 Credenciales de acceso al admin:')
  console.log('   Email: admin@meleroller.com.ar')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

