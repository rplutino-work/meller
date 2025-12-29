'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, QrCode, CheckCircle2, XCircle, RefreshCw, Smartphone } from 'lucide-react'
import QRCode from 'qrcode'

interface QRPaymentProps {
  token: string
  monto: number
  cliente: string
  onPaymentComplete?: (status: 'approved' | 'rejected') => void
}

export default function QRPayment({ token, monto, cliente, onPaymentComplete }: QRPaymentProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [polling, setPolling] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateQR()
  }, [token])

  useEffect(() => {
    // Polling para verificar estado del pago cada 5 segundos
    if (status === 'pending' && !loading) {
      setPolling(true)
      const interval = setInterval(checkPaymentStatus, 5000)
      return () => {
        clearInterval(interval)
        setPolling(false)
      }
    }
  }, [status, loading])

  async function generateQR() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/pagos/prisma/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al generar el código QR')
      }

      // Guardar URL de pago
      setPaymentUrl(data.paymentUrl || data.qrData)
      setExpiresAt(data.expiresAt)

      // Generar imagen QR
      const qrContent = data.qrData || data.paymentUrl || `${window.location.origin}/pagar/${token}?method=qr`
      
      const qrDataUrl = await QRCode.toDataURL(qrContent, {
        width: 280,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      })

      setQrDataUrl(qrDataUrl)
    } catch (err: any) {
      console.error('Error generating QR:', err)
      setError(err.message || 'Error al generar el código QR')
    } finally {
      setLoading(false)
    }
  }

  async function checkPaymentStatus() {
    try {
      const res = await fetch(`/api/pagos/prisma/qr?token=${token}`)
      const data = await res.json()

      if (data.status === 'APROBADO') {
        setStatus('approved')
        onPaymentComplete?.('approved')
      } else if (data.status === 'RECHAZADO') {
        setStatus('rejected')
        onPaymentComplete?.('rejected')
      }
    } catch (err) {
      console.error('Error checking payment status:', err)
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  function formatExpiration(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '16px'
      }}>
        <Loader2 size={48} style={{ color: '#3b82f6', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#64748b', fontWeight: 500 }}>Generando código QR...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '16px'
      }}>
        <XCircle size={48} style={{ color: '#ef4444' }} />
        <p style={{ color: '#ef4444', fontWeight: 500 }}>{error}</p>
        <button
          onClick={generateQR}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          <RefreshCw size={18} />
          Reintentar
        </button>
      </div>
    )
  }

  if (status === 'approved') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '16px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#d1fae5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CheckCircle2 size={48} style={{ color: '#10b981' }} />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
          ¡Pago Aprobado!
        </h3>
        <p style={{ color: '#64748b', textAlign: 'center' }}>
          Tu pago de {formatCurrency(monto)} ha sido procesado exitosamente.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
    }}>
      {/* Título */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <QrCode size={24} style={{ color: '#3b82f6' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
            Pago con QR
          </h3>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          Escaneá el código QR con tu app bancaria
        </p>
      </div>

      {/* Código QR */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
      }}>
        {qrDataUrl ? (
          <img 
            src={qrDataUrl} 
            alt="Código QR de pago" 
            style={{ display: 'block', width: '280px', height: '280px' }}
          />
        ) : (
          <canvas ref={canvasRef} width={280} height={280} />
        )}
      </div>

      {/* Monto */}
      <div style={{
        background: '#f8fafc',
        padding: '16px 32px',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 4px 0' }}>Monto a pagar:</p>
        <p style={{ color: '#1e293b', fontSize: '28px', fontWeight: 700, margin: 0 }}>
          {formatCurrency(monto)}
        </p>
      </div>

      {/* Instrucciones */}
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '320px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Smartphone size={24} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ color: '#1e40af', fontSize: '14px', fontWeight: 500, margin: '0 0 8px 0' }}>
              ¿Cómo pagar?
            </p>
            <ol style={{ color: '#1e40af', fontSize: '13px', margin: 0, paddingLeft: '16px', lineHeight: '1.6' }}>
              <li>Abrí tu app bancaria o billetera</li>
              <li>Buscá la opción "Pagar con QR"</li>
              <li>Escaneá este código</li>
              <li>Confirmá el pago</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Estado del polling */}
      {polling && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#64748b',
          fontSize: '13px',
        }}>
          <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
          Esperando confirmación del pago...
        </div>
      )}

      {/* Expiración */}
      {expiresAt && (
        <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
          Este QR expira el {formatExpiration(expiresAt)}
        </p>
      )}

      {/* Botón de regenerar */}
      <button
        onClick={generateQR}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6'
          e.currentTarget.style.color = '#3b82f6'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0'
          e.currentTarget.style.color = '#64748b'
        }}
      >
        <RefreshCw size={16} />
        Regenerar QR
      </button>
    </div>
  )
}

