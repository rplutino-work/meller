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

    // Validar que el pago tenga mercadoPagoId si es de Mercado Pago
    if (pago.proveedor === 'mercadopago' && !pago.mercadoPagoId) {
      return NextResponse.json(
        { error: 'Este pago no tiene un ID de Mercado Pago asociado. No se puede procesar el reembolso.' },
        { status: 400 }
      )
    }

    // Si es un pago de Mercado Pago, hacer el reembolso
    if (pago.proveedor === 'mercadopago' && pago.mercadoPagoId) {
      try {
        const refundAmount = amount ? parseFloat(amount) : pago.monto
        
        // Generar un idempotency key único para evitar duplicados
        const idempotencyKey = `${pago.id}-${Date.now()}-${Math.random().toString(36).substring(7)}`
        
        // Hacer el reembolso en Mercado Pago usando la API REST directamente
        const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
        const refundResponse = await fetch(
          `https://api.mercadopago.com/v1/payments/${pago.mercadoPagoId}/refunds`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'X-Idempotency-Key': idempotencyKey,
            },
            body: JSON.stringify({
              amount: refundAmount,
            }),
          }
        )

        if (!refundResponse.ok) {
          let errorMessage = 'Error al procesar reembolso en Mercado Pago'
          try {
            const errorData = await refundResponse.json()
            errorMessage = errorData.message || errorData.error || errorMessage
            // Si hay más detalles en el error, incluirlos
            if (errorData.cause && Array.isArray(errorData.cause)) {
              const causes = errorData.cause.map((c: any) => c.description || c.message).filter(Boolean)
              if (causes.length > 0) {
                errorMessage += ': ' + causes.join(', ')
              }
            }
          } catch (e) {
            // Si no se puede parsear el error, usar el status text
            errorMessage = `Error ${refundResponse.status}: ${refundResponse.statusText}`
          }
          throw new Error(errorMessage)
        }

        const refund = await refundResponse.json()

        // Actualizar el estado del pago en la base de datos
        await prisma.pago.update({
          where: { id },
          data: {
            estado: 'DEVUELTO',
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

