import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, productos } = body

    if (!nombre || !email || !telefono || !productos) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const solicitud = await prisma.solicitudPresupuesto.create({
      data: {
        nombre,
        email,
        telefono,
        productos: typeof productos === 'string' ? productos : JSON.stringify(productos),
      },
    })

    return NextResponse.json({ success: true, data: solicitud })
  } catch (error) {
    console.error('Error creating solicitud presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const solicitudes = await prisma.solicitudPresupuesto.findMany({
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

