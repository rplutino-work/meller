import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los banners (incluyendo inactivos) para admin
export async function GET() {
  try {
    const banners = await prisma.heroBanner.findMany({
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

