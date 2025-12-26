'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Wrench, CheckCircle, AlertCircle } from 'lucide-react'

interface MantenimientoConfig {
  activo: boolean
  titulo: string
  mensaje: string
  mostrarEmail: boolean
  email: string
  mostrarTelefono: boolean
  telefono: string
}

export default function MantenimientoConfigPage() {
  const [config, setConfig] = useState<MantenimientoConfig>({
    activo: false,
    titulo: 'Sitio en Mantenimiento',
    mensaje: 'Estamos realizando mejoras en nuestro sitio. Volveremos pronto.',
    mostrarEmail: true,
    email: 'info@meleroller.com.ar',
    mostrarTelefono: true,
    telefono: '+54 11 1234-5678',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/configuracion?clave=mantenimiento')
      const data = await res.json()
      
      if (data && data.valor) {
        const parsed = JSON.parse(data.valor)
        setConfig(parsed)
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    
    try {
      const res = await fetch('/api/configuracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clave: 'mantenimiento',
          valor: JSON.stringify(config),
          tipo: 'json',
          activo: true,
        }),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving config:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={24} style={{ color: '#64748b', animation: 'spin 1s linear infinite' }} />
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            background: 'white',
            color: '#64748b',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1'
            e.currentTarget.style.background = '#f8fafc'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.background = 'white'
          }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
            Sitio en Mantenimiento
          </h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            Activa o desactiva la pantalla de mantenimiento del sitio
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
            Configuración
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Personaliza el mensaje que verán los visitantes cuando el sitio esté en mantenimiento
          </p>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Activar/Desactivar */}
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            background: config.activo ? '#fef2f2' : '#f0f9ff',
            border: `1px solid ${config.activo ? '#fecaca' : '#bae6fd'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Wrench size={20} style={{ color: config.activo ? '#dc2626' : '#0284c7' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', marginBottom: '2px' }}>
                  {config.activo ? 'Sitio en Mantenimiento ACTIVO' : 'Sitio en Mantenimiento INACTIVO'}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {config.activo 
                    ? 'Los visitantes verán la pantalla de mantenimiento' 
                    : 'El sitio está visible para todos los visitantes'}
                </div>
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px'
            }}>
              <input
                type="checkbox"
                checked={config.activo}
                onChange={(e) => setConfig({ ...config, activo: e.target.checked })}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0
                }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: config.activo ? '#3b82f6' : '#cbd5e1',
                transition: '0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '22px',
                  width: '22px',
                  left: '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.3s',
                  borderRadius: '50%',
                  transform: config.activo ? 'translateX(24px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>

          {/* Título */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              Título
            </label>
            <input
              type="text"
              value={config.titulo}
              onChange={(e) => setConfig({ ...config, titulo: e.target.value })}
              placeholder="Sitio en Mantenimiento"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                color: '#1e293b',
                background: 'white',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Mensaje */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              Mensaje
            </label>
            <textarea
              value={config.mensaje}
              onChange={(e) => setConfig({ ...config, mensaje: e.target.value })}
              placeholder="Estamos realizando mejoras en nuestro sitio. Volveremos pronto."
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                color: '#1e293b',
                background: 'white',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Email */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={config.mostrarEmail}
                onChange={(e) => setConfig({ ...config, mostrarEmail: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1e293b',
                cursor: 'pointer'
              }}>
                Mostrar email de contacto
              </label>
            </div>
            {config.mostrarEmail && (
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                placeholder="info@meleroller.com.ar"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#1e293b',
                  background: 'white',
                  marginTop: '8px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            )}
          </div>

          {/* Teléfono */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={config.mostrarTelefono}
                onChange={(e) => setConfig({ ...config, mostrarTelefono: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1e293b',
                cursor: 'pointer'
              }}>
                Mostrar teléfono de contacto
              </label>
            </div>
            {config.mostrarTelefono && (
              <input
                type="tel"
                value={config.telefono}
                onChange={(e) => setConfig({ ...config, telefono: e.target.value })}
                placeholder="+54 11 1234-5678"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#1e293b',
                  background: 'white',
                  marginTop: '8px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            )}
          </div>

          {/* Botón Guardar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
            {saved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '14px' }}>
                <CheckCircle size={18} />
                <span>Guardado correctamente</span>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!saving) e.currentTarget.style.background = '#2563eb'
              }}
              onMouseLeave={(e) => {
                if (!saving) e.currentTarget.style.background = '#3b82f6'
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      {config.activo && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Vista Previa
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
              Así se verá la pantalla de mantenimiento
            </p>
          </div>
          <div style={{ padding: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                textAlign: 'center',
                color: 'white'
              }}
            >
              <Wrench size={64} style={{ marginBottom: '24px', opacity: 0.9 }} />
              <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                {config.titulo}
              </h1>
              <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px', maxWidth: '500px', lineHeight: '1.6' }}>
                {config.mensaje}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                {config.mostrarEmail && (
                  <a
                    href={`mailto:${config.email}`}
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    📧 {config.email}
                  </a>
                )}
                {config.mostrarTelefono && (
                  <a
                    href={`tel:${config.telefono.replace(/\s/g, '')}`}
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    📞 {config.telefono}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

