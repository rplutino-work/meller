'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Mail, Bell, ChevronRight, Settings, Palette, Globe, Sparkles, Image } from 'lucide-react'

const configuraciones = [
  {
    id: 'customizacion',
    title: 'Hero & Banners',
    description: 'Gestiona el hero, banners y personalización visual.',
    icon: Image,
    href: '/admin/configuracion/customizacion',
  },
  {
    id: 'preheader',
    title: 'Banner promocional',
    description: 'Texto del preheader superior del sitio.',
    icon: FileText,
    href: '/admin/configuracion/preheader',
  },
  {
    id: 'formularios',
    title: 'Formularios',
    description: 'Emails y mensajes de formularios.',
    icon: Mail,
    href: '/admin/configuracion/formularios',
  },
  {
    id: 'notificaciones',
    title: 'Notificaciones',
    description: 'Alertas y notificaciones del sistema.',
    icon: Bell,
    href: '/admin/configuracion/notificaciones',
  },
]

const proximamente = [
  { title: 'Apariencia', description: 'Personaliza colores y estilos.', icon: Palette },
  { title: 'SEO', description: 'Optimiza para buscadores.', icon: Globe },
  { title: 'Integraciones', description: 'Conecta servicios externos.', icon: Sparkles },
]

export default function ConfiguracionPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Preferencias del sitio</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            Gestiona los ajustes clave y la apariencia del sitio
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
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
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          Ver sitio
        </Link>
      </div>

      {/* Configuraciones disponibles */}
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
          <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0', fontWeight: 600 }}>
            Secciones
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>Configuraciones disponibles</h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Estilo tipo Shopify: tarjetas claras y concisas.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '20px' }}>
          {configuraciones.map((config, index) => (
            <motion.div
              key={config.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={config.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <config.icon size={22} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
                          {config.title}
                        </h3>
                        <ChevronRight size={18} style={{ color: '#cbd5e1', flexShrink: 0, marginTop: '2px' }} />
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                        {config.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Próximamente */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Próximamente</h2>
          <span style={{
            padding: '4px 10px',
            borderRadius: '12px',
            background: '#fef3c7',
            color: '#92400e',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            En desarrollo
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '20px' }}>
          {proximamente.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px dashed #cbd5e1',
                padding: '20px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px',
                height: '100%'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  flexShrink: 0
                }}>
                  <item.icon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#475569', margin: '0 0 4px 0' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px',
        display: 'flex',
        alignItems: 'start',
        gap: '16px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexShrink: 0
        }}>
          <Settings size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' }}>¿Necesitas ayuda?</h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
            Si tienes dudas sobre alguna configuración o necesitas asistencia, contáctanos.
          </p>
        </div>
      </div>
    </div>
  )
}
