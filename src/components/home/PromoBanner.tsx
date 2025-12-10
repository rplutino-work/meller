'use client'

import { useState, useEffect } from 'react'

export default function PromoBanner() {
  const [config, setConfig] = useState({
    texto: '15% OFF en toda nuestra línea abonando por transferencia y 6 cuotas sin interés',
    activo: true,
  })
  const [loading, setLoading] = useState(true)

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
      console.error('Error fetching preheader config:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !config.activo) {
    return null
  }

  return (
    <div 
      className="promo-banner-container"
      style={{
        width: '100vw',
        backgroundColor: '#000',
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 1029,
        overflow: 'hidden',
        left: 0,
        right: 0
      }}
    >
      <div 
        className="animate-marquee whitespace-nowrap flex bg-black text-white"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '15px 0',
          width: '100%',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          minHeight: '45px'
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-[16px] font-light tracking-normal inline-block"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              letterSpacing: 'normal',
              margin: '0 24px',
              color: '#fff',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            {config.texto} <span style={{ margin: '0 16px' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
