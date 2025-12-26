'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Eye, 
  Trash2, 
  X,
  FileText,
  Phone,
  Mail,
  Package,
  Download,
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical
} from 'lucide-react'

interface Producto {
  tipo: string
  ancho: string
  alto: string
}

interface SolicitudPresupuesto {
  id: string
  nombre: string
  email: string
  telefono: string
  productos: string
  estado: string
  notas: string
  createdAt: string
  updatedAt: string
}

const estados = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO']

const estadoLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  EN_PROCESO: 'En Proceso',
  COMPLETADO: 'Completado',
  CANCELADO: 'Cancelado',
}

const estadoColors: Record<string, { bg: string; text: string; border: string }> = {
  PENDIENTE: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
  EN_PROCESO: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  COMPLETADO: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  CANCELADO: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
}

export default function PresupuestosPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPresupuesto[]>([])
  const [filteredSolicitudes, setFilteredSolicitudes] = useState<SolicitudPresupuesto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEstado, setFilterEstado] = useState('')
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudPresupuesto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  useEffect(() => {
    let filtered = solicitudes

    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.telefono.includes(searchTerm)
      )
    }

    if (filterEstado) {
      filtered = filtered.filter(s => s.estado === filterEstado)
    }

    setFilteredSolicitudes(filtered)
  }, [solicitudes, searchTerm, filterEstado])

  async function fetchSolicitudes() {
    try {
      const res = await fetch('/api/solicitudes/presupuesto')
      const data = await res.json()
      setSolicitudes(data)
      setFilteredSolicitudes(data)
    } catch (error) {
      console.error('Error fetching solicitudes:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateEstado(id: string, estado: string) {
    try {
      await fetch(`/api/solicitudes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado, tipo: 'presupuesto' }),
      })
      fetchSolicitudes()
    } catch (error) {
      console.error('Error updating estado:', error)
    }
  }

  async function deleteSolicitud(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return

    try {
      await fetch(`/api/solicitudes/${id}?tipo=presupuesto`, {
        method: 'DELETE',
      })
      fetchSolicitudes()
      setModalOpen(false)
    } catch (error) {
      console.error('Error deleting solicitud:', error)
    }
  }

  function parseProductos(productosStr: string): Producto[] {
    try {
      return JSON.parse(productosStr)
    } catch {
      return []
    }
  }

  function exportToCSV() {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Productos', 'Estado', 'Fecha']
    const rows = filteredSolicitudes.map(s => {
      const productos = parseProductos(s.productos)
      const productosStr = productos.map(p => `${p.tipo} (${p.ancho}x${p.alto}cm)`).join('; ')
      return [
        s.nombre,
        s.email,
        s.telefono,
        productosStr,
        s.estado,
        new Date(s.createdAt).toLocaleDateString('es-AR'),
      ]
    })

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `solicitudes-presupuesto-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

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
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando presupuestos...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Solicitudes de Presupuesto</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            {filteredSolicitudes.length} presupuesto{filteredSolicitudes.length !== 1 ? 's' : ''} encontrado{filteredSolicitudes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={exportToCSV}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'white',
            color: '#374151',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <Download size={16} />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
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
          <div style={{ position: 'relative' }}>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              style={{
                padding: '10px 40px 10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer',
                outline: 'none',
                fontFamily: 'inherit',
                minWidth: '180px',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 10px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px'
              }}
            >
              <option value="">Todos los estados</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>{estadoLabels[estado]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {filteredSolicitudes.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '64px 24px',
          textAlign: 'center'
        }}>
          <FileText size={48} style={{ color: '#cbd5e1', margin: '0 auto 16px' }} />
          <p style={{ color: '#475569', fontWeight: 500, fontSize: '16px', margin: '0 0 8px 0' }}>No se encontraron presupuestos</p>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {filteredSolicitudes.map((solicitud) => {
            const productos = parseProductos(solicitud.productos)
            const estadoStyle = estadoColors[solicitud.estado]
            
            return (
              <motion.div
                key={solicitud.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transform: 'translateY(-2px)' }}
                onClick={() => {
                  setSelectedSolicitud(solicitud)
                  setModalOpen(true)
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '18px'
                    }}>
                      {solicitud.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {solicitud.nombre}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {solicitud.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedSolicitud(solicitud)
                      setModalOpen(true)
                    }}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer'
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <Phone size={14} />
                    <span>{solicitud.telefono}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <Package size={14} />
                    <span>{productos.length} producto{productos.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <select
                    value={solicitud.estado}
                    onChange={(e) => {
                      e.stopPropagation()
                      updateEstado(solicitud.id, e.target.value)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 500,
                      border: `1px solid ${estadoStyle.border}`,
                      background: estadoStyle.bg,
                      color: estadoStyle.text,
                      cursor: 'pointer',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estadoLabels[estado]}</option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSolicitud(solicitud)
                        setModalOpen(true)
                      }}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        border: 'none',
                        color: '#3b82f6',
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSolicitud(solicitud.id)
                      }}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background: '#fef2f2',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Date */}
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '12px 0 0 0' }}>
                  {new Date(solicitud.createdAt).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && selectedSolicitud && (
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
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Detalle de Presupuesto</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '24px'
                  }}>
                    {selectedSolicitud.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>
                      {selectedSolicitud.nombre}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: estadoColors[selectedSolicitud.estado].bg,
                      color: estadoColors[selectedSolicitud.estado].text,
                      border: `1px solid ${estadoColors[selectedSolicitud.estado].border}`
                    }}>
                      {estadoLabels[selectedSolicitud.estado]}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <Mail size={20} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Email</p>
                      <a href={`mailto:${selectedSolicitud.email}`} style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {selectedSolicitud.email}
                      </a>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <Phone size={20} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Teléfono</p>
                      <a href={`tel:${selectedSolicitud.telefono}`} style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {selectedSolicitud.telefono}
                      </a>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <Package size={20} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>Productos solicitados</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {parseProductos(selectedSolicitud.productos).map((producto, index) => (
                          <div key={index} style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '12px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <p style={{ fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0', fontSize: '14px' }}>{producto.tipo}</p>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                              Medidas: <span style={{ fontWeight: 500, color: '#334155' }}>{producto.ancho} x {producto.alto} cm</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <CalendarCheck size={20} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Fecha de solicitud</p>
                      <p style={{ fontWeight: 500, color: '#1e293b', margin: 0, fontSize: '14px' }}>
                        {new Date(selectedSolicitud.createdAt).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '20px',
                borderTop: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                gap: '12px'
              }}>
                <a
                  href={`https://wa.me/54${selectedSolicitud.telefono.replace(/\D/g, '')}?text=Hola ${selectedSolicitud.nombre}, te contactamos de MeleRoller por tu solicitud de presupuesto...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#10b981',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selectedSolicitud.email}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <Mail size={18} />
                  Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
