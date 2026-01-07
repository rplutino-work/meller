/**
 * Script para asegurar que el usuario admin@meleroller.com.ar tenga rol SUPERADMIN
 * Ejecutar con: npx tsx scripts/setup-superadmin.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function setupSuperAdmin() {
  try {
    const adminEmail = 'admin@meleroller.com.ar'
    
    // Buscar el usuario
    let user = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (!user) {
      console.log('⚠️  Usuario admin@meleroller.com.ar no encontrado.')
      console.log('   Por favor, crea el usuario primero desde el panel de administración.')
      return
    }

    // Actualizar el rol a SUPERADMIN si no lo es
    if (user.role !== 'SUPERADMIN') {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'SUPERADMIN' }
      })
      console.log('✅ Usuario actualizado a SUPERADMIN')
    } else {
      console.log('✅ El usuario ya es SUPERADMIN')
    }

    console.log('\n📋 Información del usuario:')
    console.log(`   Email: ${user.email}`)
    console.log(`   Nombre: ${user.name || 'Sin nombre'}`)
    console.log(`   Rol: SUPERADMIN`)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupSuperAdmin()


