'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
  DEVUELTO: 'Devuelto',
}

const estadoColors: Record<string, { bg: string; text: string }> = {
  GENERADO: { bg: '#fef3c7', text: '#92400e' },
  APROBADO: { bg: '#d1fae5', text: '#065f46' },
  RECHAZADO: { bg: '#fee2e2', text: '#991b1b' },
  DEVUELTO: { bg: '#fef3c7', text: '#92400e' },
}

export default function PagosPage() {
  const [pagosPendientes, setPagosPendientes] = useState<Pago[]>([])
  const [pagosAprobados, setPagosAprobados] = useState<Pago[]>([])
  const [pagosDevueltos, setPagosDevueltos] = useState<Pago[]>([])
  const [pagosDevueltosEstado, setPagosDevueltosEstado] = useState<Pago[]>([])
  const [allPagos, setAllPagos] = useState<Pago[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState<string>('TODOS') // TODOS, GENERADO, APROBADO, RECHAZADO, DEVUELTO
  const [solicitudesVisita, setSolicitudesVisita] = useState<any[]>([])
  const [solicitudesPresupuesto, setSolicitudesPresupuesto] = useState<any[]>([])
  const [showSolicitudesSelector, setShowSolicitudesSelector] = useState(false)
  const [filterFecha, setFilterFecha] = useState<string>('TODOS') // TODOS, HOY, ULTIMOS_7, ULTIMOS_30
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
    proveedor: 'mercadopago', // Solo Mercado Pago disponible
    metodoPago: 'checkout', // 'checkout' o 'gateway'
  })

  useEffect(() => {
    fetchPagos()
    fetchSolicitudes()
  }, [])

  async function fetchSolicitudes() {
    try {
      const [visitasRes, presupuestosRes] = await Promise.all([
        fetch('/api/solicitudes/visita'),
        fetch('/api/solicitudes/presupuesto'),
      ])
      const visitas = await visitasRes.json()
      const presupuestos = await presupuestosRes.json()
      setSolicitudesVisita(visitas)
      setSolicitudesPresupuesto(presupuestos)
    } catch (error) {
      console.error('Error fetching solicitudes:', error)
    }
  }

  async function fetchPagos() {
    try {
      setLoading(true)
      const [pendientesRes, aprobadosRes, rechazadosRes, devueltosRes, allRes] = await Promise.all([
        fetch('/api/pagos?estado=GENERADO'),
        fetch('/api/pagos?ultimos30dias=true'),
        fetch('/api/pagos?estado=RECHAZADO'),
        fetch('/api/pagos?estado=DEVUELTO'),
        fetch('/api/pagos'),
      ])
      const pendientes = await pendientesRes.json()
      const aprobados = await aprobadosRes.json()
      const rechazados = await rechazadosRes.json()
      const devueltos = await devueltosRes.json()
      const all = await allRes.json()
      setPagosPendientes(pendientes)
      setPagosAprobados(aprobados)
      // Solo mostrar pagos con estado DEVUELTO, y RECHAZADO que tengan mercadoPagoStatus === 'refunded' (por si hay alguno sin migrar)
      const devueltosCompletos = [
        ...devueltos,
        ...rechazados.filter((p: Pago) => p.mercadoPagoStatus === 'refunded')
      ]
      setPagosDevueltos(devueltosCompletos)
      setPagosDevueltosEstado(devueltos)
      setAllPagos(all)
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
    if (!confirm('¿Desea devolver este pago? Esto procesará el reembolso en Mercado Pago.')) return
    try {
      const response = await fetch(`/api/pagos/${id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert('Pago devuelto exitosamente. El reembolso se procesará en Mercado Pago.')
      await fetchPagos()
      } else {
        alert(`Error al devolver el pago: ${result.error || result.details || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error devolviendo pago:', error)
      alert('Error al procesar la devolución. Por favor, intenta nuevamente.')
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

  function getPlataformaId(pago: Pago): string {
    if (pago.proveedor === 'mercadopago' && pago.mercadoPagoId) {
      return pago.mercadoPagoId
    }
    if (pago.proveedor === 'prisma' && pago.prismaPaymentId) {
      return pago.prismaPaymentId
    }
    return '-'
  }

  function getPlataformaInfo(pago: Pago): { nombre: string; logo: string | null; color: string } {
    if (pago.proveedor === 'mercadopago') {
      return {
        nombre: 'Mercado Pago',
        logo: '/images/logos/Mercado_Pago.png',
        color: '#009EE3'
      }
    }
    if (pago.proveedor === 'prisma') {
      return {
        nombre: 'Prisma',
        logo: null,
        color: '#6B7280'
      }
    }
    return {
      nombre: 'N/A',
      logo: null,
      color: '#6B7280'
    }
  }

  // Función para filtrar pagos
  const filterPagos = (pagos: Pago[]) => {
    let filtered = pagos

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p =>
    p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.idPedido && p.idPedido.includes(searchTerm)) ||
        (p.idCliente && p.idCliente.includes(searchTerm))
      )
    }

    // Filtro por estado
    if (filterEstado !== 'TODOS') {
      if (filterEstado === 'DEVUELTO') {
        // Para devueltos, incluir tanto DEVUELTO como RECHAZADO que fueron devueltos
        filtered = filtered.filter(p => p.estado === 'DEVUELTO' || (p.estado === 'RECHAZADO' && p.mercadoPagoStatus === 'refunded'))
      } else {
        filtered = filtered.filter(p => p.estado === filterEstado)
      }
    }

    // Filtro por fecha
    if (filterFecha !== 'TODOS') {
      const now = new Date()
      const fechaLimite = new Date()
      
      if (filterFecha === 'HOY') {
        fechaLimite.setHours(0, 0, 0, 0)
        filtered = filtered.filter(p => new Date(p.createdAt) >= fechaLimite)
      } else if (filterFecha === 'ULTIMOS_7') {
        fechaLimite.setDate(fechaLimite.getDate() - 7)
        filtered = filtered.filter(p => new Date(p.createdAt) >= fechaLimite)
      } else if (filterFecha === 'ULTIMOS_30') {
        fechaLimite.setDate(fechaLimite.getDate() - 30)
        filtered = filtered.filter(p => new Date(p.createdAt) >= fechaLimite)
      }
    }

    return filtered
  }

  const filteredPendientes = filterPagos(pagosPendientes)
  const filteredAprobados = filterPagos(pagosAprobados)
  const filteredDevueltos = filterPagos(pagosDevueltos)

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

      {/* Filtros */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Búsqueda */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
              placeholder="Buscar por cliente, pedido o ID cliente..."
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

          {/* Filtros por estado y fecha */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginBottom: '6px' }}>
                Estado
              </label>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="TODOS">Todos los estados</option>
                <option value="GENERADO">Generado</option>
                <option value="APROBADO">Aprobado</option>
                <option value="DEVUELTO">Devuelto</option>
                <option value="RECHAZADO">Rechazado</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginBottom: '6px' }}>
                Fecha
              </label>
              <select
                value={filterFecha}
                onChange={(e) => setFilterFecha(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="TODOS">Todas las fechas</option>
                <option value="HOY">Hoy</option>
                <option value="ULTIMOS_7">Últimos 7 días</option>
                <option value="ULTIMOS_30">Últimos 30 días</option>
              </select>
            </div>
          </div>
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>ID Plataforma</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Plataforma</th>
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
                    <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No hay pagos pendientes
                    </td>
                  </tr>
                ) : (
                  filteredPendientes.map((pago) => {
                    const estadoStyle = estadoColors[pago.estado] || estadoColors.GENERADO
                    const paymentUrl = `${window.location.origin}/pagar/${pago.token}`
                    const plataformaId = getPlataformaId(pago)
                    const plataformaInfo = getPlataformaInfo(pago)
                    return (
                      <tr key={pago.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontFamily: 'monospace' }}>{plataformaId}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {plataformaInfo.logo ? (
                            <Image
                              src={plataformaInfo.logo}
                              alt={plataformaInfo.nombre}
                              width={100}
                              height={24}
                              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                              unoptimized
                            />
                          ) : (
                            <span style={{ 
                              fontSize: '12px', 
                              color: plataformaInfo.color || '#64748b', 
                              fontWeight: 600,
                              letterSpacing: '0.3px'
                            }}>
                              {plataformaInfo.nombre}
                            </span>
                          )}
                        </td>
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

      {/* Pagos Devueltos */}
      {filteredDevueltos.length > 0 && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Pagos Devueltos</h3>
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
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>ID Plataforma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Plataforma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Cliente</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Pedido</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Monto</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Fecha Devolución</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevueltos.map((pago) => {
                    // Si el pago fue devuelto (tiene mercadoPagoStatus === 'refunded'), mostrar como DEVUELTO
                    const estadoReal = (pago.estado === 'RECHAZADO' && pago.mercadoPagoStatus === 'refunded') ? 'DEVUELTO' : pago.estado
                    const estadoStyle = estadoColors[estadoReal] || estadoColors.DEVUELTO
                    const plataformaId = getPlataformaId(pago)
                    const plataformaInfo = getPlataformaInfo(pago)
                    return (
                      <tr key={pago.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontFamily: 'monospace' }}>{plataformaId}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {plataformaInfo.logo ? (
                            <Image
                              src={plataformaInfo.logo}
                              alt={plataformaInfo.nombre}
                              width={100}
                              height={24}
                              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                              unoptimized
                            />
                          ) : (
                            <span style={{ 
                              fontSize: '12px', 
                              color: plataformaInfo.color || '#64748b', 
                              fontWeight: 600,
                              letterSpacing: '0.3px'
                            }}>
                              {plataformaInfo.nombre}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.cliente}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>{pago.idPedido || '-'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{formatCurrency(pago.monto)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#64748b' }}>{formatDate(pago.updatedAt)}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500,
                            background: estadoStyle.bg,
                            color: estadoStyle.text
                          }}>
                            {estadoLabels[estadoReal] || estadoLabels[pago.estado]}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Pagos Aprobados */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Pagos Aprobados</h3>
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>ID Plataforma</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Plataforma</th>
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
                    <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No hay pagos aprobados
                    </td>
                  </tr>
                ) : (
                  filteredAprobados.map((pago) => {
                    const estadoStyle = estadoColors[pago.estado] || estadoColors.APROBADO
                    const plataformaId = getPlataformaId(pago)
                    const plataformaInfo = getPlataformaInfo(pago)
                    return (
                      <tr key={pago.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b', fontFamily: 'monospace' }}>{plataformaId}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {plataformaInfo.logo ? (
                            <Image
                              src={plataformaInfo.logo}
                              alt={plataformaInfo.nombre}
                              width={100}
                              height={24}
                              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                              unoptimized
                            />
                          ) : (
                            <span style={{ 
                              fontSize: '12px', 
                              color: plataformaInfo.color || '#64748b', 
                              fontWeight: 600,
                              letterSpacing: '0.3px'
                            }}>
                              {plataformaInfo.nombre}
                            </span>
                          )}
                        </td>
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
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {pago.estado !== 'APROBADO' && (
                              <button
                                onClick={async () => {
                                  if (!confirm('¿Marcar este pago como APROBADO?')) return
                                  try {
                                    await fetch(`/api/pagos/${pago.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ estado: 'APROBADO', fechaPago: new Date().toISOString() }),
                                    })
                                    await fetchPagos()
                                    alert('Pago marcado como APROBADO')
                                  } catch (error) {
                                    console.error('Error actualizando pago:', error)
                                    alert('Error al actualizar el pago')
                                  }
                                }}
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
                                APROBAR
                              </button>
                            )}
                            {pago.estado === 'APROBADO' && pago.mercadoPagoId && (
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
                            )}
                          </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                      ID Pedido
                    </label>
                      <button
                        type="button"
                        onClick={() => setShowSolicitudesSelector(!showSolicitudesSelector)}
                      style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          background: showSolicitudesSelector ? '#3b82f6' : '#f1f5f9',
                          color: showSolicitudesSelector ? 'white' : '#374151',
                        border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        {showSolicitudesSelector ? 'Ocultar' : 'Asociar Solicitud'}
                      </button>
                  </div>
                    {showSolicitudesSelector && (
                      <div style={{ marginBottom: '8px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginBottom: '4px' }}>
                            Solicitudes de Visita
                    </label>
                    <select
                            onChange={(e) => {
                              if (e.target.value) {
                                // Si el ID ya tiene formato VISITA-{numero}, usarlo directamente
                                // Si no, agregar el prefijo (para IDs antiguos)
                                const idPedido = e.target.value.startsWith('VISITA-') 
                                  ? e.target.value 
                                  : `VISITA-${e.target.value}`
                                setFormData({ ...formData, idPedido })
                                setShowSolicitudesSelector(false)
                              }
                            }}
                      style={{
                        width: '100%',
                              padding: '8px 12px',
                        border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              fontSize: '13px',
                        background: 'white'
                      }}
                    >
                            <option value="">Seleccionar visita...</option>
                            {solicitudesVisita.map((s) => {
                              // Extraer el número del ID si tiene formato VISITA-{numero}, sino mostrar el ID completo
                              const displayId = s.id.startsWith('VISITA-') ? s.id : `VISITA-${s.id.slice(-4)}`
                              return (
                                <option key={s.id} value={s.id}>
                                  {displayId} - {s.nombre} - {s.email} ({new Date(s.createdAt).toLocaleDateString('es-AR')})
                                </option>
                              )
                            })}
                    </select>
                  </div>
                      <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginBottom: '4px' }}>
                            Solicitudes de Presupuesto
                        </label>
                        <select
                          onChange={(e) => {
                              if (e.target.value) {
                                // Si el ID ya tiene formato PRESUPUESTO-{numero}, usarlo directamente
                                // Si no, agregar el prefijo (para IDs antiguos)
                                const idPedido = e.target.value.startsWith('PRESUPUESTO-') 
                                  ? e.target.value 
                                  : `PRESUPUESTO-${e.target.value}`
                                setFormData({ ...formData, idPedido })
                                setShowSolicitudesSelector(false)
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              fontSize: '13px',
                              background: 'white'
                            }}
                          >
                            <option value="">Seleccionar presupuesto...</option>
                            {solicitudesPresupuesto.map((s) => {
                              // Extraer el número del ID si tiene formato PRESUPUESTO-{numero}, sino mostrar el ID completo
                              const displayId = s.id.startsWith('PRESUPUESTO-') ? s.id : `PRESUPUESTO-${s.id.slice(-4)}`
                              return (
                                <option key={s.id} value={s.id}>
                                  {displayId} - {s.nombre} - {s.email} ({new Date(s.createdAt).toLocaleDateString('es-AR')})
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    )}
                    <input
                      type="text"
                      value={formData.idPedido}
                      onChange={(e) => setFormData({ ...formData, idPedido: e.target.value })}
                      placeholder="O ingresa manualmente"
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
                      {/* Selector de Método - Mercado Pago Checkout Pro */}
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
                          <option value="checkout">Checkout Pro (Link de Pago)</option>
                          </select>
                          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                          Genera un link que el cliente puede usar para pagar con Mercado Pago
                          </p>
                        </div>
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
                        <option value="DEVUELTO">Devuelto</option>
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

