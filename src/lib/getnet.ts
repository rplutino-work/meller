/**
 * Integración con Getnet
 * Documentación: https://docs.globalgetnet.com/es
 * 
 * Getnet ofrece APIs para procesar pagos en línea.
 * Esta integración sigue el patrón de Mercado Pago Checkout.
 */

// Configuración de Getnet
const GETNET_CLIENT_ID = process.env.GETNET_CLIENT_ID || ''
const GETNET_CLIENT_SECRET = process.env.GETNET_CLIENT_SECRET || ''

// URLs base de Getnet (ajustar según documentación oficial)
const GETNET_SANDBOX_URL = 'https://api-sandbox.getnet.com.ar'
const GETNET_PROD_URL = 'https://api.getnet.com.ar'

// Determinar el entorno
const GETNET_API_URL = process.env.GETNET_API_URL || GETNET_SANDBOX_URL

// Variable para cachear el token de acceso
let accessTokenCache: { token: string; expiresAt: number } | null = null

// URL base para callbacks
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
}

// Verificar si estamos en producción
export function isProduction(): boolean {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  return baseUrl.startsWith('https://') && !baseUrl.includes('localhost') && !baseUrl.includes('vercel.app')
}

/**
 * Obtener token de acceso OAuth2 de Getnet
 * NOTA: Ajustar según la documentación real de Getnet
 */
async function getAccessToken(): Promise<string> {
  // Si hay token válido en cache, retornarlo
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now()) {
    return accessTokenCache.token
  }

  try {
    const response = await fetch(`${GETNET_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${GETNET_CLIENT_ID}:${GETNET_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'payment',
      }),
    })

    if (!response.ok) {
      throw new Error(`Error obteniendo token: ${response.statusText}`)
    }

    const data = await response.json()
    const token = data.access_token

    // Cachear el token (expira 1 hora antes para seguridad)
    const expiresIn = (data.expires_in || 3600) * 1000
    accessTokenCache = {
      token,
      expiresAt: Date.now() + expiresIn - 3600000, // 1 hora menos
    }

    return token
  } catch (error: any) {
    console.error('Error obteniendo token de Getnet:', error)
    throw new Error(`Error de autenticación con Getnet: ${error.message}`)
  }
}

/**
 * Verificar si Getnet está configurado
 */
export function isGetnetConfigured(): boolean {
  return !!(GETNET_CLIENT_ID && GETNET_CLIENT_SECRET)
}

/**
 * Crear una orden de pago en Getnet (similar a preferencia de Mercado Pago)
 * NOTA: Los endpoints y estructura pueden necesitar ajuste según documentación oficial
 */
export async function createGetnetCheckout(data: {
  monto: number
  cliente: string
  idPedido?: string
  maxCuotas: number
  token: string
}) {
  try {
    if (!isGetnetConfigured()) {
      throw new Error('Getnet no está configurado correctamente')
    }

    const baseUrl = getBaseUrl()
    const accessToken = await getAccessToken()

    const successUrl = `${baseUrl}/pagar/${data.token}?status=success`
    const failureUrl = `${baseUrl}/pagar/${data.token}?status=failure`
    const pendingUrl = `${baseUrl}/pagar/${data.token}?status=pending`

    // Estructura de la orden de pago
    // NOTA: Ajustar según la documentación real de Getnet
    const orderData: any = {
      amount: {
        value: data.monto,
        currency: 'ARS',
      },
      order: {
        order_id: data.token,
        description: `Pago - ${data.cliente}${data.idPedido ? ` (Pedido ${data.idPedido})` : ''}`,
      },
      customer: {
        name: data.cliente,
      },
      installments: data.maxCuotas,
      redirect_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      external_reference: data.token,
    }

    // Agregar webhook solo en producción
    if (isProduction()) {
      orderData.notification_url = `${baseUrl}/api/pagos/getnet/webhook`
    }

    // Logs solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating Getnet checkout with data:', JSON.stringify(orderData, null, 2))
    }

    // Crear la orden
    // NOTA: Ajustar el endpoint según documentación oficial
    const response = await fetch(`${GETNET_API_URL}/v1/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response from Getnet:', errorText)
      throw new Error(`Error creando orden en Getnet: ${response.statusText}`)
    }

    const responseData = await response.json()

    // Logs solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Getnet checkout response:', JSON.stringify(responseData, null, 2))
    } else {
      console.log(`Getnet checkout creado: ${responseData.id || responseData.order_id}`)
    }

    // Retornar estructura similar a Mercado Pago para compatibilidad
    return {
      id: responseData.id || responseData.order_id,
      init_point: responseData.payment_url || responseData.checkout_url || responseData.redirect_url,
      ...responseData,
    }
  } catch (error: any) {
    console.error('Error creating Getnet checkout:', error)
    throw error
  }
}


