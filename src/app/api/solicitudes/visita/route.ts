import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateVisitaId } from '@/lib/solicitud-ids'
import { sendSolicitudEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, direccion, localidad, mensaje } = body

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email y teléfono son obligatorios' },
        { status: 400 }
      )
    }

    // Generar ID numérico secuencial
    const id = await generateVisitaId()

    const solicitud = await prisma.solicitudVisita.create({
      data: {
        id,
        nombre,
        email,
        telefono,
        direccion: direccion || '',
        localidad: localidad || '',
        mensaje: mensaje || '',
      },
    })

    // Enviar email de notificación (no bloquea si falla)
    try {
      await sendSolicitudEmail('visita', {
        id: solicitud.id,
        nombre: solicitud.nombre,
        email: solicitud.email,
        telefono: solicitud.telefono,
        direccion: solicitud.direccion,
        localidad: solicitud.localidad,
        mensaje: solicitud.mensaje,
      })
    } catch (emailError) {
      console.error('Error enviando email (no crítico):', emailError)
      // Continuar aunque falle el email
    }

    return NextResponse.json({ success: true, data: solicitud })
  } catch (error: any) {
    console.error('Error creating solicitud visita:', error)
    
    // Manejar errores específicos de Prisma
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una solicitud con estos datos' },
        { status: 409 }
      )
    }
    
    if (error.message?.includes('connection') || error.message?.includes('Closed')) {
      return NextResponse.json(
        { error: 'Error de conexión a la base de datos. Por favor, intentá de nuevo más tarde.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
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

