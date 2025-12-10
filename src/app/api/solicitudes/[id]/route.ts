import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { estado, notas, tipo } = body

    if (tipo === 'visita') {
      const solicitud = await prisma.solicitudVisita.update({
        where: { id },
        data: { estado, notas },
      })
      return NextResponse.json(solicitud)
    } else if (tipo === 'presupuesto') {
      const solicitud = await prisma.solicitudPresupuesto.update({
        where: { id },
        data: { estado, notas },
      })
      return NextResponse.json(solicitud)
    }

    return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
  } catch (error) {
    console.error('Error updating solicitud:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la solicitud' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')

    if (tipo === 'visita') {
      await prisma.solicitudVisita.delete({ where: { id } })
    } else if (tipo === 'presupuesto') {
      await prisma.solicitudPresupuesto.delete({ where: { id } })
    } else {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting solicitud:', error)
    return NextResponse.json(
      { error: 'Error al eliminar la solicitud' },
      { status: 500 }
    )
  }
}

