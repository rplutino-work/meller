'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PhotosModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  title?: string
}

export default function PhotosModal({ isOpen, onClose, images, title }: PhotosModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(4px)',
              zIndex: 100
            }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-20 left-4 right-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full md:max-h-[90vh] bg-black z-[110] overflow-hidden"
            style={{ borderRadius: '0' }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Header */}
            <div style={{
              background: '#000',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #333',
              minHeight: '64px',
              flexShrink: 0
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
                fontFamily: 'Oswald, sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                marginRight: '16px'
              }}>
                {title || 'Galería de Fotos'}
              </h2>
              <button
                onClick={onClose}
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

            {/* Image Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 'calc(90vh - 80px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000'
            }}>
              {/* Previous Button */}
              {images.length > 1 && (
                <button
                  onClick={goToPrevious}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src={images[currentIndex]}
                  alt={`Foto ${currentIndex + 1}`}
                  fill
                  style={{
                    objectFit: 'contain'
                  }}
                  priority
                  unoptimized
                />
              </div>

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={goToNext}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'Oswald, sans-serif'
                }}>
                  {currentIndex + 1} / {images.length}
                </div>
              )}

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  maxWidth: '90%',
                  overflowX: 'auto',
                  padding: '8px',
                  background: 'rgba(0, 0, 0, 0.5)'
                }}>
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        position: 'relative',
                        width: '60px',
                        height: '60px',
                        border: currentIndex === index ? '2px solid white' : '2px solid transparent',
                        cursor: 'pointer',
                        opacity: currentIndex === index ? 1 : 0.7,
                        transition: 'opacity 0.2s',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => {
                        if (currentIndex !== index) {
                          e.currentTarget.style.opacity = '1'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentIndex !== index) {
                          e.currentTarget.style.opacity = '0.7'
                        }
                      }}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

