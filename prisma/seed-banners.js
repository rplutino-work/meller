const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const defaultBanners = [
  {
    titulo: 'BMW',
    subtitulo: 'Persianas y cortinas para las nuevas instalaciones de la marca en Argentina',
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    features: JSON.stringify([
      { title: 'Control total de luz', desc: 'para mayor productividad y enfoque.' },
      { title: 'Elegancia y funcionalidad', desc: 'en cada espacio de trabajo.' },
      { title: 'Privacidad ajustable', desc: 'sin perder luminosidad natural.' },
    ]),
    ubicacion: 'Oficinas BMW en Argentina',
    categoria: 'Muy utilizadas en oficinas, hoteles y negocios.',
    orden: 0,
    activo: true,
  },
  {
    titulo: 'Embajada',
    subtitulo: 'de Bélgica en Argentina con cortinados tradicionales a medida.',
    imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    features: JSON.stringify([
      { title: 'Luz suave y privacidad ajustable', desc: 'en cada ambiente.' },
      { title: 'Contraste de texturas', desc: 'que aporta elegancia y formalidad.' },
      { title: 'Personalización para reflejar la identidad', desc: 'cultural del espacio.' },
    ]),
    ubicacion: 'Embajada de Bélgica en Argentina',
    categoria: 'Muy utilizadas para decorar ambientes y oficinas.',
    orden: 1,
    activo: true,
  },
  {
    titulo: 'Fontenla',
    subtitulo: 'Oficinas y locales de la marca en roller sunscreen.',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    features: JSON.stringify([
      { title: 'Control de luz sin perder conexión', desc: 'con el exterior.' },
      { title: 'Diseño moderno y funcional', desc: 'para ambientes profesionales.' },
      { title: 'Protege de los rayos UV', desc: 'sin oscurecer el espacio.' },
    ]),
    ubicacion: 'Fontenla',
    categoria: 'Conocé toda nuestra variedad.',
    orden: 2,
    activo: true,
  },
  {
    titulo: 'Depto. Boom',
    subtitulo: 'Diseño e instalación de sistemas a medida para cada ambiente.',
    imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    features: JSON.stringify([
      { title: 'Un toque de estilo', desc: 'que realza los ambientes.' },
      { title: 'Sistemas de accionamiento', desc: 'manual y automático.' },
      { title: 'Bandas verticales', desc: 'para control de la luz.' },
    ]),
    ubicacion: 'Dpto. Boom PLLI Castelar',
    categoria: 'Ideales para cocinas, livings y dormitorios.',
    orden: 3,
    activo: true,
  },
  {
    titulo: 'Casa Nordelta',
    subtitulo: 'En conjunto con el estudio de arquitectura Vanguarda, diseñamos e instalamos cortinados para personalizar cada ambiente.',
    imagen: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    features: JSON.stringify([
      { title: 'Elegancia que', desc: 'aporta decoración.' },
      { title: 'Control gradual de', desc: 'paso de luz solar.' },
      { title: 'Simplicidad de uso', desc: 'como divisor de espacio.' },
    ]),
    ubicacion: 'Casa en Nordelta',
    categoria: 'Ideal para restaurantes, hoteles y centros de estética.',
    orden: 4,
    activo: true,
  },
]

async function main() {
  console.log('🌱 Iniciando migración de banners...')

  // Verificar si ya existen banners
  const existingBanners = await prisma.heroBanner.count()
  
  if (existingBanners > 0) {
    console.log(`⚠️  Ya existen ${existingBanners} banners en la base de datos.`)
    console.log('   Si deseas migrar los banners por defecto, elimina los existentes primero.')
    return
  }

  // Crear los banners
  for (const banner of defaultBanners) {
    await prisma.heroBanner.create({
      data: banner,
    })
    console.log(`✅ Banner "${banner.titulo}" creado`)
  }

  console.log(`\n✨ Migración completada: ${defaultBanners.length} banners creados`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

