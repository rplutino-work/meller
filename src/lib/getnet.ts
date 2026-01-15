/**
 * Integración con Getnet
 * Documentación oficial: https://developers-sdk-documentation-site-santander.preprod.geopagos.com/page/checkout/requirements
 * 
 * Getnet ofrece APIs para procesar pagos en línea.
 * Esta integración sigue el patrón de Mercado Pago Checkout.
 * 
 * IMPORTANTE: Usa siempre URLs de producción. Las credenciales de desarrollo no funcionan en producción.
 */

// Configuración de Getnet
const GETNET_CLIENT_ID = process.env.GETNET_CLIENT_ID || ''
const GETNET_CLIENT_SECRET = process.env.GETNET_CLIENT_SECRET || ''

// URLs de Getnet según documentación oficial:
// https://developers-sdk-documentation-site-santander.preprod.geopagos.com/page/checkout/requirements
//
// Checkout API:
//   - development: https://api-santander.preprod.geopagos.com
//   - production: https://api.globalgetnet.com.ar
//
// Auth Server:
//   - development: https://auth.preprod.geopagos.com
//   - production: https://auth.geopagos.com

// URLs de producción de Getnet (usar siempre producción)
// Si necesitas usar desarrollo, configura las variables de entorno:
// GETNET_AUTH_BASE_URL y GETNET_CHECKOUT_BASE_URL
const GETNET_AUTH_PROD_URL = 'https://auth.geopagos.com'
const GETNET_CHECKOUT_PROD_URL = 'https://api.globalgetnet.com.ar'

// URLs de desarrollo (solo si se configuran explícitamente)
const GETNET_AUTH_DEV_URL = 'https://auth.preprod.geopagos.com'
const GETNET_CHECKOUT_DEV_URL = 'https://api-santander.preprod.geopagos.com'

// URLs finales: Por defecto usar producción siempre
// Puedes sobrescribir con variables de entorno si necesitas desarrollo
const GETNET_AUTH_BASE_URL = process.env.GETNET_AUTH_BASE_URL || GETNET_AUTH_PROD_URL
const GETNET_CHECKOUT_BASE_URL = process.env.GETNET_CHECKOUT_BASE_URL || GETNET_CHECKOUT_PROD_URL

// Para compatibilidad con código existente
const GETNET_API_URL = GETNET_AUTH_BASE_URL

// Variable para cachear el token de acceso
let accessTokenCache: { token: string; expiresAt: number } | null = null

// URL base para callbacks
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
}

// Verificar si estamos en producción (para webhooks)
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
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 Obteniendo token de Getnet desde:', GETNET_AUTH_BASE_URL)
      console.log('🔐 Client ID:', GETNET_CLIENT_ID ? `${GETNET_CLIENT_ID.substring(0, 10)}...` : 'NO CONFIGURADO')
    }

    // Según la documentación oficial: https://developers-sdk-documentation-site-santander.preprod.geopagos.com/page/checkout/requirements
    // El body debe ser JSON, no form-urlencoded
    const response = await fetch(`${GETNET_AUTH_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: GETNET_CLIENT_ID,
        client_secret: GETNET_CLIENT_SECRET,
        scope: '*',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error obteniendo token de Getnet:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      throw new Error(`Error obteniendo token: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    const token = data.access_token

    if (!token) {
      console.error('❌ Token no recibido en respuesta:', data)
      throw new Error('Token no recibido en la respuesta de Getnet')
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Token obtenido exitosamente')
    }

    // Cachear el token (expira 1 hora antes para seguridad)
    const expiresIn = (data.expires_in || 3600) * 1000
    accessTokenCache = {
      token,
      expiresAt: Date.now() + expiresIn - 3600000, // 1 hora menos
    }

    return token
  } catch (error: any) {
    console.error('❌ Error obteniendo token de Getnet:', error)
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

    // Estructura según documentación oficial: https://developers-sdk-documentation-site-santander.preprod.geopagos.com/page/checkout/integration
    // Formato JSON:API
    // Currency "032" = ARS (pesos argentinos)
    // El monto debe estar en centavos (multiplicar por 100)
    const orderData = {
      data: {
        attributes: {
          currency: '032', // Código de moneda ARS según ISO 4217
          items: [
            {
              id: 1,
              name: `Pago - ${data.cliente}${data.idPedido ? ` (Pedido ${data.idPedido})` : ''}`,
              unitPrice: {
                currency: '032',
                amount: Math.round(data.monto * 100), // Convertir a centavos
              },
              quantity: 1,
            },
          ],
        },
      },
    }

    // Logs solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Creating Getnet checkout with data:', JSON.stringify(orderData, null, 2))
    }

    // Crear la orden según documentación oficial
    // Endpoint: {base_url}/api/v2/orders
    // Headers: Content-Type: application/vnd.api+json, Accept: application/vnd.api+json
    const response = await fetch(`${GETNET_CHECKOUT_BASE_URL}/api/v2/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error response from Getnet:', {
        status: response.status,
        statusText: response.statusText,
        url: `${GETNET_CHECKOUT_BASE_URL}/api/v2/orders`,
        body: errorText,
      })
      throw new Error(`Error creando orden en Getnet: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const responseData = await response.json()

    // Logs detallados en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Getnet checkout response:', JSON.stringify(responseData, null, 2))
    } else {
      console.log(`✅ Getnet checkout creado: ${responseData.id || responseData.order_id}`)
    }

    // Según la documentación, la URL está en data.links.checkout
    const checkoutUrl = responseData?.data?.links?.checkout

    if (!checkoutUrl) {
      console.warn('⚠️ No se encontró URL de checkout en la respuesta de Getnet:', JSON.stringify(responseData, null, 2))
    }

    // Retornar estructura similar a Mercado Pago para compatibilidad
    return {
      id: responseData?.data?.id || responseData?.id,
      init_point: checkoutUrl,
      ...responseData,
    }
  } catch (error: any) {
    console.error('Error creating Getnet checkout:', error)
    throw error
  }
}


