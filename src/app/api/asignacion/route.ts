import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// GET - Obtener estado de asignación (usuarios habilitados + turnos)
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Solo el superadmin puede gestionar asignaciones' }, { status: 403 })
    }

    const usuarios = await prisma.user.findMany({
      where: { role: { not: 'SUPERADMIN' } },
      select: { id: true, name: true, email: true, recibeConsultas: true, pesoAsignacion: true },
      orderBy: { name: 'asc' },
    })

    const turnos = await prisma.asignacionTurno.findMany()

    return NextResponse.json({ usuarios, turnos })
  } catch (error) {
    console.error('Error fetching asignacion config:', error)
    return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 })
  }
}

// PUT - Actualizar qué usuarios reciben consultas
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Solo el superadmin puede gestionar asignaciones' }, { status: 403 })
    }

    const body = await request.json()
    const { usuariosHabilitados, pesos } = body // Array of user IDs + weight map

    if (!Array.isArray(usuariosHabilitados)) {
      return NextResponse.json({ error: 'usuariosHabilitados debe ser un array' }, { status: 400 })
    }

    // Desactivar todos, luego activar los seleccionados
    await prisma.user.updateMany({
      where: { role: { not: 'SUPERADMIN' } },
      data: { recibeConsultas: false },
    })

    if (usuariosHabilitados.length > 0) {
      await prisma.user.updateMany({
        where: { id: { in: usuariosHabilitados } },
        data: { recibeConsultas: true },
      })
    }

    // Actualizar pesos si se enviaron
    if (pesos && typeof pesos === 'object') {
      for (const [userId, peso] of Object.entries(pesos)) {
        const pesoNum = Math.max(1, Math.min(10, Number(peso) || 1))
        await prisma.user.update({
          where: { id: userId },
          data: { pesoAsignacion: pesoNum },
        })
      }
    }

    const updated = await prisma.user.findMany({
      where: { recibeConsultas: true },
      select: { id: true, name: true, email: true, pesoAsignacion: true },
    })

    return NextResponse.json({ success: true, habilitados: updated })
  } catch (error) {
    console.error('Error updating asignacion config:', error)
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 })
  }
}
