'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react'

interface Pago {
  id: string
  cliente: string
  idCliente: string | null
  idPedido: string | null
  monto: number
  maxCuotas: number
  estado: string
  token: string
  mercadoPagoId: string | null
  mercadoPagoInitPoint: string | null
  mercadoPagoStatus: string | null
  fechaPago: string | null
  createdAt: string
}

export default function PagarPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = params.token as string
  const status = searchParams.get('status')
  
  const [pago, setPago] = useState<Pago | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      fetchPago()
    }
  }, [token])

  useEffect(() => {
    if (status === 'success' && pago) {
      // Verificar el estado del pago después de un momento
      setTimeout(() => {
        fetchPago()
      }, 2000)
    }
  }, [status, pago])

  async function fetchPago() {
    try {
      setLoading(true)
      const res = await fetch(`/api/pagos?token=${token}`)
      if (!res.ok) {
        throw new Error('Pago no encontrado')
      }
      const data = await res.json()
      setPago(data)
      
      // Si tiene init_point de Mercado Pago, usarlo directamente
      if (data.mercadoPagoInitPoint) {
        setPaymentUrl(data.mercadoPagoInitPoint)
      } else if (data.mercadoPagoId) {
        // Si no tiene init_point pero tiene ID, construir la URL
        setPaymentUrl(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.mercadoPagoId}`)
      } else if (data.estado === 'GENERADO') {
        // Si no tiene Mercado Pago ID pero está generado, mostrar mensaje
        console.warn('Pago sin Mercado Pago ID - la preferencia no se creó correctamente')
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar el pago')
    } finally {
      setLoading(false)
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{ color: '#3b82f6', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#64748b', fontWeight: 500 }}>Cargando información del pago...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error || !pago) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <XCircle size={64} style={{ color: '#ef4444', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Pago no encontrado
          </h1>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            {error || 'El enlace de pago no es válido o ha expirado.'}
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  // Si el pago ya fue aprobado
  if (pago.estado === 'APROBADO') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <CheckCircle2 size={64} style={{ color: '#10b981', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Pago Aprobado
          </h1>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Tu pago de {formatCurrency(pago.monto)} ha sido procesado exitosamente.
          </p>
          {pago.fechaPago && (
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
              Fecha de pago: {formatDate(pago.fechaPago)}
            </p>
          )}
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  // Si el pago fue rechazado
  if (pago.estado === 'RECHAZADO') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <XCircle size={64} style={{ color: '#ef4444', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Pago Rechazado
          </h1>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            El pago no pudo ser procesado. Por favor, intenta nuevamente o contacta con soporte.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  // Mostrar formulario de pago
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '24px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <CreditCard size={48} style={{ color: '#3b82f6', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
            Realizar Pago
          </h1>
          <p style={{ color: '#64748b' }}>
            Completa el pago de forma segura con Mercado Pago
          </p>
        </div>

        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#64748b', fontSize: '14px' }}>Cliente:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{pago.cliente}</span>
          </div>
          {pago.idPedido && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#64748b', fontSize: '14px' }}>Pedido:</span>
              <span style={{ color: '#1e293b', fontWeight: 500 }}>{pago.idPedido}</span>
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <span style={{ color: '#1e293b', fontSize: '18px', fontWeight: 600 }}>Total a pagar:</span>
            <span style={{ color: '#1e293b', fontSize: '24px', fontWeight: 700 }}>
              {formatCurrency(pago.monto)}
            </span>
          </div>
          {pago.maxCuotas > 1 && (
            <p style={{ color: '#64748b', fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>
              Hasta {pago.maxCuotas} cuotas sin interés
            </p>
          )}
        </div>

        {status === 'pending' && (
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Clock size={20} style={{ color: '#92400e' }} />
            <p style={{ color: '#92400e', margin: 0, fontSize: '14px' }}>
              Tu pago está siendo procesado. Te notificaremos cuando se complete.
            </p>
          </div>
        )}

        {paymentUrl ? (
          <a
            href={paymentUrl}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              background: '#009ee3',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px',
              marginBottom: '16px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#0088cc'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#009ee3'}
          >
            Pagar con Mercado Pago
          </a>
        ) : (
          <div style={{
            padding: '16px',
            background: '#f1f5f9',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}>
            Generando enlace de pago...
          </div>
        )}

        <p style={{
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          marginTop: '24px'
        }}>
          Tu pago está protegido por Mercado Pago. No almacenamos información de tu tarjeta.
        </p>
      </div>
    </div>
  )
}

