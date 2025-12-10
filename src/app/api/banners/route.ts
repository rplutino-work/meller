import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los banners
export async function GET() {
  try {
    const banners = await prisma.heroBanner.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
    })

    // Parsear el JSON de features
    const bannersWithFeatures = banners.map(banner => ({
      ...banner,
      features: JSON.parse(banner.features || '[]'),
    }))

    return NextResponse.json(bannersWithFeatures)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { error: 'Error al obtener los banners' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo banner
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { titulo, subtitulo, imagen, features, ubicacion, categoria, orden, activo } = body

    const banner = await prisma.heroBanner.create({
      data: {
        titulo,
        subtitulo,
        imagen,
        features: JSON.stringify(features || []),
        ubicacion: ubicacion || null,
        categoria: categoria || null,
        orden: orden || 0,
        activo: activo !== undefined ? activo : true,
      },
    })

    return NextResponse.json({
      ...banner,
      features: JSON.parse(banner.features),
    })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { error: 'Error al crear el banner' },
      { status: 500 }
    )
  }
}

