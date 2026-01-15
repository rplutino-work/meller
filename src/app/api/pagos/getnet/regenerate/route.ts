import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createGetnetCheckout, isGetnetConfigured } from '@/lib/getnet'

// POST - Regenerar checkout de Getnet para un pago existente
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

    if (!isGetnetConfigured()) {
      return NextResponse.json(
        { error: 'Getnet no está configurado correctamente' },
        { status: 500 }
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

    if (pago.proveedor !== 'getnet') {
      return NextResponse.json(
        { error: 'Este pago no es de Getnet' },
        { status: 400 }
      )
    }

    // Crear checkout de Getnet
    const getnetCheckout = await createGetnetCheckout({
      monto: pago.monto,
      cliente: pago.cliente,
      idPedido: pago.idPedido || undefined,
      maxCuotas: pago.maxCuotas,
      token: pago.token,
    })

    // Actualizar el pago con la información del checkout
    await prisma.pago.update({
      where: { token },
      data: {
        getnetId: getnetCheckout.id || pago.getnetId,
        getnetInitPoint: getnetCheckout.init_point || null,
      },
    })

    return NextResponse.json({
      success: true,
      getnetId: getnetCheckout.id,
      initPoint: getnetCheckout.init_point,
    })
  } catch (error: any) {
    console.error('❌ Error regenerating Getnet checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Error al regenerar el checkout de Getnet' },
      { status: 500 }
    )
  }
}

