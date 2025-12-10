import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const nombre = searchParams.get('nombre')

    if (nombre) {
      const config = await prisma.configuracionFormulario.findUnique({
        where: { nombreFormulario: nombre },
      })
      return NextResponse.json(config || null)
    }

    const configs = await prisma.configuracionFormulario.findMany({
      orderBy: { nombreFormulario: 'asc' },
    })
    return NextResponse.json(configs)
  } catch (error) {
    console.error('Error fetching form config:', error)
    return NextResponse.json(
      { error: 'Error al obtener la configuración' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, nombreFormulario, emailDestino, asuntoEmail, mensajeExito, activo } = body

    if (!nombreFormulario || !emailDestino || !asuntoEmail || !mensajeExito) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const config = await prisma.configuracionFormulario.upsert({
      where: { nombreFormulario },
      update: {
        emailDestino,
        asuntoEmail,
        mensajeExito,
        activo: activo !== undefined ? activo : true,
      },
      create: {
        nombreFormulario,
        emailDestino,
        asuntoEmail,
        mensajeExito,
        activo: activo !== undefined ? activo : true,
      },
    })

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error saving form config:', error)
    return NextResponse.json(
      { error: 'Error al guardar la configuración' },
      { status: 500 }
    )
  }
}

