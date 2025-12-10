import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, direccion, localidad, mensaje } = body

    if (!nombre || !email || !telefono || !direccion) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const solicitud = await prisma.solicitudVisita.create({
      data: {
        nombre,
        email,
        telefono,
        direccion,
        localidad: localidad || '',
        mensaje: mensaje || '',
      },
    })

    return NextResponse.json({ success: true, data: solicitud })
  } catch (error) {
    console.error('Error creating solicitud visita:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const solicitudes = await prisma.solicitudVisita.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(solicitudes)
  } catch (error) {
    console.error('Error fetching solicitudes:', error)
    return NextResponse.json(
      { error: 'Error al obtener solicitudes' },
      { status: 500 }
    )
  }
}

