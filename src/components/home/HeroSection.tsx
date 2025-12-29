'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderNav from './HeaderNav'

interface Feature {
  title: string
  desc: string
}

interface Project {
  id: string | number
  title: string
  subtitle: string
  image: string
  features: Feature[]
  location?: string
  category?: string
}

// Datos por defecto si no hay banners en la BD
const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'BMW',
    subtitle: 'Persianas y cortinas para las nuevas instalaciones de la marca en Argentina',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    features: [
      { title: 'Control total de luz', desc: 'para mayor productividad y enfoque.' },
      { title: 'Elegancia y funcionalidad', desc: 'en cada espacio de trabajo.' },
      { title: 'Privacidad ajustable', desc: 'sin perder luminosidad natural.' },
    ],
    location: 'Oficinas BMW en Argentina',
    category: 'Muy utilizadas en oficinas, hoteles y negocios.',
  },
  {
    id: 2,
    title: 'Embajada',
    subtitle: 'de Bélgica en Argentina con cortinados tradicionales a medida.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    features: [
      { title: 'Luz suave y privacidad ajustable', desc: 'en cada ambiente.' },
      { title: 'Contraste de texturas', desc: 'que aporta elegancia y formalidad.' },
      { title: 'Personalización para reflejar la identidad', desc: 'cultural del espacio.' },
    ],
    location: 'Embajada de Bélgica en Argentina',
    category: 'Muy utilizadas para decorar ambientes y oficinas.',
  },
  {
    id: 3,
    title: 'Fontenla',
    subtitle: 'Oficinas y locales de la marca en roller sunscreen.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    features: [
      { title: 'Control de luz sin perder conexión', desc: 'con el exterior.' },
      { title: 'Diseño moderno y funcional', desc: 'para ambientes profesionales.' },
      { title: 'Protege de los rayos UV', desc: 'sin oscurecer el espacio.' },
    ],
    location: 'Fontenla',
    category: 'Conocé toda nuestra variedad.',
  },
  {
    id: 4,
    title: 'Depto. Boom',
    subtitle: 'Diseño e instalación de sistemas a medida para cada ambiente.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    features: [
      { title: 'Un toque de estilo', desc: 'que realza los ambientes.' },
      { title: 'Sistemas de accionamiento', desc: 'manual y automático.' },
      { title: 'Bandas verticales', desc: 'para control de la luz.' },
    ],
    location: 'Dpto. Boom PLLI Castelar',
    category: 'Ideales para cocinas, livings y dormitorios.',
  },
  {
    id: 5,
    title: 'Casa Nordelta',
    subtitle: 'En conjunto con el estudio de arquitectura Vanguarda, diseñamos e instalamos cortinados para personalizar cada ambiente.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    features: [
      { title: 'Elegancia que', desc: 'aporta decoración.' },
      { title: 'Control gradual de', desc: 'paso de luz solar.' },
      { title: 'Simplicidad de uso', desc: 'como divisor de espacio.' },
    ],
    location: 'Casa en Nordelta',
    category: 'Ideal para restaurantes, hoteles y centros de estética.',
  },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [loading, setLoading] = useState(true)

  // Cargar banners desde la API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners')
        const data = await res.json()
        
        if (data && data.length > 0) {
          // Mapear los datos de la API al formato esperado
          const mappedProjects = data.map((banner: {
            id: string
            titulo: string
            subtitulo: string
            imagen: string
            features: Feature[]
            ubicacion?: string
            categoria?: string
          }) => ({
            id: banner.id,
            title: banner.titulo,
            subtitle: banner.subtitulo,
            image: banner.imagen,
            features: Array.isArray(banner.features) ? banner.features : [],
            location: banner.ubicacion,
            category: banner.categoria,
          }))
          setProjects(mappedProjects)
        } else {
          // Si no hay banners en la BD, usar los por defecto
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.error('Error fetching banners:', error)
        // Mantener los datos por defecto si hay error
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [projects.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-400">Cargando...</div>
      </section>
    )
  }

  return (
    <section className="relative">
      {/* Navegación sticky que aparece al scrollear - full width */}
      <HeaderNav />

      <div className="flex min-h-screen">
        {/* Left side - Content (50%) */}
        <div className="w-full lg:w-1/2 bg-white relative flex flex-col">
          {/* Header interno - NO sticky */}
          <div className="bg-white" style={{ padding: '0px 3rem 0 2.3rem', border: 'none' }}>
            <div className="flex items-center justify-between h-[78px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4">
                  <div className="relative" style={{ height: '40px', minWidth: '120px' }}>
                    <Image
                      src="/images/logos/logo-horizontal.png"
                      alt="MELE ROLLER"
                      width={500}
                      height={78}
                      style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left center' }}
                      priority
                      unoptimized
                    />
                  </div>
                  <span className="hidden lg:block text-[12px] font-light tracking-wide text-black uppercase leading-tight">
                    Cortinas y Cerramientos
                  </span>
                </Link>

                {/* Menu hamburguesa */}
                <MenuButton />
              </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1" style={{ padding: '0 3rem', paddingBottom: '2.5rem', justifyContent: 'space-around' }}>
            <div className="pt-6">
              {/* Slide counter */}
              <div className="flex items-center gap-4 text-[14px] font-light mb-8">
                <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                <div className="w-[90px] h-[1px] bg-black" />
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>

              {/* FOTOS button */}
              <button className="mb-8 text-[11px] uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors font-light">
                FOTOS
              </button>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-[80px] lg:text-[100px] xl:text-[120px] font-light leading-[0.85] mb-6 tracking-normal text-black">
                    {currentProject.title === 'Depto. Boom' ? (
                      <>Depto.Boom</>
                    ) : currentProject.title}
                  </h2>
<p className="text-[15px] font-light text-gray-600 max-w-[440px] leading-[1.65]" style={{ marginTop: '40px' }}>
                      {currentProject.subtitle}
                    </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-3" style={{ paddingBottom: '80px' }}>
              <button
                onClick={prevSlide}
                className="w-[52px] h-[52px] rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronUp size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={nextSlide}
                className="w-[52px] h-[52px] rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Next"
              >
                <ChevronDown size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Image + CTA section (50%) */}
        <div className="hidden lg:flex lg:flex-col w-1/2">
          {/* Image area - ocupa la mayor parte */}
          <div className="relative flex-1" style={{ minHeight: '75%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${currentProject.image})`,
                    backgroundColor: '#e5e5e5'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Feature box - mitad sobre la imagen, mitad fuera */}
            <motion.div
              key={`feature-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bg-black text-white z-20"
              style={{ left: '-100px', bottom: '-120px', padding: '45px 55px', maxWidth: '480px' }}
            >
              <ul className="space-y-6">
                {currentProject.features.map((feature, index) => (
                  <li key={index} className="leading-[1.6]">
                    <span className="text-[18px] font-normal">{feature.title}</span>
                    <br />
                    <span className="text-[18px] font-light text-gray-400">{feature.desc}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/productos"
                className="inline-block mt-8 text-[13px] uppercase tracking-[0.3em] font-bold hover:opacity-70 transition-opacity"
              >
                Más Info
              </Link>
            </motion.div>
          </div>

          {/* CTA section - área blanca debajo de la imagen */}
          <div className="bg-white flex items-center justify-end" style={{ padding: '35px 50px' }}>
            <div className="text-right">
              <Link href="/#solicitar-visita" className="group block">
                <span className="block text-[15px] font-bold text-black mb-2">
                  Solicitar visita
                </span>
                <span className="block text-[48px] font-light uppercase tracking-[0.02em] text-black leading-[0.9]">
                  SIN CARGO
                </span>
              </Link>
            </div>
            <div className="ml-10">
              <Link href="/#solicitar-visita" className="w-[75px] h-[75px] rounded-full border-2 border-black flex items-center justify-center bg-transparent cursor-pointer hover:bg-black hover:text-white transition-colors group">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:text-white transition-colors">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5491175191273?text=Hola, quiero más información sobre cortinas"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">Chatea con nosotros</span>
      </a>
    </section>
  )
}

// Componente del botón de menú separado para manejar su estado
function MenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      // Guardar el scroll actual
      const scrollY = window.scrollY
      // Prevenir scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      // Cleanup: restaurar scroll al desmontar
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <button
        className="flex flex-col gap-[5px] p-2 relative z-[60]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
      >
        {/* Líneas del hamburguesa con diferentes longitudes */}
        <span className={`block h-[1.5px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'w-[28px] rotate-45 translate-y-[8px]' : 'w-[20px]'}`} />
        <span className={`block h-[1.5px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'w-[24px]'}`} />
        <span className={`block h-[1.5px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'w-[28px] -rotate-45 -translate-y-[8px]' : 'w-[28px]'}`} />
      </button>

      {/* Full screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bg-black overflow-auto"
            style={{ 
              zIndex: 1030, 
              top: '45px',
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            {/* Contacto - top right */}
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '80px',
              textAlign: 'right',
              zIndex: 10
            }}>
              <a 
                href="https://wa.me/541122729695" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 300,
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '12px',
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                11 2272 9695
              </a>
              <a 
                href="mailto:info@meleroller.com.ar" 
                style={{
                  fontSize: '16px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 300,
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '20px',
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                info@meleroller.com.ar
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
                <a 
                  href="https://www.facebook.com/meleroller" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '0.67px solid rgb(128, 128, 128)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Facebook"
                >
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>f</span>
                </a>
                <a 
                  href="https://www.instagram.com/meleroller" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '0.67px solid rgb(128, 128, 128)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#fff' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* X button - arriba a la derecha, cerca del contacto */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menu"
              style={{
                position: 'absolute',
                top: '60px',
                right: '60%',
                color: '#fff',
                fontSize: '48px',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 300,
                lineHeight: '1',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                zIndex: 20
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              ×
            </button>

            {/* Menu items - alineados a la izquierda */}
            <div className="flex flex-col items-start justify-start" style={{ position: 'absolute', top: '105px', right: '60%', paddingBottom: '40px' }}>
              <div style={{ width: '100%', maxWidth: '600px' }}>
                {/* Cortinas */}
                <div style={{ marginBottom: '35px' }}>
                  <h3 style={{
                    fontSize: '52px',
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 300,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 25px 0',
                    textAlign: 'right'
                  }}>
                    CORTINAS
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'right' }}>
                    {['BlackOut', 'SunScreen', 'Romanas', 'Orientales', 'Tradicionales', 'Eclipse', 'Bandas Verticales'].map((item, index) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        style={{ marginBottom: '12px' }}
                      >
                        <Link
                          href={`/${item.toLowerCase().replace(' ', '-')}`}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            fontSize: '22px',
                            fontFamily: 'Oswald, sans-serif',
                            fontWeight: 300,
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'block',
                            transition: 'opacity 0.3s',
                            textAlign: 'right'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Toldos */}
                <div>
                  <h3 style={{
                    fontSize: '52px',
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 300,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 25px 0',
                    textAlign: 'right'
                  }}>
                    TOLDOS
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'right' }}>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      style={{ marginBottom: '12px' }}
                    >
                      <Link
                        href="/toldos"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          fontSize: '22px',
                          fontFamily: 'Oswald, sans-serif',
                          fontWeight: 300,
                          color: '#fff',
                          textDecoration: 'none',
                          display: 'block',
                          transition: 'opacity 0.3s',
                          textAlign: 'right'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        Toldos
                      </Link>
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
