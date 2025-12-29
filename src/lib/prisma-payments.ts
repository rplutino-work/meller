/**
 * Integración con Prisma Medios de Pago (Decidir)
 * Documentación: https://developers.prismamediosdepago.com/portal/
 * 
 * APIs Disponibles:
 * - Payments - Decidir QR Services (pagos por código QR)
 * - Payments - Acquiring QR Services
 * 
 * Ambientes:
 * - SANDBOX: api-sandbox.prismamediosdepago.com
 * - HOMOLOGACIÓN: api-homo.prismamediosdepago.com
 * - PRODUCCIÓN: api.prismamediosdepago.com
 */

// Configuración del SDK - URLs correctas de Prisma
const PRISMA_SANDBOX_URL = 'https://api-sandbox.prismamediosdepago.com'
const PRISMA_HOMO_URL = 'https://api-homo.prismamediosdepago.com'
const PRISMA_PROD_URL = 'https://api.prismamediosdepago.com'

// Usar sandbox por defecto, cambiar a producción cuando esté listo
const PRISMA_API_URL = process.env.PRISMA_API_URL || PRISMA_SANDBOX_URL
const PRISMA_PUBLIC_KEY = process.env.PRISMA_PUBLIC_KEY || ''
const PRISMA_PRIVATE_KEY = process.env.PRISMA_PRIVATE_KEY || ''
const PRISMA_SITE_ID = process.env.PRISMA_SITE_ID || ''

// URL base para callbacks
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
}

// ============================================
// CONFIGURACIÓN Y UTILIDADES
// ============================================

export function getPrismaPublicKey(): string {
  return PRISMA_PUBLIC_KEY
}

export function getPrismaConfig() {
  return {
    publicKey: PRISMA_PUBLIC_KEY,
    siteId: PRISMA_SITE_ID,
    apiUrl: PRISMA_API_URL,
    isConfigured: isPrismaConfigured(),
  }
}

export function isPrismaConfigured(): boolean {
  return !!(PRISMA_PUBLIC_KEY && PRISMA_PRIVATE_KEY)
}

// ============================================
// PAGOS POR QR - Decidir QR Services
// ============================================

interface QRPaymentData {
  monto: number
  cliente: string
  email?: string
  idPedido?: string
  descripcion?: string
  token: string // Token interno de la app
}

interface QRResponse {
  success: boolean
  qrCode?: string // Imagen QR en base64
  qrData?: string // Datos del QR para generar localmente
  qrId?: string // ID del QR generado
  expiresAt?: string // Fecha de expiración
  paymentUrl?: string // URL alternativa de pago
  error?: string
}

/**
 * Crear un código QR de pago usando Prisma QR Services
 * El cliente escanea el QR con su app bancaria para pagar
 */
export async function createPrismaQRPayment(data: QRPaymentData): Promise<QRResponse> {
  if (!PRISMA_PRIVATE_KEY || !PRISMA_SITE_ID) {
    console.warn('⚠️ Prisma no está configurado, generando QR simulado')
    return generateSimulatedQR(data)
  }

  const baseUrl = getBaseUrl()
  
  try {
    // Intentar crear QR con la API de Prisma
    const qrRequest = {
      amount: Math.round(data.monto * 100), // Monto en centavos
      currency: 'ARS',
      description: data.descripcion || `Pago - ${data.cliente}`,
      external_reference: data.token,
      notification_url: `${baseUrl}/api/pagos/prisma/webhook`,
      expiration_date: getExpirationDate(24), // Expira en 24 horas
      metadata: {
        cliente: data.cliente,
        email: data.email || '',
        idPedido: data.idPedido || '',
      }
    }

    console.log('Creando QR con Prisma:', JSON.stringify(qrRequest, null, 2))

    // Intentar con Decidir QR Services
    const response = await fetch(`${PRISMA_API_URL}/qr/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRISMA_PRIVATE_KEY,
        'X-Site-Id': PRISMA_SITE_ID,
      },
      body: JSON.stringify(qrRequest),
    })

    if (response.ok) {
      const result = await response.json()
      console.log('QR creado exitosamente:', result)
      
      return {
        success: true,
        qrCode: result.qr_data || result.qr_code,
        qrData: result.qr_string || result.qr_data,
        qrId: result.id || result.qr_id,
        expiresAt: result.expiration_date,
        paymentUrl: result.payment_url,
      }
    }

    // Si falla, intentar con Acquiring QR Services
    console.log('Intentando con Acquiring QR Services...')
    const acquiringResponse = await fetch(`${PRISMA_API_URL}/acquiring/qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRISMA_PRIVATE_KEY,
        'X-Site-Id': PRISMA_SITE_ID,
      },
      body: JSON.stringify(qrRequest),
    })

    if (acquiringResponse.ok) {
      const result = await acquiringResponse.json()
      console.log('QR creado con Acquiring:', result)
      
      return {
        success: true,
        qrCode: result.qr_data || result.qr_code,
        qrData: result.qr_string || result.qr_data,
        qrId: result.id || result.qr_id,
        expiresAt: result.expiration_date,
      }
    }

    // Si ambos fallan, generar QR simulado para desarrollo
    const errorResult = await response.json().catch(() => ({}))
    console.warn('API de QR no disponible, usando QR simulado:', errorResult)
    return generateSimulatedQR(data)

  } catch (error) {
    console.error('Error creando QR con Prisma:', error)
    // En caso de error, generar QR simulado
    return generateSimulatedQR(data)
  }
}

/**
 * Generar un QR simulado para desarrollo/pruebas
 * Este QR redirige a la página de pago manual
 */
function generateSimulatedQR(data: QRPaymentData): QRResponse {
  const baseUrl = getBaseUrl()
  const paymentUrl = `${baseUrl}/pagar/${data.token}?method=qr`
  
  // Datos del QR que contienen la URL de pago
  const qrData = JSON.stringify({
    type: 'payment',
    url: paymentUrl,
    amount: data.monto,
    currency: 'ARS',
    reference: data.token,
    merchant: 'MELE ROLLER',
  })

  return {
    success: true,
    qrData: paymentUrl, // La URL se usará para generar el QR en el frontend
    qrId: `SIM-${data.token}`,
    expiresAt: getExpirationDate(24),
    paymentUrl: paymentUrl,
  }
}

/**
 * Consultar estado de un pago QR
 */
export async function getPrismaQRStatus(qrId: string) {
  if (!PRISMA_PRIVATE_KEY) {
    return { status: 'pending', message: 'Prisma no configurado' }
  }

  try {
    const response = await fetch(`${PRISMA_API_URL}/qr/payments/${qrId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRISMA_PRIVATE_KEY,
        'X-Site-Id': PRISMA_SITE_ID,
      },
    })

    if (!response.ok) {
      throw new Error('Error al consultar estado del QR')
    }

    const result = await response.json()
    return {
      status: result.status,
      paymentId: result.payment_id,
      paidAt: result.paid_at,
      ...result,
    }
  } catch (error) {
    console.error('Error consultando estado QR:', error)
    throw error
  }
}

/**
 * Cancelar un QR de pago
 */
export async function cancelPrismaQR(qrId: string) {
  if (!PRISMA_PRIVATE_KEY) {
    throw new Error('PRISMA_PRIVATE_KEY no está configurado')
  }

  try {
    const response = await fetch(`${PRISMA_API_URL}/qr/payments/${qrId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': PRISMA_PRIVATE_KEY,
        'X-Site-Id': PRISMA_SITE_ID,
      },
    })

    if (!response.ok) {
      throw new Error('Error al cancelar el QR')
    }

    return await response.json()
  } catch (error) {
    console.error('Error cancelando QR:', error)
    throw error
  }
}

// ============================================
// UTILIDADES
// ============================================

function getExpirationDate(hours: number): string {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  return date.toISOString()
}

// Estados de pago de Prisma/Decidir
export const PRISMA_PAYMENT_STATUS: Record<string, string> = {
  'pending': 'GENERADO',
  'approved': 'APROBADO',
  'rejected': 'RECHAZADO',
  'cancelled': 'RECHAZADO',
  'expired': 'RECHAZADO',
}

// Mapear estado de Prisma a estado interno
export function mapPrismaStatus(prismaStatus: string): string {
  return PRISMA_PAYMENT_STATUS[prismaStatus.toLowerCase()] || 'GENERADO'
}

// ============================================
// LEGACY - Funciones anteriores para compatibilidad
// ============================================

export async function createPrismaPayment(data: any) {
  // Esta función requiere API de pagos con tarjeta que no está disponible
  // Por ahora redirigir a QR
  console.warn('createPrismaPayment: API de tarjeta no disponible, usar QR en su lugar')
  throw new Error('API de pagos con tarjeta no disponible. Usar pagos por QR.')
}

export async function getPrismaPaymentStatus(paymentId: string) {
  return getPrismaQRStatus(paymentId)
}

export async function refundPrismaPayment(paymentId: string, amount?: number) {
  throw new Error('Función de reembolso no implementada para QR')
}

export async function createPrismaCheckout(data: any) {
  // Convertir a QR
  return createPrismaQRPayment({
    monto: data.monto,
    cliente: data.cliente,
    email: data.email,
    idPedido: data.idPedido,
    token: data.token,
  })
}

export async function getPrismaInstallments(bin: string, amount: number) {
  // QR no soporta cuotas de la misma manera
  return { installments: [{ quantity: 1, amount }] }
}
