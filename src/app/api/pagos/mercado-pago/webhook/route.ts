import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
})

const payment = new Payment(client)

// POST - Webhook de Mercado Pago para actualizar estados de pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mercado Pago puede enviar diferentes tipos de notificaciones
    // Tipo 1: { type: 'payment', data: { id: '...' } }
    // Tipo 2: { action: 'payment.created', data: { id: '...' } }
    // Tipo 3: { id: '...', type: 'payment' } (notificación directa)
    
    let paymentId: string | null = null
    
    if (body.type === 'payment' && body.data?.id) {
      paymentId = body.data.id
    } else if (body.action === 'payment.created' && body.data?.id) {
      paymentId = body.data.id
    } else if (body.id && body.type === 'payment') {
      paymentId = body.id
    }

    if (!paymentId) {
      console.log('Webhook recibido sin payment ID:', body)
      return NextResponse.json({ received: true, message: 'No payment ID found' })
    }

    // Obtener información del pago desde Mercado Pago
    const paymentInfo = await payment.get({ id: paymentId })

    if (paymentInfo && paymentInfo.external_reference) {
      const token = paymentInfo.external_reference
      const status = paymentInfo.status

      // Mapear estados de Mercado Pago a nuestros estados
      let estado = 'GENERADO'
      if (status === 'approved') {
        estado = 'APROBADO'
      } else if (status === 'rejected' || status === 'cancelled' || status === 'refunded') {
        estado = 'RECHAZADO'
      }

      // Actualizar el pago en la base de datos
      await prisma.pago.update({
        where: { token },
        data: {
          estado,
          mercadoPagoStatus: status,
          fechaPago: status === 'approved' ? new Date() : null,
        },
      })

      console.log(`Pago ${token} actualizado a estado: ${estado}`)
    } else {
      console.log('Payment info sin external_reference:', paymentInfo)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    // Retornar 200 para que Mercado Pago no reintente
    return NextResponse.json(
      { received: true, error: 'Error al procesar el webhook' },
      { status: 200 }
    )
  }
}

