'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import VisitForm from '@/components/forms/VisitForm'
import QuoteModal from '@/components/modals/QuoteModal'
import MeasureModal from '@/components/modals/MeasureModal'

export default function ContactSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [measureModalOpen, setMeasureModalOpen] = useState(false)

  return (
    <>
      {/* Cotizador Section */}
      <section id="cotizador" className="solicitar-presupuesto" style={{
        paddingTop: '5.5em',
        paddingBottom: '5.5em',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'relative',
        width: '100%'
      }}>
        {/* Background image with fixed attachment */}
        <div style={{
          content: '""',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/images/bg-medir-ventana.jpg) center center no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          position: 'absolute',
          zIndex: -1
        }} />
        <div style={{
          maxWidth: 'none',
          margin: '0 auto',
          padding: '0 15px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '877.5px',
              margin: '0 auto',
              padding: '0 15px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '52px',
                fontWeight: 300,
                fontFamily: 'Oswald, sans-serif',
                color: '#000',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: '1.2'
              }}>
                ¿Ya sabés cuánto mide tu ventana?
              </h3>
              <br />
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  style={{
                    fontSize: '20px',
                    fontWeight: 400,
                    padding: '30px 16px',
                    border: '4.67px solid #000',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontFamily: 'Oswald, sans-serif',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'inline-block',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  SOLICITAR PRESUPUESTO
                </button>
              </div>
              <br />
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setMeasureModalOpen(true)}
                  style={{
                    fontSize: '20px',
                    fontWeight: 400,
                    padding: '10px 16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#000',
                    fontFamily: 'Oswald, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.3s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  ¿Cómo medir?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="solicitar-visita" 
        className="form"
        style={{
          padding: '120px 0',
          margin: 0,
          backgroundImage: 'url(/images/versatilidad-img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 0%',
          position: 'relative'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1170px',
          padding: '0 15px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
        className="container"
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 -15px',
            padding: 0,
            width: '100%',
            boxSizing: 'border-box'
          }}
          className="row"
          >
            {/* Left Column - Info */}
            <div style={{
              flex: '0 0 50%',
              maxWidth: '50%',
              padding: '0 15px',
              margin: 0,
              boxSizing: 'border-box'
            }}
            className="col-md-6"
            >
              <h2 style={{
                fontSize: '28px',
                fontWeight: 200,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '22px 0 11px',
                lineHeight: '1.2'
              }}>
                Dejanos tus datos para coordinar una visita con nuestro
              </h2>
              <h3 style={{
                fontSize: '52px',
                fontWeight: 400,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '22px 0 11px',
                lineHeight: '1.2',
                textTransform: 'none'
              }}>
                DECORADOR SIN CARGO
              </h3>
              
              {/* Phone numbers */}
              <p style={{
                fontSize: '36px',
                fontWeight: 200,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '0 0 11px',
                lineHeight: '1.2'
              }}>
                <a 
                  href="tel:+541175191273" 
                  style={{
                    fontSize: '36px',
                    fontWeight: 400,
                    color: '#000',
                    fontFamily: 'Oswald, sans-serif',
                    textDecoration: 'none'
                  }}
                >
                  <img 
                    src="/images/phone-ico.png" 
                    alt="Teléfono" 
                    width={30} 
                    height={30}
                    style={{ marginBottom: '7px', verticalAlign: 'middle', marginRight: '5px', display: 'inline-block' }}
                  />
                  11 7519 1273
                </a>
                {' • '}
                <a 
                  href="https://wa.me/541122729695?text=¡Hola!" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '36px',
                    fontWeight: 400,
                    color: '#000',
                    fontFamily: 'Oswald, sans-serif',
                    textDecoration: 'none'
                  }}
                >
                  <img 
                    src="/images/whatsapp-ico.png" 
                    alt="WhatsApp" 
                    width={30} 
                    height={30}
                    style={{ marginBottom: '7px', verticalAlign: 'middle', marginRight: '5px', display: 'inline-block' }}
                  />
                  11 2272 9695
                </a>
              </p>
              
              {/* Address and hours */}
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '0 0 11px',
                lineHeight: '1.6'
              }}>
                Presidente Juan Domingo Perón 1154 - Burzaco - Buenos Aires - Argentina
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '0 0 11px',
                lineHeight: '1.6'
              }}>
                Horario de Atención: Lunes a Viernes de 8.00 a 12.00 hs. y de 13.30 a 17.00 hs.
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '0 0 11px',
                lineHeight: '1.6'
              }}>
                Visitas al Showroom con cita previa.
              </p>
              
              {/* Email */}
              <p style={{
                fontSize: '28px',
                fontWeight: 400,
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                margin: '0 0 11px',
                lineHeight: '1.6'
              }}>
                <a 
                  href="mailto:info@meleroller.com.ar" 
                  style={{
                    fontSize: '28px',
                    fontWeight: 400,
                    color: '#000',
                    fontFamily: 'Oswald, sans-serif',
                    textDecoration: 'none'
                  }}
                >
                  info@meleroller.com.ar
                </a>
              </p>
              
              {/* Social Media Links */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '20px 0 0',
                display: 'flex',
                gap: '10px'
              }}
              className="list-inline"
              >
                <li>
                  <a 
                    href="https://www.facebook.com/cortinasmeleroller" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block' }}
                  >
                    <div className="facebook" style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff'
                    }}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.9 17.01" enableBackground="new 0 0 7.9 17.01" xmlSpace="preserve" style={{ width: '12px', height: '24px', fill: '#000' }}>
                        <path d="M7.9,5.51H5.21V3.74c0-0.66,0.44-0.82,0.75-0.82c0.31,0,1.9,0,1.9,0V0.01L5.24,0c-2.9,0-3.56,2.17-3.56,3.57v1.94H0v3h1.68c0,3.85,0,8.5,0,8.5h3.53c0,0,0-4.69,0-8.5h2.38L7.9,5.51L7.9,5.51z"/>
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/_meleroller" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block' }}
                  >
                    <div className="instagram" style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff'
                    }}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16.88px" height="17.01px" viewBox="0 0 16.88 17.01" enableBackground="new 0 0 16.88 17.01" xmlSpace="preserve" style={{ width: '20px', height: '20px', fill: '#000' }}>
                        <path d="M13.26,0H3.62C1.63,0,0,1.59,0,3.54v9.93c0,1.95,1.63,3.54,3.62,3.54h9.64c2,0,3.62-1.59,3.62-3.54V3.54C16.88,1.59,15.26,0,13.26,0z M15.43,13.47c0,1.15-0.97,2.08-2.16,2.08H3.62c-1.19,0-2.16-0.93-2.16-2.08V3.54c0-1.15,0.97-2.08,2.16-2.08h9.64c1.19,0,2.16,0.93,2.16,2.08V13.47z M8.44,4.09c-2.43,0-4.41,1.98-4.41,4.41c0,2.43,1.98,4.41,4.41,4.41c2.43,0,4.41-1.98,4.41-4.41C12.86,6.07,10.88,4.09,8.44,4.09z M8.44,11.46c-1.63,0-2.96-1.33-2.96-2.96c0-1.63,1.33-2.96,2.96-2.96c1.63,0,2.96,1.33,2.96,2.96C11.4,10.13,10.07,11.46,8.44,11.46z M13.18,2.83c-0.57,0-1.03,0.46-1.03,1.03c0,0.57,0.46,1.03,1.03,1.03c0.57,0,1.03-0.46,1.03-1.03C14.21,3.3,13.75,2.83,13.18,2.83z"/>
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Right Column - Form */}
            <div style={{
              flex: '0 0 41.666667%',
              maxWidth: '41.666667%',
              padding: '0 15px',
              marginLeft: '8.333333%',
              boxSizing: 'border-box'
            }}
            className="col-md-5 col-md-offset-1"
            >
              <VisitForm variant="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <MeasureModal isOpen={measureModalOpen} onClose={() => setMeasureModalOpen(false)} />
    </>
  )
}
