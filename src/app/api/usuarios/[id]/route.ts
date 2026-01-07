import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'

// GET - Obtener un usuario por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser || currentUser.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'No tienes permisos' }, { status: 403 })
    }

    const { id } = await params
    const usuario = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        canManageVisitas: true,
        canManagePresupuestos: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json(usuario)
  } catch (error) {
    console.error('Error fetching usuario:', error)
    return NextResponse.json(
      { error: 'Error al obtener usuario' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar usuario
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser || currentUser.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Solo el superadmin puede editar usuarios' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { email, password, name, role, canManageVisitas, canManagePresupuestos } = body

    // Validar rol si se proporciona
    if (role && !['SUPERADMIN', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Rol inválido. Debe ser SUPERADMIN o ADMIN' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    
    if (email !== undefined) {
      // Verificar que el email no esté en uso por otro usuario
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      if (existingUser && existingUser.id !== id) {
        return NextResponse.json(
          { error: 'El email ya está en uso' },
          { status: 400 }
        )
      }
      updateData.email = email
    }
    
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role
    if (canManageVisitas !== undefined) updateData.canManageVisitas = canManageVisitas
    if (canManagePresupuestos !== undefined) updateData.canManagePresupuestos = canManagePresupuestos
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const usuario = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        canManageVisitas: true,
        canManagePresupuestos: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return NextResponse.json(usuario)
  } catch (error) {
    console.error('Error updating usuario:', error)
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar usuario
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser || currentUser.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Solo el superadmin puede eliminar usuarios' }, { status: 403 })
    }

    const { id } = await params

    // No permitir eliminar el propio usuario
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: 'No puedes eliminar tu propio usuario' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting usuario:', error)
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    )
  }
}


