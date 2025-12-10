import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generatePaymentToken, createMercadoPagoPreference } from '@/lib/mercado-pago'

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
    const { cliente, idCliente, idPedido, monto, maxCuotas, estado } = body

    // Generar token único
    const token = generatePaymentToken()

    // Crear preferencia en Mercado Pago
    let mercadoPagoId: string | null = null
    let mercadoPagoInitPoint: string | null = null

    try {
      const preference = await createMercadoPagoPreference({
        monto: parseFloat(monto),
        cliente,
        idPedido,
        maxCuotas: parseInt(maxCuotas) || 1,
        token,
      })
      
      // Log para debugging
      console.log('Mercado Pago preference response:', JSON.stringify(preference, null, 2))
      
      // Acceder a los campos correctamente según la estructura de la respuesta
      mercadoPagoId = preference.id || null
      mercadoPagoInitPoint = preference.init_point || null
      
      console.log('Mercado Pago ID:', mercadoPagoId)
      console.log('Mercado Pago Init Point:', mercadoPagoInitPoint)
    } catch (error: any) {
      console.error('Error creating Mercado Pago preference:', error)
      console.error('Error details:', error.message, error.response?.data || error.body)
      // Continuar creando el pago aunque falle Mercado Pago
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
        mercadoPagoId,
        mercadoPagoInitPoint,
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

