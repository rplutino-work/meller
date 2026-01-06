'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface MeasureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MeasureModal({ isOpen, onClose }: MeasureModalProps) {
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-20 left-4 right-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full bg-white shadow-2xl z-[110] overflow-hidden"
            style={{ borderRadius: '0' }}
          >
            {/* Header oscuro */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Oswald, sans-serif'
              }}>
                CÓMO MEDIR TUS VENTANAS
              </h3>
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{
              padding: '30px',
              fontFamily: 'Oswald, sans-serif'
            }}>
              {/* Texto de instrucciones */}
              <p style={{
                color: '#000',
                fontSize: '18px',
                lineHeight: '1.6',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Medir el ancho de la ventana teniendo en cuenta los marcos de la misma, a esta medida es conveniente que exceda 10 cm de cada lado. En el alto lo mismo, agregar 10 cm de cada lado.
              </p>

              {/* Imágenes lado a lado */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: '41.66667%',
                  marginLeft: '8.33333%',
                  marginRight: '0',
                  padding: '0 15px'
                }}>
                  <Image
                    src="/images/medir-1.png"
                    alt="Diagrama de medida de ancho"
                    width={344}
                    height={301}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                </div>
                <div style={{
                  width: '41.66667%',
                  marginLeft: '0',
                  marginRight: '0',
                  padding: '0 15px'
                }}>
                  <Image
                    src="/images/medir-2.png"
                    alt="Diagrama de medida de alto"
                    width={344}
                    height={301}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                </div>
              </div>

              {/* Fórmula */}
              <div style={{
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <span style={{
                  background: 'black',
                  color: 'white',
                  padding: '8px 16px',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  fontFamily: 'Oswald, sans-serif'
                }}>
                  ANCHO TOTAL EN CM = x+20
                </span>
              </div>

              {/* Información de contacto */}
              <div style={{
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#000',
                  marginBottom: '8px',
                  lineHeight: '1.6',
                  fontWeight: 300
                }}>
                  Para asesoramiento técnico visitenos en:<br />
                  Pres. Juan D. Perón 1154, Burzaco.
                </p>
              </div>

              {/* WhatsApp */}
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 300,
                  margin: 0,
                  color: '#000'
                }}>
                  <a
                    href="https://wa.me/5491122729695?text=Hola!"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <Image
                      src="/images/whatsapp-ico.png"
                      alt="WhatsApp"
                      width={30}
                      height={30}
                      style={{
                        marginBottom: '7px',
                        verticalAlign: 'middle'
                      }}
                    />
                    <span>11 2272 9695</span>
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
