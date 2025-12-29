import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PRISMA_PAYMENT_STATUS } from '@/lib/prisma-payments'

/**
 * POST - Webhook de Prisma Medios de Pago
 * Recibe notificaciones de cambios de estado de pagos
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Prisma webhook received:', JSON.stringify(body, null, 2))

    const { id, status, site_transaction_id } = body

    if (!id && !site_transaction_id) {
      return NextResponse.json(
        { error: 'Datos insuficientes' },
        { status: 400 }
      )
    }

    // Buscar el pago por prismaPaymentId o transactionId
    let pago = null
    
    if (id) {
      pago = await prisma.pago.findFirst({
        where: { prismaPaymentId: String(id) },
      })
    }
    
    if (!pago && site_transaction_id) {
      pago = await prisma.pago.findFirst({
        where: { prismaTransactionId: site_transaction_id },
      })
    }

    if (!pago) {
      console.warn('Pago no encontrado para Prisma webhook:', { id, site_transaction_id })
      // Devolver 200 para que Prisma no reintente
      return NextResponse.json({ received: true })
    }

    // Determinar el nuevo estado
    const statusString = PRISMA_PAYMENT_STATUS[status] || 'unknown'
    let nuevoEstado = pago.estado

    if (statusString === 'approved') {
      nuevoEstado = 'APROBADO'
    } else if (statusString === 'rejected' || statusString === 'annulled') {
      nuevoEstado = 'RECHAZADO'
    } else if (statusString === 'pending' || statusString === 'review') {
      nuevoEstado = 'PENDIENTE'
    }

    // Actualizar el pago
    await prisma.pago.update({
      where: { id: pago.id },
      data: {
        estado: nuevoEstado,
        prismaStatus: statusString,
        fechaPago: nuevoEstado === 'APROBADO' ? new Date() : pago.fechaPago,
      },
    })

    console.log(`Pago ${pago.token} actualizado a estado: ${nuevoEstado}`)

    return NextResponse.json({ received: true, status: nuevoEstado })
  } catch (error: any) {
    console.error('Error processing Prisma webhook:', error)
    // Devolver 200 para evitar reintentos infinitos
    return NextResponse.json({ received: true, error: error.message })
  }
}

// GET para verificación del endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Prisma webhook endpoint is active',
  })
}

