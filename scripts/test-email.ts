#!/usr/bin/env tsx
/**
 * Script para probar la configuración de emails
 * 
 * Uso:
 *   npm run test-email
 *   O
 *   npx tsx scripts/test-email.ts
 */

import { sendEmail } from '../src/lib/email'

async function testEmail() {
  console.log('🧪 Iniciando prueba de configuración de email...\n')

  // Verificar variables de entorno
  console.log('📋 Verificando variables de entorno:')
  console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || '❌ NO CONFIGURADO'}`)
  console.log(`   SMTP_PORT: ${process.env.SMTP_PORT || '❌ NO CONFIGURADO'}`)
  console.log(`   SMTP_SECURE: ${process.env.SMTP_SECURE || '❌ NO CONFIGURADO'}`)
  console.log(`   SMTP_USER: ${process.env.SMTP_USER || '❌ NO CONFIGURADO'}`)
  console.log(`   SMTP_PASS: ${process.env.SMTP_PASS ? '✅ CONFIGURADO' : '❌ NO CONFIGURADO'}`)
  console.log(`   SMTP_FROM: ${process.env.SMTP_FROM || 'Usará SMTP_USER por defecto'}\n`)

  // Verificar que las variables mínimas estén configuradas
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ ERROR: Faltan variables de entorno SMTP')
    console.error('\n📝 Para configurar:')
    console.error('   1. Agrega las variables SMTP en tu archivo .env (desarrollo)')
    console.error('   2. O en el panel de Vercel → Settings → Environment Variables (producción)')
    console.error('\n📖 Ver CONFIGURACION_EMAILS_NIC.md para más detalles\n')
    process.exit(1)
  }

  // Solicitar email de destino
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const emailDestino = await new Promise<string>((resolve) => {
    readline.question('📧 Ingresa el email de destino para la prueba: ', (email: string) => {
      readline.close()
      resolve(email)
    })
  })

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailDestino)) {
    console.error('❌ ERROR: Email inválido')
    process.exit(1)
  }

  console.log(`\n📤 Enviando email de prueba a: ${emailDestino}...\n`)

  try {
    const result = await sendEmail({
      to: emailDestino,
      subject: '🧪 Prueba de Email - MeleRoller',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .success { color: #28a745; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MeleRoller</h1>
            </div>
            <div class="content">
              <h2>✅ Email de Prueba</h2>
              <p>Si estás recibiendo este email, significa que la configuración SMTP está funcionando correctamente.</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
              <p><strong>Servidor SMTP:</strong> ${process.env.SMTP_HOST}</p>
              <p class="success">🎉 ¡La configuración de emails está correcta!</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Email de Prueba - MeleRoller\n\nSi estás recibiendo este email, significa que la configuración SMTP está funcionando correctamente.\n\nFecha: ${new Date().toLocaleString('es-AR')}\nServidor SMTP: ${process.env.SMTP_HOST}\n\n¡La configuración de emails está correcta!`,
    })

    console.log('✅ Email enviado exitosamente!')
    console.log(`   Message ID: ${result.messageId}\n`)
    console.log('📬 Revisa la bandeja de entrada (y la carpeta de spam) del email destino.\n')
    console.log('💡 Si no recibes el email:')
    console.log('   1. Revisa la carpeta de spam')
    console.log('   2. Verifica que el email destino sea correcto')
    console.log('   3. Espera unos minutos (puede haber demora)')
    console.log('   4. Verifica los logs del servidor para más detalles\n')
  } catch (error: any) {
    console.error('❌ ERROR al enviar email:')
    console.error(`   ${error.message}\n`)

    if (error.code === 'EAUTH') {
      console.error('🔐 Error de autenticación:')
      console.error('   - Verifica que SMTP_USER y SMTP_PASS sean correctos')
      console.error('   - Si usas Gmail, asegúrate de usar una "Contraseña de aplicación"')
      console.error('   - Verifica que la cuenta no tenga restricciones de seguridad\n')
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('🌐 Error de conexión:')
      console.error('   - Verifica que SMTP_HOST sea correcto')
      console.error('   - Verifica que el puerto SMTP_PORT sea correcto')
      console.error('   - Verifica que el firewall no bloquee el puerto SMTP\n')
    } else {
      console.error('📖 Revisa CONFIGURACION_EMAILS_NIC.md para más detalles\n')
    }

    process.exit(1)
  }
}

// Ejecutar
testEmail().catch((error) => {
  console.error('❌ Error inesperado:', error)
  process.exit(1)
})

