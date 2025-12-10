import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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

  console.log('Usuario admin creado:', admin.email)

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
    console.log('Configuración creada:', config.nombreFormulario)
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

  console.log('Datos de ejemplo creados')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

