import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'

// GET - Listar usuarios (solo superadmin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que el usuario sea superadmin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'No tienes permisos para ver usuarios' }, { status: 403 })
    }

    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        canManageVisitas: true,
        canManagePresupuestos: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(usuarios)
  } catch (error) {
    console.error('Error fetching usuarios:', error)
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    )
  }
}

// POST - Crear usuario (solo superadmin)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que el usuario sea superadmin
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser || currentUser.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Solo el superadmin puede crear usuarios' }, { status: 403 })
    }

    const body = await request.json()
    const { email, password, name, role, canManageVisitas, canManagePresupuestos } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Validar que el rol sea válido
    if (role && !['SUPERADMIN', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Rol inválido. Debe ser SUPERADMIN o ADMIN' },
        { status: 400 }
      )
    }

    // Verificar que el email no exista
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está en uso' },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: role || 'ADMIN',
        canManageVisitas: canManageVisitas !== undefined ? canManageVisitas : true,
        canManagePresupuestos: canManagePresupuestos !== undefined ? canManagePresupuestos : true,
      },
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

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating usuario:', error)
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    )
  }
}


