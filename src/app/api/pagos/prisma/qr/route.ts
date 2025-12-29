import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPrismaQRPayment, getPrismaQRStatus } from '@/lib/prisma-payments'

// POST - Crear un nuevo QR de pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Token de pago requerido' },
        { status: 400 }
      )
    }

    // Buscar el pago existente
    const pago = await prisma.pago.findUnique({
      where: { token },
    })

    if (!pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Crear QR con Prisma
    const qrResult = await createPrismaQRPayment({
      monto: pago.monto,
      cliente: pago.cliente,
      idPedido: pago.idPedido || undefined,
      token: pago.token,
      descripcion: `Pago MELE ROLLER - ${pago.cliente}`,
    })

    if (!qrResult.success) {
      return NextResponse.json(
        { error: qrResult.error || 'Error al generar QR' },
        { status: 500 }
      )
    }

    // Actualizar el pago con la información del QR
    await prisma.pago.update({
      where: { token },
      data: {
        prismaPaymentId: qrResult.qrId,
        prismaInitPoint: qrResult.paymentUrl,
        prismaStatus: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      qrData: qrResult.qrData,
      qrCode: qrResult.qrCode,
      qrId: qrResult.qrId,
      expiresAt: qrResult.expiresAt,
      paymentUrl: qrResult.paymentUrl,
    })
  } catch (error) {
    console.error('Error creating QR payment:', error)
    return NextResponse.json(
      { error: 'Error al crear el QR de pago' },
      { status: 500 }
    )
  }
}

// GET - Consultar estado de un QR
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const qrId = searchParams.get('qrId')
    const token = searchParams.get('token')

    if (!qrId && !token) {
      return NextResponse.json(
        { error: 'qrId o token requerido' },
        { status: 400 }
      )
    }

    if (token) {
      // Buscar por token interno
      const pago = await prisma.pago.findUnique({
        where: { token },
      })

      if (!pago) {
        return NextResponse.json(
          { error: 'Pago no encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        status: pago.estado,
        prismaStatus: pago.prismaStatus,
        qrId: pago.prismaPaymentId,
      })
    }

    // Consultar estado del QR en Prisma
    const status = await getPrismaQRStatus(qrId!)
    return NextResponse.json(status)
  } catch (error) {
    console.error('Error getting QR status:', error)
    return NextResponse.json(
      { error: 'Error al consultar estado del QR' },
      { status: 500 }
    )
  }
}

