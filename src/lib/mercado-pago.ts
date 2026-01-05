import { MercadoPagoConfig, Preference } from 'mercadopago'

// Inicializar cliente de Mercado Pago
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

if (!accessToken) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN no está configurado en las variables de entorno')
  }
}

const client = new MercadoPagoConfig({
  accessToken: accessToken || '',
  options: {
    timeout: 10000, // Aumentado a 10s para producción
    // idempotencyKey se genera por request cuando es necesario
  },
})

export const preference = new Preference(client)

// Verificar si estamos en producción
export function isProduction(): boolean {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  return baseUrl.startsWith('https://') && !baseUrl.includes('localhost') && !baseUrl.includes('vercel.app')
}

// Función para generar un token único para la URL de pago
export function generatePaymentToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 20; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// Función para crear una preferencia de pago en Mercado Pago
export async function createMercadoPagoPreference(data: {
  monto: number
  cliente: string
  idPedido?: string
  maxCuotas: number
  token: string
}) {
  try {
    // Prioridad: NEXT_PUBLIC_BASE_URL > VERCEL_URL > localhost
    // NEXT_PUBLIC_BASE_URL se usa cuando hay dominio personalizado
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    
    const successUrl = `${baseUrl}/pagar/${data.token}?status=success`
    const failureUrl = `${baseUrl}/pagar/${data.token}?status=failure`
    const pendingUrl = `${baseUrl}/pagar/${data.token}?status=pending`
    
    const preferenceData: any = {
      items: [
        {
          id: data.token,
          title: `Pago - ${data.cliente}${data.idPedido ? ` (Pedido ${data.idPedido})` : ''}`,
          quantity: 1,
          unit_price: data.monto,
          currency_id: 'ARS',
        },
      ],
      payer: {
        name: data.cliente,
      },
      payment_methods: {
        installments: data.maxCuotas,
        excluded_payment_types: [],
        excluded_payment_methods: [],
      },
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      external_reference: data.token,
    }
    
    // Configuración para producción
    const isProd = isProduction()
    
    // Auto-return solo en producción (HTTPS)
    if (isProd) {
      preferenceData.auto_return = 'approved'
    }
    
    // Notification URL solo en producción (HTTPS)
    if (isProd) {
      preferenceData.notification_url = `${baseUrl}/api/pagos/mercado-pago/webhook`
    }
    
    // Validar que las URLs sean válidas
    if (!preferenceData.back_urls.success) {
      throw new Error('back_urls.success es requerido')
    }

    // Logs solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating preference with data:', JSON.stringify(preferenceData, null, 2))
    }
    
    const response = await preference.create({ body: preferenceData })
    
    // El SDK de Mercado Pago devuelve la respuesta en response o response.body
    const responseData = (response as any).body || response
    
    // Logs solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Mercado Pago SDK response:', JSON.stringify(responseData, null, 2))
    } else {
      // En producción, solo log básico
      console.log(`Mercado Pago preference created: ${responseData.id}`)
    }
    
    // Retornar la respuesta con la estructura correcta
    return {
      id: responseData.id,
      init_point: responseData.init_point || responseData.initPoint,
      ...responseData
    }
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    throw error
  }
}

