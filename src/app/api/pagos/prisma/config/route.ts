import { NextRequest, NextResponse } from 'next/server'
import { getPrismaConfig, isPrismaConfigured, getPrismaInstallments } from '@/lib/prisma-payments'

/**
 * GET - Obtener configuración pública de Prisma para el frontend
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bin = searchParams.get('bin')
    const amount = searchParams.get('amount')

    // Si se solicitan cuotas
    if (bin && amount) {
      if (!isPrismaConfigured()) {
        return NextResponse.json(
          { error: 'Prisma no está configurado' },
          { status: 500 }
        )
      }

      try {
        const installments = await getPrismaInstallments(bin, parseFloat(amount))
        return NextResponse.json({ installments })
      } catch (error: any) {
        console.error('Error getting installments:', error)
        return NextResponse.json(
          { error: 'Error al obtener cuotas' },
          { status: 500 }
        )
      }
    }

    // Devolver configuración pública
    const config = getPrismaConfig()
    
    return NextResponse.json({
      configured: isPrismaConfigured(),
      publicKey: config.publicKey,
      siteId: config.siteId,
      // No devolver la URL de API para seguridad
    })
  } catch (error: any) {
    console.error('Error getting Prisma config:', error)
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
      { status: 500 }
    )
  }
}

