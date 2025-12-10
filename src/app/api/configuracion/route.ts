import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clave = searchParams.get('clave')

    if (clave) {
      const config = await prisma.configuracion.findUnique({
        where: { clave },
      })
      return NextResponse.json(config)
    }

    const configs = await prisma.configuracion.findMany({
      where: { activo: true },
    })
    return NextResponse.json(configs)
  } catch (error) {
    console.error('Error fetching configuracion:', error)
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clave, valor, tipo, activo } = body

    if (!clave || valor === undefined) {
      return NextResponse.json(
        { error: 'Clave y valor son requeridos' },
        { status: 400 }
      )
    }

    const config = await prisma.configuracion.upsert({
      where: { clave },
      update: {
        valor: typeof valor === 'string' ? valor : JSON.stringify(valor),
        tipo: tipo || 'texto',
        activo: activo !== undefined ? activo : true,
      },
      create: {
        clave,
        valor: typeof valor === 'string' ? valor : JSON.stringify(valor),
        tipo: tipo || 'texto',
        activo: activo !== undefined ? activo : true,
      },
    })

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error saving configuracion:', error)
    return NextResponse.json(
      { error: 'Error al guardar configuración' },
      { status: 500 }
    )
  }
}




