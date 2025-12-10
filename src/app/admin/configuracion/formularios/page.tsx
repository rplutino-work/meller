'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Mail, CheckCircle, FileText, MessageSquare } from 'lucide-react'

interface FormConfig {
  id?: string
  nombreFormulario: string
  emailDestino: string
  asuntoEmail: string
  mensajeExito: string
  activo: boolean
}

const formularios = [
  { key: 'visita', name: 'Solicitud de Visita', icon: MessageSquare },
  { key: 'presupuesto', name: 'Solicitud de Presupuesto', icon: FileText },
  { key: 'contacto', name: 'Formulario de Contacto', icon: Mail },
]

export default function FormulariosConfigPage() {
  const [configs, setConfigs] = useState<Record<string, FormConfig>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    try {
      const configsData: Record<string, FormConfig> = {}
      
      for (const form of formularios) {
        const res = await fetch(`/api/configuracion-formulario?nombre=${form.key}`)
        const data = await res.json()
        
        if (data) {
          configsData[form.key] = {
            id: data.id,
            nombreFormulario: data.nombreFormulario,
            emailDestino: data.emailDestino,
            asuntoEmail: data.asuntoEmail,
            mensajeExito: data.mensajeExito,
            activo: data.activo,
          }
        } else {
          // Valores por defecto
          configsData[form.key] = {
            nombreFormulario: form.key,
            emailDestino: 'info@meleroller.com.ar',
            asuntoEmail: `Nueva solicitud de ${form.name}`,
            mensajeExito: getDefaultSuccessMessage(form.key),
            activo: true,
          }
        }
      }
      
      setConfigs(configsData)
    } catch (error) {
      console.error('Error fetching configs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDefaultSuccessMessage = (key: string) => {
    switch (key) {
      case 'visita':
        return 'Nos pondremos en contacto para coordinar la visita de nuestro decorador.'
      case 'presupuesto':
        return 'Te enviaremos tu cotización dentro de las próximas 24 hs. hábiles.'
      case 'contacto':
        return 'Gracias por contactarnos. Te responderemos a la brevedad.'
      default:
        return 'Tu solicitud ha sido enviada correctamente.'
    }
  }

  const handleSave = async (key: string) => {
    setSaving({ ...saving, [key]: true })
    setSaved({ ...saved, [key]: false })
    
    try {
      const config = configs[key]
      const response = await fetch('/api/configuracion-formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      if (!response.ok) throw new Error('Error al guardar')

      setSaved({ ...saved, [key]: true })
      setTimeout(() => setSaved({ ...saved, [key]: false }), 3000)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving({ ...saving, [key]: false })
    }
  }

  const updateConfig = (key: string, field: keyof FormConfig, value: any) => {
    setConfigs({
      ...configs,
      [key]: {
        ...configs[key],
        [field]: value,
      },
    })
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
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando configuraciones...</p>
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
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Configuración de Formularios</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            Configura los emails y mensajes de éxito para cada formulario
          </p>
        </div>
      </div>

      {/* Form Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {formularios.map((form, index) => {
          const config = configs[form.key]
          if (!config) return null

          return (
            <motion.div
              key={form.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}
            >
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <form.icon size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                    {form.name}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Configuración de emails y mensajes
                  </p>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Email Destino */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email destino *
                  </label>
                  <input
                    type="email"
                    value={config.emailDestino}
                    onChange={(e) => updateConfig(form.key, 'emailDestino', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="info@meleroller.com.ar"
                  />
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', marginBottom: 0 }}>
                    Email donde se recibirán las solicitudes de este formulario
                  </p>
                </div>

                {/* Asunto Email */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Asunto del email *
                  </label>
                  <input
                    type="text"
                    value={config.asuntoEmail}
                    onChange={(e) => updateConfig(form.key, 'asuntoEmail', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Nueva solicitud de visita"
                  />
                </div>

                {/* Mensaje de Éxito */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Mensaje de éxito *
                  </label>
                  <textarea
                    value={config.mensajeExito}
                    onChange={(e) => updateConfig(form.key, 'mensajeExito', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Tu solicitud ha sido enviada correctamente."
                  />
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', marginBottom: 0 }}>
                    Mensaje que verá el usuario después de enviar el formulario
                  </p>
                </div>

                {/* Activo/Inactivo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>
                      Formulario activo
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      {config.activo ? 'El formulario está habilitado' : 'El formulario está deshabilitado'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateConfig(form.key, 'activo', !config.activo)}
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

                {/* Save Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                  {saved[form.key] && (
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
                      Cambios guardados
                    </motion.span>
                  )}
                  <button
                    onClick={() => handleSave(form.key)}
                    disabled={saving[form.key]}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: saving[form.key] ? '#94a3b8' : '#1e293b',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                      cursor: saving[form.key] ? 'not-allowed' : 'pointer',
                      boxShadow: saving[form.key] ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    {saving[form.key] ? (
                      <>
                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Guardar
                      </>
                    )}
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

