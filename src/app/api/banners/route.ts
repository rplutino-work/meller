import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { requireAdmin, isErrorResponse } from '@/lib/auth-check'
import { getCachedBanners } from '@/lib/cached-queries'

export async function GET() {
  try {
    const banners = await getCachedBanners()
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { error: 'Error al obtener los banners' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (isErrorResponse(authResult)) return authResult

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

    revalidateTag('banners', 'max')

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
