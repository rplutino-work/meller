import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generatePaymentToken, createMercadoPagoPreference } from '@/lib/mercado-pago'
import { createPrismaCheckout, isPrismaConfigured } from '@/lib/prisma-payments'

// GET - Obtener todos los pagos (para admin) o un pago por token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const estado = searchParams.get('estado')
    const ultimos30Dias = searchParams.get('ultimos30dias') === 'true'

    // Si se busca por token, retornar ese pago específico
    if (token) {
      const pago = await prisma.pago.findUnique({
        where: { token },
      })

      if (!pago) {
        return NextResponse.json(
          { error: 'Pago no encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json(pago)
    }

    // Si no hay token, listar pagos
    const where: any = {}
    if (estado) {
      where.estado = estado
    }

    if (ultimos30Dias) {
      const fechaLimite = new Date()
      fechaLimite.setDate(fechaLimite.getDate() - 30)
      where.fechaPago = {
        gte: fechaLimite,
      }
      where.estado = 'APROBADO'
    }

    const pagos = await prisma.pago.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(pagos)
  } catch (error) {
    console.error('Error fetching pagos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los pagos' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cliente, idCliente, idPedido, monto, maxCuotas, estado, metodoPago, proveedor } = body

    // Generar token único
    const token = generatePaymentToken()

    // Variables para almacenar datos del proveedor
    let mercadoPagoId: string | null = null
    let mercadoPagoInitPoint: string | null = null
    let prismaPaymentId: string | null = null
    let prismaInitPoint: string | null = null
    
    const selectedProveedor = proveedor || 'mercadopago'
    const selectedMetodo = metodoPago || 'checkout'

    if (selectedProveedor === 'mercadopago') {
      // MERCADO PAGO
      if (selectedMetodo === 'checkout') {
        // Método Checkout: crear preferencia y generar link
        try {
          const preference = await createMercadoPagoPreference({
            monto: parseFloat(monto),
            cliente,
            idPedido,
            maxCuotas: parseInt(maxCuotas) || 1,
            token,
          })
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Mercado Pago preference response:', JSON.stringify(preference, null, 2))
          }
          
          mercadoPagoId = preference.id || null
          mercadoPagoInitPoint = preference.init_point || null
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Mercado Pago ID:', mercadoPagoId)
            console.log('Mercado Pago Init Point:', mercadoPagoInitPoint)
          } else {
            console.log(`Preferencia MP creada: ${mercadoPagoId}`)
          }
        } catch (error: any) {
          console.error('Error creating Mercado Pago preference:', error)
          console.error('Error details:', error.message, error.response?.data || error.body)
        }
      } else if (selectedMetodo === 'gateway') {
        console.log('Pago creado con Mercado Pago Gateway - se procesará directamente con tarjeta')
      }
    } else if (selectedProveedor === 'prisma') {
      // PRISMA MEDIOS DE PAGO
      if (!isPrismaConfigured()) {
        console.warn('Prisma Medios de Pago no está configurado correctamente')
      }
      
      try {
        const prismaCheckout = await createPrismaCheckout({
          monto: parseFloat(monto),
          cliente,
          idPedido,
          maxCuotas: parseInt(maxCuotas) || 1,
          token,
        })
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Prisma checkout config:', JSON.stringify(prismaCheckout, null, 2))
        }
        
        // Para Prisma QR, el paymentUrl es la URL interna de la página de pago
        // El QR se genera dinámicamente cuando el cliente accede a la página
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
          || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
        prismaInitPoint = prismaCheckout.paymentUrl || `${baseUrl}/pagar/${token}?provider=prisma`
        
      } catch (error: any) {
        console.error('Error creating Prisma checkout:', error)
      }
    }

    // Crear pago en la base de datos
    const pago = await prisma.pago.create({
      data: {
        cliente,
        idCliente: idCliente || null,
        idPedido: idPedido || null,
        monto: parseFloat(monto),
        maxCuotas: parseInt(maxCuotas) || 1,
        estado: estado || 'GENERADO',
        token,
        proveedor: selectedProveedor,
        metodoPago: selectedMetodo,
        mercadoPagoId,
        mercadoPagoInitPoint,
        prismaPaymentId,
        prismaInitPoint,
      },
    })

    return NextResponse.json(pago)
  } catch (error) {
    console.error('Error creating pago:', error)
    return NextResponse.json(
      { error: 'Error al crear el pago' },
      { status: 500 }
    )
  }
}

