import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
})

const payment = new Payment(client)

// POST - Actualizar estado del pago desde los parámetros de redirección
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, paymentId, status } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Token es requerido' },
        { status: 400 }
      )
    }

    // Si hay payment_id, obtener información actualizada de Mercado Pago
    if (paymentId) {
      try {
        const paymentInfo = await payment.get({ id: paymentId.toString() })
        
        if (paymentInfo && paymentInfo.external_reference === token) {
          // Mapear estados de Mercado Pago a nuestros estados
          let estado = 'GENERADO'
          if (paymentInfo.status === 'approved') {
            estado = 'APROBADO'
          } else if (paymentInfo.status === 'refunded') {
            estado = 'DEVUELTO'
          } else if (paymentInfo.status === 'rejected' || paymentInfo.status === 'cancelled') {
            estado = 'RECHAZADO'
          }

          // Actualizar el pago en la base de datos
          await prisma.pago.update({
            where: { token },
            data: {
              estado,
              mercadoPagoId: paymentInfo.id?.toString() || null,
              mercadoPagoStatus: paymentInfo.status || null,
              fechaPago: paymentInfo.status === 'approved' ? new Date() : null,
            },
          })

          return NextResponse.json({ 
            success: true, 
            estado,
            message: `Pago actualizado a ${estado}` 
          })
        }
      } catch (error) {
        console.error('Error fetching payment from Mercado Pago:', error)
      }
    }

    // Si no hay payment_id pero hay status en los parámetros, actualizar directamente
    if (status) {
      let estado = 'GENERADO'
      if (status === 'approved' || status === 'success') {
        estado = 'APROBADO'
      } else if (status === 'rejected' || status === 'failure') {
        estado = 'RECHAZADO'
      }

      await prisma.pago.update({
        where: { token },
        data: {
          estado,
          mercadoPagoStatus: status,
          fechaPago: estado === 'APROBADO' ? new Date() : null,
        },
      })

      return NextResponse.json({ 
        success: true, 
        estado,
        message: `Pago actualizado a ${estado}` 
      })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'No se pudo actualizar el estado' 
    })
  } catch (error) {
    console.error('Error updating payment status:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el estado del pago' },
      { status: 500 }
    )
  }
}

