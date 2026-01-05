'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, CheckCircle2, XCircle, Clock, Loader2, QrCode } from 'lucide-react'
import PrismaPaymentForm from '@/components/payments/PrismaPaymentForm'
import QRPayment from '@/components/payments/QRPayment'

interface Pago {
  id: string
  cliente: string
  idCliente: string | null
  idPedido: string | null
  monto: number
  maxCuotas: number
  estado: string
  token: string
  proveedor: string
  metodoPago: string | null
  mercadoPagoId: string | null
  mercadoPagoInitPoint: string | null
  mercadoPagoStatus: string | null
  prismaPaymentId: string | null
  prismaInitPoint: string | null
  prismaStatus: string | null
  fechaPago: string | null
  createdAt: string
}

export default function PagarPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = params.token as string
  const status = searchParams.get('status')
  const collectionStatus = searchParams.get('collection_status')
  const paymentId = searchParams.get('payment_id')
  
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
    // Si hay parámetros de respuesta de Mercado Pago, actualizar el estado
    if ((status === 'success' || status === 'approved' || collectionStatus === 'approved') && token) {
      // Actualizar el estado del pago desde la API
      updatePaymentStatus()
    }
  }, [status, collectionStatus, token])

  async function updatePaymentStatus() {
    try {
      // Si hay payment_id, actualizar el estado del pago
      if (paymentId && token) {
        const res = await fetch(`/api/pagos/update-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            paymentId,
            status: collectionStatus || status,
          }),
        })
        
        if (res.ok) {
          // Recargar el pago después de actualizar
          setTimeout(() => {
            fetchPago()
          }, 1000)
        }
      } else {
        // Si no hay payment_id, solo recargar después de un momento
        setTimeout(() => {
          fetchPago()
        }, 2000)
      }
    } catch (err) {
      console.error('Error updating payment status:', err)
      // Aún así, recargar el pago
      setTimeout(() => {
        fetchPago()
      }, 2000)
    }
  }

  async function fetchPago() {
    try {
      setLoading(true)
      const res = await fetch(`/api/pagos?token=${token}`)
      if (!res.ok) {
        throw new Error('Pago no encontrado')
      }
      const data = await res.json()
      setPago(data)
      
      // Determinar la URL de pago según el proveedor
      if (data.proveedor === 'mercadopago' || !data.proveedor) {
        // Mercado Pago
        if (data.mercadoPagoInitPoint) {
          setPaymentUrl(data.mercadoPagoInitPoint)
        } else if (data.mercadoPagoId) {
          setPaymentUrl(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.mercadoPagoId}`)
        } else if (data.estado === 'GENERADO') {
          console.warn('Pago sin Mercado Pago ID - la preferencia no se creó correctamente')
        }
      } else if (data.proveedor === 'prisma') {
        // Prisma - el pago se procesa en esta misma página con formulario
        // No hay URL externa, el formulario se renderiza directamente
        setPaymentUrl(null)
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#d1fae5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle2 size={48} style={{ color: '#10b981' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            ¡Pago Aprobado!
          </h1>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '16px' }}>
            Tu pago de <strong style={{ color: '#1e293b' }}>{formatCurrency(pago.monto)}</strong> ha sido procesado exitosamente.
          </p>
          {pago.fechaPago && (
            <div style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, marginBottom: '4px' }}>
                Fecha de pago
              </p>
              <p style={{ color: '#1e293b', fontSize: '14px', margin: 0, fontWeight: 500 }}>
                {formatDate(pago.fechaPago)}
              </p>
            </div>
          )}
          {pago.idPedido && (
            <div style={{
              background: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, marginBottom: '4px' }}>
                Número de pedido
              </p>
              <p style={{ color: '#1e293b', fontSize: '14px', margin: 0, fontWeight: 500 }}>
                {pago.idPedido}
              </p>
            </div>
          )}
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
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
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <XCircle size={48} style={{ color: '#ef4444' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Pago Rechazado
          </h1>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '16px' }}>
            El pago de <strong style={{ color: '#1e293b' }}>{formatCurrency(pago.monto)}</strong> no pudo ser procesado.
          </p>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
              Posibles causas:
            </p>
            <ul style={{ color: '#991b1b', margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li>Datos de la tarjeta incorrectos</li>
              <li>Fondos insuficientes</li>
              <li>Tarjeta bloqueada o vencida</li>
              <li>Problemas con el banco emisor</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a
              href={paymentUrl || '#'}
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
            >
              Intentar nuevamente
            </a>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: '#e5e7eb',
                color: '#374151',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
            >
              Volver al inicio
            </Link>
          </div>
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

        {/* Mensaje de estado pendiente - Solo si tiene init_point o ID de Mercado Pago */}
        {(status === 'pending' || (pago.estado === 'GENERADO' && (pago.mercadoPagoId || pago.mercadoPagoInitPoint))) && collectionStatus !== 'approved' && (
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
            <div>
              <p style={{ color: '#92400e', margin: 0, fontSize: '14px', fontWeight: 500 }}>
                Pago pendiente
              </p>
              <p style={{ color: '#92400e', margin: '4px 0 0 0', fontSize: '12px' }}>
                Tu pago está siendo procesado. Te notificaremos cuando se complete.
              </p>
            </div>
          </div>
        )}

        {/* Mensaje de estado rechazado */}
        {(status === 'failure' || collectionStatus === 'rejected' || pago.estado === 'RECHAZADO') && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <XCircle size={20} style={{ color: '#991b1b' }} />
            <div>
              <p style={{ color: '#991b1b', margin: 0, fontSize: '14px', fontWeight: 500 }}>
                Pago rechazado
              </p>
              <p style={{ color: '#991b1b', margin: '4px 0 0 0', fontSize: '12px' }}>
                El pago no pudo ser procesado. Por favor, intenta nuevamente o contacta con soporte.
              </p>
            </div>
          </div>
        )}

        {/* Mensaje de estado aprobado */}
        {(status === 'approved' || collectionStatus === 'approved') && pago.estado !== 'APROBADO' && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CheckCircle2 size={20} style={{ color: '#065f46' }} />
            <div>
              <p style={{ color: '#065f46', margin: 0, fontSize: '14px', fontWeight: 500 }}>
                Procesando confirmación...
              </p>
              <p style={{ color: '#065f46', margin: '4px 0 0 0', fontSize: '12px' }}>
                Tu pago fue aprobado. Estamos confirmando el pago.
              </p>
            </div>
          </div>
        )}

        {/* Renderizar formulario según proveedor y método */}
        {pago.proveedor === 'prisma' && pago.metodoPago === 'qr' && pago.estado === 'GENERADO' ? (
          // Pago por QR de Prisma
          <QRPayment
            token={pago.token}
            monto={pago.monto}
            cliente={pago.cliente}
            onPaymentComplete={(result) => {
              if (result === 'approved') {
                fetchPago()
              }
            }}
          />
        ) : pago.proveedor === 'prisma' && pago.estado === 'GENERADO' ? (
          // Formulario de pago de Prisma (tarjeta - no disponible actualmente)
          <div style={{
            padding: '24px',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <QrCode size={48} style={{ color: '#92400e', margin: '0 auto 16px' }} />
            <p style={{ color: '#92400e', margin: 0, fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
              Pago con tarjeta no disponible
            </p>
            <p style={{ color: '#92400e', margin: 0, fontSize: '13px' }}>
              Por favor, contactá al administrador para generar un pago por QR o usar Mercado Pago.
            </p>
          </div>
        ) : pago.proveedor === 'mercadopago' || !pago.proveedor ? (
          // Mercado Pago
          <>
            {/* Si es método gateway y no tiene init_point, mostrar mensaje informativo */}
            {!paymentUrl && !pago.mercadoPagoId && !pago.mercadoPagoInitPoint && pago.estado === 'GENERADO' ? (
              <div style={{
                padding: '20px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#92400e',
                marginBottom: '16px'
              }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                  Pago Gateway
                </p>
                <p style={{ margin: 0, fontSize: '13px' }}>
                  Este pago se procesará directamente con tarjeta. Por favor, contacta con el administrador para completar el pago.
                </p>
              </div>
            ) : paymentUrl ? (
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
          </>
        ) : (
          <div style={{
            padding: '16px',
            background: '#f1f5f9',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}>
            Proveedor de pago no reconocido
          </div>
        )}

        <p style={{
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          marginTop: '24px'
        }}>
          Tu pago está protegido. No almacenamos información de tu tarjeta.
        </p>
      </div>
    </div>
  )
}

