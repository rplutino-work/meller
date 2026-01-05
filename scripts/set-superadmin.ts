/**
 * Script para asignar rol SUPERADMIN al usuario admin@meleroller.com.ar
 * Ejecutar con: npx tsx scripts/set-superadmin.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setSuperAdmin() {
  try {
    const adminEmail = 'admin@meleroller.com.ar'
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (!user) {
      console.log('❌ Usuario admin@meleroller.com.ar no encontrado.')
      console.log('   Por favor, crea el usuario primero desde el panel de administración o directamente en la base de datos.')
      return
    }

    // Actualizar el rol a SUPERADMIN
    const updatedUser = await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'SUPERADMIN' }
    })

    console.log('✅ Usuario actualizado exitosamente!')
    console.log('\n📋 Información del usuario:')
    console.log(`   Email: ${updatedUser.email}`)
    console.log(`   Nombre: ${updatedUser.name || 'Sin nombre'}`)
    console.log(`   Rol: ${updatedUser.role}`)
    console.log(`   ID: ${updatedUser.id}`)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setSuperAdmin()

