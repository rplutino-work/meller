'use client'

import { useEffect } from 'react'
import { Wrench } from 'lucide-react'

interface MantenimientoScreenProps {
  titulo: string
  mensaje: string
  mostrarEmail: boolean
  email: string
  mostrarTelefono: boolean
  telefono: string
}

export default function MantenimientoScreen({
  titulo,
  mensaje,
  mostrarEmail,
  email,
  mostrarTelefono,
  telefono,
}: MantenimientoScreenProps) {
  useEffect(() => {
    // Ocultar el footer cuando está en mantenimiento
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
    }
    
    // Asegurar que el body no tenga scroll
    document.body.style.overflow = 'hidden'
    
    return () => {
      // Restaurar cuando se desmonte
      if (footer) {
        footer.style.display = ''
      }
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      zIndex: 9999,
      overflow: 'auto'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: '100%'
        }}>
          <Wrench size={64} style={{ opacity: 0.9, flexShrink: 0 }} />
          
          <h1 style={{ 
            fontSize: 'clamp(28px, 5vw, 48px)', 
            fontWeight: 700, 
            margin: 0,
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>
            {titulo}
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(16px, 2.5vw, 20px)', 
            opacity: 0.9, 
            margin: 0,
            lineHeight: '1.6',
            maxWidth: '500px'
          }}>
            {mensaje}
          </p>
          
          {(mostrarEmail || mostrarTelefono) && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              alignItems: 'center',
              marginTop: '8px'
            }}>
              {mostrarEmail && (
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  📧 {email}
                </a>
              )}
              {mostrarTelefono && (
                <a
                  href={`tel:${telefono.replace(/\s/g, '')}`}
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  📞 {telefono}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

