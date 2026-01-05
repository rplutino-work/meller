import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Devolver un pago en Mercado Pago
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { amount } = body

    // Obtener el pago de la base de datos
    const pago = await prisma.pago.findUnique({
      where: { id },
    })

    if (!pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Solo se pueden devolver pagos aprobados
    if (pago.estado !== 'APROBADO') {
      return NextResponse.json(
        { error: 'Solo se pueden devolver pagos aprobados' },
        { status: 400 }
      )
    }

    // Si es un pago de Mercado Pago, hacer el reembolso
    if (pago.proveedor === 'mercadopago' && pago.mercadoPagoId) {
      try {
        const refundAmount = amount ? parseFloat(amount) : pago.monto
        
        // Hacer el reembolso en Mercado Pago usando la API REST directamente
        const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
        const refundResponse = await fetch(
          `https://api.mercadopago.com/v1/payments/${pago.mercadoPagoId}/refunds`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: refundAmount,
            }),
          }
        )

        if (!refundResponse.ok) {
          const errorData = await refundResponse.json()
          throw new Error(errorData.message || 'Error al procesar reembolso en Mercado Pago')
        }

        const refund = await refundResponse.json()

        // Actualizar el estado del pago en la base de datos
        await prisma.pago.update({
          where: { id },
          data: {
            estado: 'RECHAZADO',
            mercadoPagoStatus: 'refunded',
            fechaPago: null,
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Pago devuelto exitosamente',
          refund: refund,
        })
      } catch (mpError: any) {
        console.error('Error haciendo reembolso en Mercado Pago:', mpError)
        return NextResponse.json(
          { 
            error: 'Error al procesar el reembolso en Mercado Pago',
            details: mpError.message 
          },
          { status: 500 }
        )
      }
    }

    // Si es un pago de Prisma, actualizar solo el estado (reembolso manual)
    if (pago.proveedor === 'prisma') {
      await prisma.pago.update({
        where: { id },
        data: {
          estado: 'RECHAZADO',
          fechaPago: null,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Estado del pago actualizado. Debes procesar el reembolso manualmente en Prisma.',
      })
    }

    // Si no tiene proveedor configurado, solo actualizar el estado
    await prisma.pago.update({
      where: { id },
      data: {
        estado: 'RECHAZADO',
        fechaPago: null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Estado del pago actualizado',
    })
  } catch (error) {
    console.error('Error processing refund:', error)
    return NextResponse.json(
      { error: 'Error al procesar la devolución' },
      { status: 500 }
    )
  }
}

