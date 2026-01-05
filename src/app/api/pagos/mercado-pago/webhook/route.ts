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
    
    // Logs detallados solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Webhook recibido:', JSON.stringify(body, null, 2))
    } else {
      console.log('Webhook recibido de Mercado Pago')
    }
    
    // Mercado Pago puede enviar diferentes tipos de notificaciones
    // Tipo 1: { type: 'payment', data: { id: '...' } }
    // Tipo 2: { action: 'payment.created', data: { id: '...' } }
    // Tipo 3: { id: '...', type: 'payment' } (notificación directa)
    // Tipo 4: { data: { id: '...' } } (notificación simple)
    
    let paymentId: string | null = null
    
    if (body.type === 'payment' && body.data?.id) {
      paymentId = body.data.id.toString()
    } else if (body.action === 'payment.created' && body.data?.id) {
      paymentId = body.data.id.toString()
    } else if (body.id && body.type === 'payment') {
      paymentId = body.id.toString()
    } else if (body.data?.id) {
      paymentId = body.data.id.toString()
    }

    if (!paymentId) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Webhook recibido sin payment ID válido:', body)
      }
      // Retornar 200 para que Mercado Pago no reintente
      return NextResponse.json({ received: true, message: 'No payment ID found' })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Procesando webhook para payment ID: ${paymentId}`)
    }

    // Obtener información del pago desde Mercado Pago
    let paymentInfo
    try {
      paymentInfo = await payment.get({ id: paymentId })
      if (process.env.NODE_ENV === 'development') {
        console.log('Payment info obtenida:', JSON.stringify(paymentInfo, null, 2))
      }
    } catch (error: any) {
      console.error('Error obteniendo payment info:', error.message)
      return NextResponse.json({ received: true, error: 'Error fetching payment' }, { status: 200 })
    }

    if (paymentInfo && paymentInfo.external_reference) {
      const token = paymentInfo.external_reference
      const status = paymentInfo.status

      if (process.env.NODE_ENV === 'development') {
        console.log(`Actualizando pago ${token} con estado: ${status}`)
      } else {
        console.log(`Actualizando pago ${token.substring(0, 8)}... con estado: ${status}`)
      }

      // Mapear estados de Mercado Pago a nuestros estados
      let estado = 'GENERADO'
      if (status === 'approved') {
        estado = 'APROBADO'
      } else if (status === 'refunded') {
        estado = 'DEVUELTO'
      } else if (status === 'rejected' || status === 'cancelled') {
        estado = 'RECHAZADO'
      }

      // Actualizar el pago en la base de datos
      try {
        await prisma.pago.update({
          where: { token },
          data: {
            estado,
            mercadoPagoId: paymentInfo.id?.toString() || null,
            mercadoPagoStatus: status || null,
            fechaPago: status === 'approved' ? new Date() : null,
          },
        })

        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ Pago ${token} actualizado a estado: ${estado}`)
        } else {
          console.log(`✅ Pago actualizado: ${estado}`)
        }
      } catch (dbError: any) {
        console.error('Error actualizando en BD:', dbError.message)
        // Continuar y retornar 200 para que Mercado Pago no reintente
      }
    } else {
      console.log('⚠️ Payment info sin external_reference:', {
        hasPaymentInfo: !!paymentInfo,
        externalReference: paymentInfo?.external_reference,
        paymentId: paymentInfo?.id
      })
    }

    return NextResponse.json({ received: true, processed: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error.message, error.stack)
    // Retornar 200 para que Mercado Pago no reintente
    return NextResponse.json(
      { received: true, error: 'Error al procesar el webhook', message: error.message },
      { status: 200 }
    )
  }
}

