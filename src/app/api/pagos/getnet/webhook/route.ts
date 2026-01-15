import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Webhook de Getnet para actualizar estados de pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Logs detallados solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Webhook Getnet recibido:', JSON.stringify(body, null, 2))
    } else {
      console.log('Webhook recibido de Getnet')
    }
    
    // Getnet puede enviar diferentes tipos de notificaciones
    // Ajustar según la estructura real de la API de Getnet
    let paymentId: string | null = null
    let orderId: string | null = null
    let status: string | null = null
    
    // Intentar extraer el ID del pago desde diferentes estructuras posibles
    if (body.id) {
      paymentId = body.id.toString()
    } else if (body.order_id) {
      orderId = body.order_id.toString()
    } else if (body.payment?.id) {
      paymentId = body.payment.id.toString()
    } else if (body.data?.id) {
      paymentId = body.data.id.toString()
    }
    
    // Intentar extraer el estado
    if (body.status) {
      status = body.status
    } else if (body.payment?.status) {
      status = body.payment.status
    } else if (body.data?.status) {
      status = body.data.status
    }
    
    // Buscar el pago por order_id (token) o payment_id
    const token = orderId || body.external_reference || body.order?.order_id
    if (!token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Webhook recibido sin token válido:', body)
      }
      return NextResponse.json({ received: true, message: 'No token found' })
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Procesando webhook Getnet para token: ${token}`)
    }
    
    // Buscar el pago en la base de datos
    const pago = await prisma.pago.findUnique({
      where: { token: token.toString() },
    })
    
    if (!pago) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Pago no encontrado para token: ${token}`)
      }
      return NextResponse.json({ received: true, message: 'Pago no encontrado' })
    }
    
    // Mapear estados de Getnet a estados internos
    let estadoInterno = pago.estado
    if (status) {
      const statusLower = status.toLowerCase()
      if (statusLower === 'approved' || statusLower === 'completed' || statusLower === 'success') {
        estadoInterno = 'APROBADO'
      } else if (statusLower === 'rejected' || statusLower === 'failed' || statusLower === 'cancelled') {
        estadoInterno = 'RECHAZADO'
      } else if (statusLower === 'pending' || statusLower === 'processing') {
        estadoInterno = 'PENDIENTE'
      }
    }
    
    // Actualizar el pago en la base de datos
    const updateData: any = {
      getnetStatus: status || pago.getnetStatus,
      estado: estadoInterno,
    }
    
    if (paymentId) {
      updateData.getnetTransactionId = paymentId
    }
    
    if (estadoInterno === 'APROBADO' && !pago.fechaPago) {
      updateData.fechaPago = new Date()
    }
    
    await prisma.pago.update({
      where: { id: pago.id },
      data: updateData,
    })
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Pago ${pago.id} actualizado: ${estadoInterno}`)
    }
    
    return NextResponse.json({ received: true, status: estadoInterno })
  } catch (error: any) {
    console.error('Error procesando webhook de Getnet:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}


