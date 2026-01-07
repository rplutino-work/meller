import nodemailer from 'nodemailer'
import { prisma } from './prisma'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Crea un transporter de nodemailer usando variables de entorno
 * o configuración por defecto para SMTP
 */
function createTransporter() {
  // Si hay variables de entorno configuradas, usarlas
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // Si no hay configuración, usar un transporter de prueba (solo para desarrollo)
  // En producción, esto fallará y se debe configurar SMTP
  console.warn('⚠️  No hay configuración SMTP. Usando transporter de prueba.')
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'test@ethereal.email',
      pass: 'test',
    },
  })
}

/**
 * Envía un email usando la configuración SMTP
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const transporter = createTransporter()
    
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@meleroller.com.ar'

    console.log('📧 Intentando enviar email:', {
      from,
      to,
      subject,
      smtpHost: process.env.SMTP_HOST || 'NO CONFIGURADO',
      smtpPort: process.env.SMTP_PORT || 'NO CONFIGURADO',
    })

    const info = await transporter.sendMail({
      from: `MeleRoller <${from}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Convertir HTML a texto plano si no se proporciona
    })

    console.log('✅ Email enviado exitosamente:', {
      messageId: info.messageId,
      to,
      subject,
      response: info.response,
    })
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ Error enviando email:', {
      error: error.message,
      code: error.code,
      command: error.command,
      to,
      subject,
      smtpHost: process.env.SMTP_HOST || 'NO CONFIGURADO',
    })
    throw new Error(`Error al enviar email: ${error.message}`)
  }
}

/**
 * Envía un email de notificación cuando se crea una solicitud
 * Usa la configuración de emailDestino desde la base de datos
 */
export async function sendSolicitudEmail(
  tipo: 'visita' | 'presupuesto' | 'contacto',
  datos: {
    nombre: string
    email: string
    telefono: string
    [key: string]: any
  }
) {
  let config: { emailDestino: string; asuntoEmail: string; activo: boolean } | null = null
  try {
    // Obtener configuración del formulario desde la base de datos
    config = await prisma.configuracionFormulario.findUnique({
      where: { nombreFormulario: tipo },
    })

    if (!config || !config.activo) {
      console.warn(`⚠️  Configuración de email no encontrada o inactiva para: ${tipo}`)
      console.warn(`   Verificar en /admin/configuracion/formularios que el formulario "${tipo}" esté activo`)
      return { success: false, message: 'Configuración de email no encontrada' }
    }

    console.log(`📨 Enviando email de notificación para ${tipo}:`, {
      emailDestino: config.emailDestino,
      asunto: config.asuntoEmail,
      solicitudId: datos.id,
    })

    // Construir el cuerpo del email según el tipo
    let htmlBody = ''
    let emailSubject = config.asuntoEmail

    if (tipo === 'visita') {
      htmlBody = `
        <h2>Nueva Solicitud de Visita</h2>
        <p><strong>ID:</strong> ${datos.id || 'N/A'}</p>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Dirección:</strong> ${datos.direccion || 'No especificada'}</p>
        <p><strong>Localidad:</strong> ${datos.localidad || 'No especificada'}</p>
        ${datos.mensaje ? `<p><strong>Mensaje:</strong><br>${datos.mensaje}</p>` : ''}
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
      `
    } else if (tipo === 'presupuesto') {
      let productos = datos.productos
      if (typeof productos === 'string') {
        try {
          productos = JSON.parse(productos)
        } catch (e) {
          // Si no es JSON válido, usar como string
        }
      }

      const productosHtml = Array.isArray(productos)
        ? productos
            .map(
              (p: any) => `
            <li>
              <strong>${p.tipo || 'Producto'}:</strong> ${p.cantidad || 1} unidad(es)<br>
              ${p.medidas ? `<em>Medidas: ${p.medidas}</em>` : ''}
              ${p.observaciones ? `<em>Observaciones: ${p.observaciones}</em>` : ''}
            </li>
          `
            )
            .join('')
        : `<p>${productos}</p>`

      htmlBody = `
        <h2>Nueva Solicitud de Presupuesto</h2>
        <p><strong>ID:</strong> ${datos.id || 'N/A'}</p>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <h3>Productos solicitados:</h3>
        <ul>${productosHtml}</ul>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
      `
    } else if (tipo === 'contacto') {
      htmlBody = `
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>ID:</strong> ${datos.id || 'N/A'}</p>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        ${datos.telefono ? `<p><strong>Teléfono:</strong> ${datos.telefono}</p>` : ''}
        <p><strong>Mensaje:</strong><br>${datos.mensaje || 'Sin mensaje'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
      `
    }

    // Enviar el email
    await sendEmail({
      to: config.emailDestino,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            h2 { color: #2c3e50; }
            p { margin: 10px 0; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          ${htmlBody}
        </body>
        </html>
      `,
    })

    console.log(`✅ Email de notificación enviado correctamente para ${tipo} a ${config.emailDestino}`)
    return { success: true }
  } catch (error: any) {
    console.error(`❌ Error enviando email de ${tipo}:`, {
      error: error.message,
      code: error.code,
      emailDestino: config?.emailDestino || 'NO CONFIGURADO',
      solicitudId: datos.id,
    })
    // No lanzar error para que la solicitud se guarde aunque falle el email
    return { success: false, error: error.message }
  }
}

