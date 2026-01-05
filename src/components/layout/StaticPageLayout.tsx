'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import Header from '@/components/layout/Header'
import QuoteModal from '@/components/modals/QuoteModal'
import VisitForm from '@/components/forms/VisitForm'
import PhotosModal from '@/components/modals/PhotosModal'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface StaticPageLayoutProps {
  children: ReactNode
  titulo: string
  subtitulo: string
  heroImage: string
  categoria: string
  galleryImages?: string[] // Imágenes para la galería
}

export default function StaticPageLayout({
  children,
  titulo,
  subtitulo,
  heroImage,
  categoria,
  galleryImages = []
}: StaticPageLayoutProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [visitModalOpen, setVisitModalOpen] = useState(false)
  const [photosModalOpen, setPhotosModalOpen] = useState(false)

  return (
    <div style={{ fontFamily: 'Oswald, sans-serif' }}>
      {/* Header fixed */}
      <Header />
      {/* Hero Section con título */}
      <div style={{ position: 'relative' }}>
        {/* Botón Ver fotos */}
        {galleryImages && galleryImages.length > 0 && (
          <button
            onClick={() => setPhotosModalOpen(true)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 50,
              background: '#fff',
              border: 'none',
              color: '#666',
              fontSize: '14px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 300,
              cursor: 'pointer',
              padding: '8px 16px',
              textDecoration: 'none'
            }}
          >
            Ver fotos
          </button>
        )}
        {/* Contenedor de título y subtítulo */}
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
          {/* Title Block */}
          <div style={{
            backgroundColor: '#000',
            padding: '24px 32px',
            maxWidth: '600px'
          }}>
            <h1 style={{
              fontSize: '66px',
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
          </div>

          {/* Subtítulo */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px 32px',
            marginTop: '0',
            maxWidth: '600px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 300,
              color: '#333',
              margin: 0
            }}>
              {subtitulo}
            </h2>
          </div>
        </div>

        {/* Imagen de fondo */}
        <div style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          backgroundColor: '#e5e5e5'
        }}>
          <Image
            src={heroImage}
            alt={titulo}
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>

      {/* Botones CTA */}
      <div style={{
        display: 'flex',
        gap: '20px',
        padding: '0 60px 60px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <button
          onClick={() => setQuoteModalOpen(true)}
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 400,
            border: '2px solid #000',
            transition: 'all 0.3s',
            cursor: 'pointer'
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
            padding: '16px 32px',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 400,
            border: '2px solid #000',
            transition: 'all 0.3s',
            cursor: 'pointer'
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

      {/* Modals */}
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full bg-white shadow-2xl z-50 overflow-hidden"
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

      {/* Modal de fotos */}
      {galleryImages && galleryImages.length > 0 && (
        <PhotosModal
          isOpen={photosModalOpen}
          onClose={() => setPhotosModalOpen(false)}
          images={galleryImages}
          title={`${categoria} ${titulo}`}
        />
      )}
    </div>
  )
}

