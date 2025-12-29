'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Edit, 
  Copy, 
  X,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Trash2,
  Save,
  ExternalLink
} from 'lucide-react'

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
  mercadoPagoStatus: string | null
  mercadoPagoInitPoint: string | null
  prismaPaymentId: string | null
  prismaInitPoint: string | null
  prismaStatus: string | null
  fechaPago: string | null
  createdAt: string
  updatedAt: string
}

const estadoLabels: Record<string, string> = {
  GENERADO: 'Generado',
  APROBADO: 'Aprobado',
  RECHAZADO: 'Rechazado',
}

const estadoColors: Record<string, { bg: string; text: string }> = {
  GENERADO: { bg: '#fef3c7', text: '#92400e' },
  APROBADO: { bg: '#d1fae5', text: '#065f46' },
  RECHAZADO: { bg: '#fee2e2', text: '#991b1b' },
}

export default function PagosPage() {
  const [pagosPendientes, setPagosPendientes] = useState<Pago[]>([])
  const [pagosAprobados, setPagosAprobados] = useState<Pago[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPago, setEditingPago] = useState<Pago | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    cliente: '',
    idCliente: '',
    idPedido: '',
    monto: '',
    maxCuotas: '1',
    estado: 'GENERADO',
    proveedor: 'mercadopago', // 'mercadopago' o 'prisma'
    metodoPago: 'checkout', // 'checkout' o 'gateway'
  })

  useEffect(() => {
    fetchPagos()
  }, [])

  async function fetchPagos() {
    try {
      setLoading(true)
      const [pendientesRes, aprobadosRes] = await Promise.all([
        fetch('/api/pagos?estado=GENERADO'),
        fetch('/api/pagos?ultimos30dias=true'),
      ])
      const pendientes = await pendientesRes.json()
      const aprobados = await aprobadosRes.json()
      setPagosPendientes(pendientes)
      setPagosAprobados(aprobados)
    } catch (error) {
      console.error('Error fetching pagos:', error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setIsCreating(true)
    setEditingPago(null)
    setFormData({
      cliente: '',
      idCliente: '',
      idPedido: '',
      monto: '',
      maxCuotas: '1',
      estado: 'GENERADO',
      proveedor: 'mercadopago',
      metodoPago: 'checkout',
    })
    setModalOpen(true)
  }

  function openEditModal(pago: Pago) {
    setIsCreating(false)
    setEditingPago(pago)
    setFormData({
      cliente: pago.cliente,
      idCliente: pago.idCliente || '',
      idPedido: pago.idPedido || '',
      monto: pago.monto.toString(),
      maxCuotas: pago.maxCuotas.toString(),
      estado: pago.estado,
      proveedor: pago.proveedor || 'mercadopago',
      metodoPago: pago.metodoPago || 'checkout',
    })
    setModalOpen(true)
  }

  async function handleSave() {
    // Validación
    if (!formData.cliente || !formData.monto) {
      alert('Por favor completa los campos obligatorios: Cliente y Monto')
      return
    }

    if (parseFloat(formData.monto) <= 0) {
      alert('El monto debe ser mayor a 0')
      return
    }

    setSaving(true)
    try {
      if (isCreating) {
        const res = await fetch('/api/pagos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Error al crear el pago')
        }
      } else if (editingPago) {
        const res = await fetch(`/api/pagos/${editingPago.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Error al actualizar el pago')
        }
      }
      await fetchPagos()
      setModalOpen(false)
    } catch (error: any) {
      console.error('Error saving pago:', error)
      alert(error.message || 'Error al guardar el pago')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este pago?')) return
    try {
      await fetch(`/api/pagos/${id}`, { method: 'DELETE' })
      await fetchPagos()
    } catch (error) {
      console.error('Error deleting pago:', error)
    }
  }

  async function handleDevolver(id: string) {
    if (!confirm('¿Desea devolver este pago?')) return
    try {
      await fetch(`/api/pagos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'GENERADO', fechaPago: null }),
      })
      await fetchPagos()
    } catch (error) {
      console.error('Error devolviendo pago:', error)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    alert('Link copiado')
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-AR')
  }

  const filteredPendientes = pagosPendientes.filter(p =>
    p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.idPedido && p.idPedido.includes(searchTerm))
  )

  const filteredAprobados = pagosAprobados.filter(p =>
    p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.idPedido && p.idPedido.includes(searchTerm))
  )

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #3b82f6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando pagos...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Administración de Pagos</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            Gestiona los pagos y enlaces de pago
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#10b981',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <Plus size={16} />
          CREAR PAGO NUEVO
        </button>
      </div>

      {/* Search */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px'
      }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Buscar por cliente o pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Pagos Pendientes */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Pagos pendientes</h3>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Cliente</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Pedido</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Monto</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Fecha Alta</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Estado</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Link</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Editar</th>
                </tr>
              </thead>
              <tbody>
                {filteredPendientes.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No hay pagos pendientes
                    </td>
                  </tr>
                ) : (
                  filteredPendientes.map((pago) => {
                    const estadoStyle = estadoColors[pago.estado] || estadoColors.GENERADO
                    const paymentUrl = `${window.location.origin}/pagar/${pago.token}`
                    return (
                      <tr key={pago.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.id.slice(-4)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.cliente}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.idPedido || '-'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{formatCurrency(pago.monto)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#64748b' }}>{formatDate(pago.createdAt)}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500,
                            background: estadoStyle.bg,
                            color: estadoStyle.text
                          }}>
                            {estadoLabels[pago.estado]}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => window.open(paymentUrl, '_blank')}
                              style={{
                                padding: '6px 12px',
                                background: '#3b82f6',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'white'
                              }}
                            >
                              <ExternalLink size={14} />
                              Ir
                            </button>
                            <button
                              onClick={() => copyToClipboard(paymentUrl)}
                              style={{
                                padding: '6px 12px',
                                background: '#f1f5f9',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: '#374151'
                              }}
                            >
                              <Copy size={14} />
                              Copiar
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => openEditModal(pago)}
                            style={{
                              padding: '6px 12px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagos Aprobados */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Pagos Aprobados de los últimos 30 días</h3>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Cliente</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Pedido</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Monto</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Fecha Pago</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Estado</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredAprobados.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No hay pagos aprobados en los últimos 30 días
                    </td>
                  </tr>
                ) : (
                  filteredAprobados.map((pago) => {
                    const estadoStyle = estadoColors[pago.estado] || estadoColors.APROBADO
                    return (
                      <tr key={pago.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.id.slice(-4)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.cliente}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.idPedido || '-'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{formatCurrency(pago.monto)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#64748b' }}>{pago.fechaPago ? formatDate(pago.fechaPago) : '-'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500,
                            background: estadoStyle.bg,
                            color: estadoStyle.text
                          }}>
                            {estadoLabels[pago.estado]}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => handleDevolver(pago.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            DEVOLVER
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(4px)'
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1
              }}
            >
              {/* Header fijo */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e2e8f0',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    {isCreating ? 'Creando Pago' : 'Editar Pago'}
                  </h2>
                  <button
                    onClick={() => setModalOpen(false)}
                    style={{
                      padding: '8px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Contenido scrolleable */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                      Monto
                    </label>
                    <input
                      type="number"
                      value={formData.monto}
                      onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                      Cliente
                    </label>
                    <input
                      type="text"
                      value={formData.cliente}
                      onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                      ID Cliente
                    </label>
                    <input
                      type="text"
                      value={formData.idCliente}
                      onChange={(e) => setFormData({ ...formData, idCliente: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                      ID Pedido
                    </label>
                    <input
                      type="text"
                      value={formData.idPedido}
                      onChange={(e) => setFormData({ ...formData, idPedido: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                      Cantidad Máxima de Cuotas
                    </label>
                    <select
                      value={formData.maxCuotas}
                      onChange={(e) => setFormData({ ...formData, maxCuotas: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'inherit',
                        background: 'white'
                      }}
                    >
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                    </select>
                  </div>

                  {isCreating && (
                    <>
                      {/* Selector de Proveedor */}
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                          Proveedor de Pago
                        </label>
                        <select
                          value={formData.proveedor}
                          onChange={(e) => {
                            const newProveedor = e.target.value
                            setFormData({ 
                              ...formData, 
                              proveedor: newProveedor,
                              // Si es Prisma, usar QR por defecto. Si es Mercado Pago, usar checkout
                              metodoPago: newProveedor === 'prisma' ? 'qr' : 'checkout'
                            })
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            fontFamily: 'inherit',
                            background: 'white'
                          }}
                        >
                          <option value="mercadopago">Mercado Pago</option>
                          <option value="prisma">Prisma Medios de Pago (QR)</option>
                        </select>
                        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                          {formData.proveedor === 'mercadopago' 
                            ? 'Procesa pagos a través de Mercado Pago'
                            : 'Procesa pagos mediante código QR con Prisma'}
                        </p>
                      </div>

                      {/* Selector de Método - Solo para Mercado Pago */}
                      {formData.proveedor === 'mercadopago' && (
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                            Método de Pago
                          </label>
                          <select
                            value={formData.metodoPago}
                            onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '14px',
                              outline: 'none',
                              fontFamily: 'inherit',
                              background: 'white'
                            }}
                          >
                            <option value="checkout">Checkout (Link de Pago)</option>
                            <option value="gateway">Gateway (Pago Directo con Tarjeta)</option>
                          </select>
                          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                            {formData.metodoPago === 'checkout' 
                              ? 'Genera un link que el cliente puede usar para pagar'
                              : 'Procesa el pago directamente con los datos de la tarjeta'}
                          </p>
                        </div>
                      )}

                      {/* Selector de Método para Prisma */}
                      {formData.proveedor === 'prisma' && (
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                            Método de Pago
                          </label>
                          <select
                            value={formData.metodoPago}
                            onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '14px',
                              outline: 'none',
                              fontFamily: 'inherit',
                              background: 'white'
                            }}
                          >
                            <option value="qr">🔲 Pago por QR (Recomendado)</option>
                            <option value="checkout" disabled>💳 Pago con Tarjeta (No disponible)</option>
                          </select>
                          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                            El cliente escanea el código QR con su app bancaria para pagar
                          </p>
                        </div>
                      )}

                      {/* Info para Prisma QR */}
                      {formData.proveedor === 'prisma' && formData.metodoPago === 'qr' && (
                        <div style={{
                          padding: '12px',
                          background: '#f0f9ff',
                          border: '1px solid #bae6fd',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#0369a1'
                        }}>
                          <p style={{ margin: 0, fontWeight: 500, marginBottom: '4px' }}>
                            🔲 Pago con QR
                          </p>
                          <p style={{ margin: 0 }}>
                            Se generará un código QR que el cliente puede escanear con su app bancaria 
                            (Mercado Pago, BNA+, Modo, etc.) para realizar el pago de forma instantánea.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {!isCreating && (
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        Estado
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          fontFamily: 'inherit',
                          background: 'white'
                        }}
                      >
                        <option value="GENERADO">Generado</option>
                        <option value="APROBADO">Aprobado</option>
                        <option value="RECHAZADO">Rechazado</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer fijo con botones */}
              <div style={{
                padding: '24px',
                borderTop: '1px solid #e2e8f0',
                flexShrink: 0,
                background: 'white'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setModalOpen(false)}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: '#f1f5f9',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: saving ? '#94a3b8' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: saving ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!saving) {
                        e.currentTarget.style.background = '#059669'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!saving) {
                        e.currentTarget.style.background = '#10b981'
                      }
                    }}
                  >
                    {saving ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Guardar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

