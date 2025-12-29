import { NextRequest, NextResponse } from 'next/server'

/**
 * POST - Procesar un pago con tarjeta mediante Prisma
 * 
 * NOTA: Esta funcionalidad no está disponible actualmente.
 * La API de pagos con tarjeta de Prisma requiere habilitación especial.
 * Por favor, usar pagos por QR en su lugar.
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Pagos con tarjeta no disponibles',
      message: 'La API de pagos con tarjeta de Prisma no está habilitada. Por favor, use pagos por QR.',
      suggestion: 'Crear un nuevo pago seleccionando "Prisma Medios de Pago (QR)" como método de pago.'
    },
    { status: 501 } // Not Implemented
  )
}
