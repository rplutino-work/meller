'use client'

import { QrCode, AlertTriangle } from 'lucide-react'

interface PrismaPaymentFormProps {
  token: string
  monto: number
  maxCuotas: number
  cliente: string
  onSuccess: () => void
  onError: (error: string) => void
}

/**
 * PrismaPaymentForm - Formulario de pago con tarjeta de Prisma
 * 
 * NOTA: Esta funcionalidad no está disponible actualmente porque
 * la API de pagos con tarjeta de Prisma requiere habilitación especial.
 * 
 * En su lugar, se recomienda usar pagos por QR (QRPayment component)
 */
export default function PrismaPaymentForm({
  token,
  monto,
  maxCuotas,
  cliente,
  onSuccess,
  onError,
}: PrismaPaymentFormProps) {
  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  return (
    <div style={{
      padding: '32px 24px',
      background: '#fef3c7',
      borderRadius: '12px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#fde68a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <AlertTriangle size={32} style={{ color: '#92400e' }} />
      </div>
      
      <h3 style={{ 
        color: '#92400e', 
        fontSize: '18px', 
        fontWeight: 600, 
        margin: '0 0 12px 0' 
      }}>
        Pago con tarjeta no disponible
      </h3>
      
      <p style={{ 
        color: '#92400e', 
        fontSize: '14px', 
        margin: '0 0 20px 0',
        lineHeight: '1.5'
      }}>
        La API de pagos con tarjeta de Prisma no está habilitada para esta cuenta.
        Por favor, contactá con el administrador para generar un nuevo pago con QR.
      </p>

      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <QrCode size={20} style={{ color: '#0369a1' }} />
          <span style={{ color: '#0369a1', fontWeight: 500 }}>Alternativa recomendada</span>
        </div>
        <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
          Los pagos por QR permiten al cliente escanear un código con su app bancaria 
          (Mercado Pago, BNA+, Modo, etc.) para pagar de forma segura e instantánea.
        </p>
      </div>

      <div style={{
        padding: '12px',
        background: '#fde68a',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#78350f'
      }}>
        <strong>Monto a cobrar:</strong> {formatCurrency(monto)}
        <br />
        <strong>Cliente:</strong> {cliente}
      </div>
    </div>
  )
}
