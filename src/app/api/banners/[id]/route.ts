import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { requireAdmin, isErrorResponse } from '@/lib/auth-check'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const banner = await prisma.heroBanner.findUnique({
      where: { id },
    })

    if (!banner) {
      return NextResponse.json(
        { error: 'Banner no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...banner,
      features: JSON.parse(banner.features || '[]'),
    })
  } catch (error) {
    console.error('Error fetching banner:', error)
    return NextResponse.json(
      { error: 'Error al obtener el banner' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin()
    if (isErrorResponse(authResult)) return authResult

    const { id } = await params
    const body = await request.json()
    const { titulo, subtitulo, imagen, features, ubicacion, categoria, orden, activo } = body

    const banner = await prisma.heroBanner.update({
      where: { id },
      data: {
        titulo,
        subtitulo,
        imagen,
        features: JSON.stringify(features || []),
        ubicacion: ubicacion || null,
        categoria: categoria || null,
        orden: orden !== undefined ? orden : undefined,
        activo: activo !== undefined ? activo : undefined,
      },
    })

    revalidateTag('banners', 'max')

    return NextResponse.json({
      ...banner,
      features: JSON.parse(banner.features),
    })
  } catch (error) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el banner' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin()
    if (isErrorResponse(authResult)) return authResult

    const { id } = await params
    await prisma.heroBanner.delete({
      where: { id },
    })

    revalidateTag('banners', 'max')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el banner' },
      { status: 500 }
    )
  }
}
