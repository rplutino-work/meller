import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string
      canManageVisitas?: boolean
      canManagePresupuestos?: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string
    canManageVisitas?: boolean
    canManagePresupuestos?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    canManageVisitas?: boolean
    canManagePresupuestos?: boolean
  }
}

