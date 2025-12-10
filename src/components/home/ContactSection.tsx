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
      <section id="cotizador" className="relative">
        <div 
          className="relative min-h-[500px] bg-cover bg-center flex items-center justify-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1600&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
            <h2 className="font-serif text-[42px] lg:text-[60px] font-light italic text-black mb-10">
              ¿Ya sabés cuánto mide tu ventana?
            </h2>
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-12 py-5 bg-white border-2 border-black text-black text-[13px] uppercase tracking-[0.25em] font-normal hover:bg-black hover:text-white transition-all duration-300"
              >
                Solicitar Presupuesto
              </button>
              <button
                onClick={() => setMeasureModalOpen(true)}
                className="font-serif text-[18px] italic text-gray-600 hover:text-black transition-colors"
              >
                ¿Cómo medir?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="solicitar-visita" 
        className="relative min-h-[700px]"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 lg:px-16 py-16 lg:py-24">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center max-w-[600px]"
          >
            <p className="font-serif text-[24px] lg:text-[28px] font-light italic text-black mb-4 leading-tight">
              Dejanos tus datos para coordinar una visita con nuestro
            </p>
            <h2 className="text-[36px] lg:text-[48px] xl:text-[56px] uppercase tracking-[0.02em] font-black text-black mb-8 leading-none">
              DECORADOR SIN CARGO
            </h2>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <a href="tel:1175191273" className="flex items-center gap-3 text-[24px] lg:text-[32px] font-light hover:text-gray-500 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                11 7519 1273
              </a>
              <span className="text-black text-[32px] mx-2">·</span>
              <a href="https://wa.me/5491122729695" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[24px] lg:text-[32px] font-light hover:text-gray-500 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                11 2272 9695
              </a>
            </div>

            <div className="text-[15px] text-black leading-relaxed space-y-1">
              <p>Presidente Juan Domingo Perón 1154 - Burzaco - Buenos Aires - Argentina</p>
              <p>Horario de Atención: Lunes a Viernes de 8.00 a 12.00 hs. y de 13.30 a 17.00 hs.</p>
              <p>Visitas al Showroom con cita previa.</p>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <VisitForm variant="simple" />
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <MeasureModal isOpen={measureModalOpen} onClose={() => setMeasureModalOpen(false)} />
    </>
  )
}
