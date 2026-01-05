import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener un pago por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const pago = await prisma.pago.findUnique({
      where: { id },
    })

    if (!pago) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(pago)
  } catch (error) {
    console.error('Error fetching pago:', error)
    return NextResponse.json(
      { error: 'Error al obtener el pago' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un pago
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { cliente, idCliente, idPedido, monto, maxCuotas, estado } = body

    // Obtener el pago actual para verificar si el estado cambió
    const pagoActual = await prisma.pago.findUnique({
      where: { id },
    })

    const updateData: any = {
      cliente: cliente !== undefined ? cliente : undefined,
      idCliente: idCliente !== undefined ? idCliente : undefined,
      idPedido: idPedido !== undefined ? idPedido : undefined,
      monto: monto !== undefined ? parseFloat(monto) : undefined,
      maxCuotas: maxCuotas !== undefined ? parseInt(maxCuotas) : undefined,
      estado: estado !== undefined ? estado : undefined,
    }

    // Si el estado cambió a APROBADO, actualizar fechaPago
    if (estado === 'APROBADO' && pagoActual?.estado !== 'APROBADO') {
      updateData.fechaPago = new Date()
    }
    // Si el estado cambió de APROBADO a otro, limpiar fechaPago
    else if (estado !== 'APROBADO' && pagoActual?.estado === 'APROBADO') {
      updateData.fechaPago = null
    }

    const pago = await prisma.pago.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(pago)
  } catch (error) {
    console.error('Error updating pago:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el pago' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un pago
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.pago.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting pago:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el pago' },
      { status: 500 }
    )
  }
}

