'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Users,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Shield
} from 'lucide-react'

interface Usuario {
  id: string
  name: string | null
  email: string
  recibeConsultas: boolean
}

interface Turno {
  tipoSolicitud: string
  ultimoUsuarioId: string | null
}

export default function AsignacionPage() {
  const { data: session } = useSession()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    try {
      setLoading(true)
      const res = await fetch('/api/asignacion')
      if (res.status === 403) {
        setError('Solo el superadmin puede gestionar la asignación de consultas.')
        setLoading(false)
        return
      }
      if (!res.ok) throw new Error('Error al cargar configuración')
      const data = await res.json()
      setUsuarios(data.usuarios)
      setTurnos(data.turnos)
      setSelectedIds(data.usuarios.filter((u: Usuario) => u.recibeConsultas).map((u: Usuario) => u.id))
    } catch (err: any) {
      setError(err.message || 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  function toggleUser(id: string) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    setSuccess('')
  }

  async function handleSave() {
    if (selectedIds.length === 0) {
      setError('Debe haber al menos un usuario habilitado para recibir consultas.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/asignacion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuariosHabilitados: selectedIds }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al guardar')
      }
      setSuccess('Configuración guardada correctamente.')
      await fetchConfig()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function getUltimoAsignado(tipo: string): string {
    const turno = turnos.find(t => t.tipoSolicitud === tipo)
    if (!turno?.ultimoUsuarioId) return 'Ninguno (la primera consulta va al primero de la lista)'
    const user = usuarios.find(u => u.id === turno.ultimoUsuarioId)
    return user?.name || 'Usuario eliminado'
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #8b5cf6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando configuración...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          href="/admin/configuracion"
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Asignación de Consultas</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            Configura quiénes reciben consultas de forma alternada (round-robin)
          </p>
        </div>
      </div>

      {/* Explicación */}
      <div style={{
        background: '#f5f3ff',
        border: '1px solid #e9d5ff',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        alignItems: 'start',
        gap: '12px'
      }}>
        <RefreshCw size={22} style={{ color: '#7c3aed', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#7c3aed', margin: '0 0 8px 0' }}>
            ¿Cómo funciona?
          </h3>
          <p style={{ fontSize: '14px', color: '#6d28d9', margin: 0, lineHeight: '1.6' }}>
            Las consultas se asignan de forma alternada entre los usuarios habilitados.
            Si hay 2 personas, la primera consulta va para una, la segunda para la otra, y así sucesivamente.
            Cada tipo de solicitud (visitas y presupuestos) tiene su propio turno independiente.
          </p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#991b1b'
        }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: '14px' }}>{error}</span>
        </div>
      )}

      {success && (
        <div style={{
          background: '#d1fae5',
          border: '1px solid #6ee7b7',
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#065f46'
        }}>
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '14px' }}>{success}</span>
        </div>
      )}

      {/* Usuarios */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} />
            Usuarios que reciben consultas
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Selecciona los usuarios que participan en la rotación. Si deshabilitas a alguien, todas las consultas irán a los restantes.
          </p>
        </div>

        <div style={{ padding: '8px' }}>
          {usuarios.length === 0 ? (
            <p style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
              No hay usuarios admin disponibles.
            </p>
          ) : (
            usuarios.map(user => {
              const isSelected = selectedIds.includes(user.id)
              return (
                <div
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: isSelected ? '#f5f3ff' : 'transparent',
                    border: isSelected ? '1px solid #e9d5ff' : '1px solid transparent',
                    marginBottom: '4px'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid #8b5cf6' : '2px solid #d1d5db',
                    background: isSelected ? '#8b5cf6' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.5 4L5.5 10L2.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isSelected ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? 'white' : '#64748b',
                    fontWeight: 600,
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    {(user.name || '?').charAt(0).toUpperCase()}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 2px 0' }}>
                      {user.name || 'Sin nombre'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                      {user.email}
                    </p>
                  </div>

                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 500,
                    background: isSelected ? '#d1fae5' : '#fee2e2',
                    color: isSelected ? '#065f46' : '#991b1b'
                  }}>
                    {isSelected ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Estado actual de turnos */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={18} />
          Estado actual de los turnos
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['visita', 'presupuesto'].map(tipo => (
            <div key={tipo} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#f8fafc',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151', textTransform: 'capitalize' }}>
                {tipo === 'visita' ? 'Solicitudes de Visita' : 'Presupuestos'}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Último asignado: <strong style={{ color: '#7c3aed' }}>{getUltimoAsignado(tipo)}</strong>
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '12px 0 0 0' }}>
          La próxima consulta se asignará al siguiente usuario de la lista.
        </p>
      </div>

      {/* Save button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: saving ? '#94a3b8' : '#8b5cf6',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
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
              Guardar Configuración
            </>
          )}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
