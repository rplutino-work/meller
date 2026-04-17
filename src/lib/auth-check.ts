import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from './prisma'

/**
 * Verifica que el usuario esté autenticado y sea admin.
 * Retorna el usuario si todo está bien, o una NextResponse de error.
 */
export async function requireAdmin(): Promise<
  { user: { id: string; email: string; role: string } } | NextResponse
> {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, role: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 })
  }

  return { user }
}

/**
 * Verifica que el usuario sea superadmin.
 */
export async function requireSuperAdmin(): Promise<
  { user: { id: string; email: string; role: string } } | NextResponse
> {
  const result = await requireAdmin()
  if (result instanceof NextResponse) return result

  if (result.user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Se requieren permisos de superadmin' }, { status: 403 })
  }

  return result
}

export function isErrorResponse(result: any): result is NextResponse {
  return result instanceof NextResponse
}
