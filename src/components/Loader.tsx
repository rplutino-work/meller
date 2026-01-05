'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Función para ocultar el loader
    const hideLoader = () => {
      // Fade out suave
      setOpacity(0)
      // Remover del DOM después de la animación
      setTimeout(() => {
        setIsVisible(false)
        // Permitir scroll nuevamente
        document.body.style.overflow = ''
      }, 600)
    }

    // Bloquear scroll mientras carga
    document.body.style.overflow = 'hidden'

    // Verificar si la página ya está cargada
    if (document.readyState === 'complete') {
      // Esperar un mínimo para que se vea la animación (mínimo 800ms)
      const minDisplayTime = 800
      const elapsed = 0
      const remaining = Math.max(0, minDisplayTime - elapsed)
      setTimeout(hideLoader, remaining)
    } else {
      // Esperar a que cargue todo
      const startTime = Date.now()
      window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime
        const minDisplayTime = 800
        const remaining = Math.max(0, minDisplayTime - elapsed)
        setTimeout(hideLoader, remaining)
      })
      
      return () => {
        window.removeEventListener('load', hideLoader)
        document.body.style.overflow = ''
      }
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#ffffff',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: opacity,
          transition: 'opacity 0.6s ease-out',
          pointerEvents: 'none',
        }}
      >
        {/* Cuadrado giratorio - estilo del sitio original */}
        <div style={{
          width: '40px',
          height: '40px',
          background: '#d3d3d3', // Gris claro como en la captura
          transform: 'rotate(15deg)', // Rotación inicial
          animation: 'loader-spin 1.2s linear infinite',
        }} />
      </div>
      
      <style jsx global>{`
        @keyframes loader-spin {
          0% {
            transform: rotate(15deg);
          }
          100% {
            transform: rotate(375deg);
          }
        }
      `}</style>
    </>
  )
}

