'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Save,
  Users,
  Shield,
  UserCheck,
  AlertCircle
} from 'lucide-react'

interface Usuario {
  id: string
  email: string
  name: string | null
  role: string
  canManageVisitas: boolean
  canManagePresupuestos: boolean
  createdAt: string
  updatedAt: string
}

export default function UsuariosPage() {
  const { data: session } = useSession()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'ADMIN',
    canManageVisitas: true,
    canManagePresupuestos: true
  })
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    checkPermissions()
    fetchUsuarios()
  }, [session])

  async function checkPermissions() {
    if (!session?.user?.email) return
    
    try {
      const res = await fetch('/api/usuarios')
      if (res.ok) {
        setIsSuperAdmin(true)
      } else if (res.status === 403) {
        setIsSuperAdmin(false)
      }
    } catch (error) {
      console.error('Error checking permissions:', error)
      setIsSuperAdmin(false)
    }
  }

  async function fetchUsuarios() {
    try {
      setLoading(true)
      const res = await fetch('/api/usuarios')
      if (res.status === 403) {
        setError('No tienes permisos para ver usuarios. Solo el superadmin puede gestionar usuarios.')
        setLoading(false)
        return
      }
      if (!res.ok) throw new Error('Error al cargar usuarios')
      const data = await res.json()
      setUsuarios(data)
      setError('')
    } catch (error) {
      console.error('Error fetching usuarios:', error)
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setIsCreating(true)
    setEditingUsuario(null)
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'ADMIN',
      canManageVisitas: true,
      canManagePresupuestos: true
    })
    setModalOpen(true)
  }

  function openEditModal(usuario: Usuario) {
    setIsCreating(false)
    setEditingUsuario(usuario)
    setFormData({
      email: usuario.email,
      password: '', // No mostrar contraseña
      name: usuario.name || '',
      role: usuario.role,
      canManageVisitas: usuario.canManageVisitas,
      canManagePresupuestos: usuario.canManagePresupuestos
    })
    setModalOpen(true)
  }

  async function handleSave() {
    if (!formData.email) {
      setError('El email es requerido')
      return
    }

    if (isCreating && !formData.password) {
      setError('La contraseña es requerida para nuevos usuarios')
      return
    }

    setSaving(true)
    setError('')

    try {
      if (isCreating) {
        const res = await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Error al crear usuario')
        }
      } else if (editingUsuario) {
        const updateData: any = {
          email: formData.email,
          name: formData.name,
          role: formData.role,
          canManageVisitas: formData.canManageVisitas,
          canManagePresupuestos: formData.canManagePresupuestos
        }
        // Solo incluir password si se proporcionó
        if (formData.password) {
          updateData.password = formData.password
        }
        
        const res = await fetch(`/api/usuarios/${editingUsuario.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Error al actualizar usuario')
        }
      }
      await fetchUsuarios()
      setModalOpen(false)
    } catch (error: any) {
      console.error('Error saving usuario:', error)
      setError(error.message || 'Error al guardar usuario')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    try {
      const res = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Error al eliminar usuario')
      }
      await fetchUsuarios()
    } catch (error: any) {
      alert(error.message || 'Error al eliminar usuario')
    }
  }

  const getRoleBadge = (role: string) => {
    if (role === 'SUPERADMIN') {
      return {
        bg: '#fef3c7',
        color: '#92400e',
        icon: Shield,
        label: 'Super Admin'
      }
    }
    return {
      bg: '#dbeafe',
      color: '#1e40af',
      icon: UserCheck,
      label: 'Admin'
    }
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
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando usuarios...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!isSuperAdmin) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Usuarios</h1>
            <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
              Gestión de usuarios del sistema
            </p>
          </div>
        </div>

        <div style={{
          background: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          alignItems: 'start',
          gap: '12px'
        }}>
          <AlertCircle size={24} style={{ color: '#92400e', flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#92400e', margin: '0 0 8px 0' }}>
              Acceso Restringido
            </h3>
            <p style={{ fontSize: '14px', color: '#78350f', margin: 0, lineHeight: '1.6' }}>
              Solo el superadmin puede gestionar usuarios. Si necesitas acceso, contacta al administrador del sistema.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
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
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Usuarios</h1>
            <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
              Gestiona los usuarios y permisos del sistema
            </p>
          </div>
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
          CREAR USUARIO
        </button>
      </div>

      {/* Error message */}
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

      {/* Table */}
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
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Usuario</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Rol</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Permisos</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Creado</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: '#64748b', fontSize: '14px' }}>
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => {
                  const roleBadge = getRoleBadge(usuario.role)
                  const RoleIcon = roleBadge.icon
                  return (
                    <tr key={usuario.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b', margin: '0 0 4px 0' }}>
                            {usuario.name || 'Sin nombre'}
                          </p>
                          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                            {usuario.email}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: roleBadge.bg,
                          color: roleBadge.color
                        }}>
                          <RoleIcon size={14} />
                          {roleBadge.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {usuario.canManageVisitas && (
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 500,
                              background: '#dbeafe',
                              color: '#1e40af',
                              width: 'fit-content'
                            }}>
                              Visitas
                            </span>
                          )}
                          {usuario.canManagePresupuestos && (
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 500,
                              background: '#dcfce7',
                              color: '#166534',
                              width: 'fit-content'
                            }}>
                              Presupuestos
                            </span>
                          )}
                          {!usuario.canManageVisitas && !usuario.canManagePresupuestos && (
                            <span style={{
                              fontSize: '12px',
                              color: '#94a3b8',
                              fontStyle: 'italic'
                            }}>
                              Sin permisos
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#64748b' }}>
                        {new Date(usuario.createdAt).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openEditModal(usuario)}
                          style={{
                            padding: '6px 12px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Edit size={14} />
                          EDITAR
                        </button>
                        {usuario.id !== session?.user?.id && (
                          <button
                            onClick={() => handleDelete(usuario.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Trash2 size={14} />
                            ELIMINAR
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
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
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.5)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '500px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                position: 'relative',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                  {isCreating ? 'Crear Usuario' : 'Editar Usuario'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div style={{
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#991b1b'
                }}>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: '14px' }}>{error}</span>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                    Nombre (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
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
                    Contraseña {isCreating ? '*' : '(dejar vacío para no cambiar)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={isCreating}
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
                    Rol *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                    <option value="ADMIN">Admin</option>
                    <option value="SUPERADMIN">Super Admin</option>
                  </select>
                </div>

                <div style={{ 
                  padding: '16px', 
                  background: '#f9fafb', 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb' 
                }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#374151', 
                    marginBottom: '12px' 
                  }}>
                    Permisos de Gestión
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.canManageVisitas}
                        onChange={(e) => setFormData({ ...formData, canManageVisitas: e.target.checked })}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#10b981'
                        }}
                      />
                      <span>Gestionar Solicitudes de Visita</span>
                    </label>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.canManagePresupuestos}
                        onChange={(e) => setFormData({ ...formData, canManagePresupuestos: e.target.checked })}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#10b981'
                        }}
                      />
                      <span>Gestionar Presupuestos</span>
                    </label>
                  </div>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    marginTop: '12px', 
                    marginBottom: 0,
                    lineHeight: '1.5'
                  }}>
                    Selecciona qué secciones puede gestionar este usuario en el panel de administración.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    style={{
                      flex: 1,
                      padding: '10px 20px',
                      background: '#f1f5f9',
                      color: '#374151',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      flex: 1,
                      padding: '10px 20px',
                      background: saving ? '#94a3b8' : '#10b981',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
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
                        {isCreating ? 'CREAR' : 'GUARDAR'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}


