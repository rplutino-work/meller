'use client'

import { useEffect } from 'react'

export default function CortinasRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Ocultar el footer global en las páginas de cortinas
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
    }
    
    return () => {
      // Restaurar el footer cuando se sale de la página
      if (footer) {
        footer.style.display = ''
      }
    }
  }, [])

  return <>{children}</>
}

