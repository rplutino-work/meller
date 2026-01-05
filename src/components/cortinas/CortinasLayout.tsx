'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, useState, useEffect } from 'react'
import PhotosModal from '@/components/modals/PhotosModal'
import QuoteModal from '@/components/modals/QuoteModal'
import VisitForm from '@/components/forms/VisitForm'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import LandingNavbar from '@/components/layout/LandingNavbar'

const cortinasMenu = [
  { name: 'BlackOut', href: '/cortinas/blackout', id: 'blackout' },
  { name: 'SunScreen', href: '/cortinas/sunscreen', id: 'sunscreen' },
  { name: 'Romanas', href: '/cortinas/romanas', id: 'romanas' },
  { name: 'Orientales', href: '/cortinas/orientales', id: 'orientales' },
  { name: 'Tradicionales', href: '/cortinas/tradicionales', id: 'tradicionales' },
  { name: 'Eclipse', href: '/cortinas/eclipse', id: 'eclipse' },
  { name: 'Bandas Verticales', href: '/cortinas/bandas-verticales', id: 'bandas-verticales' },
]

interface CortinasLayoutProps {
  children: ReactNode
  currentPage: string
  titulo: string
  subtitulo: string
  heroImage: string
  categoria?: string // "CORTINAS" o "PANELES" o "BANDAS"
  galleryImages?: string[] // Imágenes para la galería
}

export default function CortinasLayout({
  children,
  currentPage,
  titulo,
  subtitulo,
  heroImage,
  categoria = 'CORTINAS',
  galleryImages = []
}: CortinasLayoutProps) {
  const [photosModalOpen, setPhotosModalOpen] = useState(false)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [visitModalOpen, setVisitModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Ocultar el footer global en las páginas de cortinas
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
    }
    
    // Detectar tamaño de pantalla
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(true) // Siempre visible en desktop
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      // Restaurar el footer cuando se sale de la página
      if (footer) {
        footer.style.display = ''
      }
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Oswald, sans-serif' }}
    >
      {/* Navbar top para mobile */}
      {isMobile && <LandingNavbar />}

      {/* Sidebar izquierdo - solo desktop */}
      {!isMobile && (
        <aside style={{
          width: '220px',
          minWidth: '220px',
          backgroundColor: '#000',
          padding: '24px 20px 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: photosModalOpen ? 40 : 100,
          overflowY: 'hidden',
          opacity: photosModalOpen ? 0.5 : 1,
          transition: 'opacity 0.3s',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'block', marginBottom: '24px', flexShrink: 0 }}>
          <Image
            src="/images/logos/logo-vertical.png"
            alt="MELE ROLLER"
            width={120}
            height={120}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '120px',
              margin: '0 auto',
              display: 'block',
              filter: 'invert(1)',
              objectFit: 'cover'
            }}
            priority
            unoptimized
          />
        </Link>

        {/* Título del menú */}
        <h4 style={{
          color: '#fff',
          fontSize: '16px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 400,
          marginBottom: '12px',
          borderBottom: '1px solid #333',
          paddingBottom: '8px',
          flexShrink: 0
        }}>
          Cortinas
        </h4>

        {/* Links del menú */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, overflowY: 'hidden' }}>
          {cortinasMenu.map((item) => (
            <li key={item.id} style={{ marginBottom: '4px' }}>
              <Link
                href={item.href}
                style={{
                  color: currentPage === item.id ? '#fff' : '#888',
                  fontSize: '14px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 300,
                  textDecoration: 'none',
                  display: 'block',
                  padding: '4px 0',
                  borderBottom: currentPage === item.id ? '1px solid #fff' : '1px solid transparent',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = '#fff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = '#888'
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Teléfono */}
        <div style={{ marginTop: '16px', flexShrink: 0 }}>
          <a
            href="https://wa.me/541144184913"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 300,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Image
              src="/images/whatsapp-ico.png"
              alt="WhatsApp"
              width={14}
              height={14}
              style={{ filter: 'invert(1)' }}
            />
            11 4418 4913
          </a>
        </div>
      </aside>
      )}

      {/* Contenido principal */}
      <main style={{
        marginLeft: isMobile ? '0' : '220px',
        flex: 1,
        position: 'relative',
        width: isMobile ? '100%' : 'auto',
        paddingTop: isMobile ? '80px' : '0'
      }}>
        {/* Botón Ver fotos */}
        {galleryImages && galleryImages.length > 0 && (
          <button
            onClick={() => setPhotosModalOpen(true)}
            style={{
              position: 'absolute',
              top: isMobile ? '100px' : '20px',
              right: isMobile ? '10px' : '20px',
              zIndex: 50,
              background: '#fff',
              border: 'none',
              color: '#666',
              fontSize: isMobile ? '12px' : '14px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 300,
              cursor: 'pointer',
              padding: isMobile ? '6px 12px' : '8px 16px',
              textDecoration: 'none'
            }}
          >
            Ver fotos
          </button>
        )}

        {/* Hero Section con título */}
        <div style={{ position: 'relative' }}>
          {/* Contenedor de título y subtítulo */}
          <div style={{ position: 'absolute', top: isMobile ? '20px' : 0, left: isMobile ? '10px' : 0, zIndex: 10 }}>
            {/* Title Block */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: '#000',
                padding: isMobile ? '16px 20px' : '24px 32px',
                maxWidth: isMobile ? 'calc(100vw - 40px)' : '600px',
                width: isMobile ? 'calc(100vw - 40px)' : 'auto'
              }}
            >
              <h1 style={{
                fontSize: isMobile ? '32px' : '66px',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 300,
                color: '#fff',
                lineHeight: '1.1',
                margin: 0,
                paddingBottom: '0'
              }}>
                {categoria}<br />
                <strong style={{ fontWeight: 700 }}>{titulo}</strong>
              </h1>
            </motion.div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: isMobile ? '12px 20px' : '16px 32px',
                marginTop: '0',
                maxWidth: isMobile ? 'calc(100vw - 40px)' : '600px',
                width: isMobile ? 'calc(100vw - 40px)' : 'auto'
              }}
            >
              <h2 style={{
                fontSize: isMobile ? '16px' : '24px',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 300,
                color: '#333',
                margin: 0
              }}>
                {subtitulo}
              </h2>
            </motion.div>
          </div>

          {/* Imagen de fondo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              height: isMobile ? '250px' : '500px',
              position: 'relative',
              backgroundColor: '#e5e5e5'
            }}
          >
            <Image
              src={heroImage}
              alt={titulo}
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized
            />
          </motion.div>
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: isMobile ? '20px 15px' : '40px 60px' }}
        >
          {children}
        </motion.div>

        {/* Botones CTA */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          padding: isMobile ? '0 20px 40px' : '0 60px 60px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setQuoteModalOpen(true)}
            style={{
              display: 'inline-block',
              padding: isMobile ? '14px 24px' : '16px 32px',
              background: '#000',
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '14px' : '16px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 400,
              border: '2px solid #000',
              transition: 'all 0.3s',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000'
              e.currentTarget.style.color = '#fff'
            }}
          >
            Solicitar Presupuesto Online
          </button>
          <button
            onClick={() => setVisitModalOpen(true)}
            style={{
              display: 'inline-block',
              padding: isMobile ? '14px 24px' : '16px 32px',
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
              fontSize: isMobile ? '14px' : '16px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 400,
              border: '2px solid #000',
              transition: 'all 0.3s',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#000'
            }}
          >
            Solicitar visita de un decorador SIN CARGO
          </button>
        </div>
      </main>

      {/* Modals */}
      {galleryImages && galleryImages.length > 0 && (
        <PhotosModal
          isOpen={photosModalOpen}
          onClose={() => setPhotosModalOpen(false)}
          images={galleryImages}
          title={`${categoria} ${titulo}`}
        />
      )}
      
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      
      {/* Visit Modal */}
      <AnimatePresence>
        {visitModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisitModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-20 left-4 right-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full bg-white shadow-2xl z-[110] overflow-hidden"
              style={{ borderRadius: '0' }}
            >
              {/* Header oscuro */}
              <div style={{
                background: '#4a5568',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0
                }}>
                  SOLICITAR VISITA
                </h2>
                <button
                  onClick={() => setVisitModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Contenido */}
              <div style={{ maxHeight: '85vh', overflowY: 'auto', padding: '30px' }}>
                <VisitForm variant="full" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

