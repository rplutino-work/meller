'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, CheckCircle, ArrowLeft, Eye, Type, ToggleLeft, ToggleRight } from 'lucide-react'
import Link from 'next/link'

export default function PreheaderConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    texto: '15% OFF en toda nuestra línea abonando por transferencia y 6 cuotas sin interés',
    activo: true,
  })

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    try {
      const res = await fetch('/api/configuracion?clave=preheader')
      const data = await res.json()
      
      if (data && data.valor) {
        const valor = JSON.parse(data.valor)
        setConfig({
          texto: valor.texto || config.texto,
          activo: data.activo !== undefined ? data.activo : true,
        })
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)

    try {
      const response = await fetch('/api/configuracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clave: 'preheader',
          valor: JSON.stringify(config),
          tipo: 'json',
          activo: config.activo,
        }),
      })

      if (!response.ok) throw new Error('Error al guardar')

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
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
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando configuración...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
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
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Banner Promocional</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>Configura el texto que aparece en el banner superior</p>
        </div>
      </div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc'
        }}>
          <Eye size={18} style={{ color: '#64748b' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Vista previa en tiempo real</span>
        </div>
        <div style={{
          background: '#000',
          color: '#fff',
          padding: '12px 0',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            whiteSpace: 'nowrap',
            display: 'flex',
            animation: 'marquee 15s linear infinite'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: 'normal',
              margin: '0 24px',
              display: 'inline-block'
            }}>
              {config.texto || 'Texto del banner'} <span style={{ margin: '0 16px' }}>•</span>
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: 'normal',
              margin: '0 24px',
              display: 'inline-block'
            }}>
              {config.texto || 'Texto del banner'} <span style={{ margin: '0 16px' }}>•</span>
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: 'normal',
              margin: '0 24px',
              display: 'inline-block'
            }}>
              {config.texto || 'Texto del banner'} <span style={{ margin: '0 16px' }}>•</span>
            </span>
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
          `}</style>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#f8fafc'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Type size={20} style={{ color: 'white' }} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>Contenido del banner</span>
        </div>
        
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Texto */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '8px'
            }}>
              Texto promocional
            </label>
            <textarea
              value={config.texto}
              onChange={(e) => setConfig({ ...config, texto: e.target.value })}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'all 0.2s ease',
                lineHeight: '1.6'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="15% OFF en toda nuestra línea abonando por transferencia y 6 cuotas sin interés"
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', marginBottom: 0 }}>
              Este texto se mostrará scrolleando en el banner superior del sitio
            </p>
          </div>

          {/* Activo/Inactivo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>Mostrar banner</p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Activa o desactiva el pre-header en el sitio</p>
            </div>
            <button
              onClick={() => setConfig({ ...config, activo: !config.activo })}
              style={{
                width: '56px',
                height: '32px',
                borderRadius: '16px',
                background: config.activo ? '#3b82f6' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
                padding: '2px'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'white',
                transform: config.activo ? 'translateX(24px)' : 'translateX(0)',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}></div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#10b981',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            <CheckCircle size={18} />
            Cambios guardados exitosamente
          </motion.span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: saving ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: saving ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease'
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
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
      </div>
    </div>
  )
}
