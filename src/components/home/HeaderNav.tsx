'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Blackout', href: '/cortinas/blackout' },
  { name: 'SunScreen', href: '/cortinas/sunscreen' },
  { name: 'Romanas', href: '/cortinas/romanas' },
  { name: 'Orientales', href: '/cortinas/orientales' },
  { name: 'Tradicionales', href: '/cortinas/tradicionales' },
  { name: 'Eclipse', href: '/cortinas/eclipse' },
  { name: 'Bandas Verticales', href: '/cortinas/bandas-verticales' },
]

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
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
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Header scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="scrolled-header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[60] bg-black shadow-lg scrolled-header-mobile"
            style={{ 
              backgroundColor: '#000', 
              opacity: 1, 
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              margin: 0,
              padding: 0
            }}
          >
            <div className="header-nav-container">
              <div className="flex items-center justify-between h-[78px]">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <div className="relative" style={{ height: '40px', minWidth: '120px' }}>
                    <Image
                      src="/images/logos/logo-horizontal.png"
                      alt="MELE ROLLER"
                      width={500}
                      height={78}
                      style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }}
                      priority
                      unoptimized
                    />
                  </div>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-7">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-[13px] font-light text-white hover:text-gray-300 transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Menu button for mobile when scrolled */}
                <button 
                  className="lg:hidden flex flex-col gap-[5px] p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Menu"
                >
                  <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-[24px] rotate-45 translate-y-[8px]' : 'w-[24px]'}`} />
                  <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'w-[24px]'}`} />
                  <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-[24px] -rotate-45 -translate-y-[8px]' : 'w-[24px]'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full screen menu for mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[65] bg-black mobile-menu-overlay lg:hidden"
            style={{ 
              top: 0,
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100%',
              height: '100vh',
              margin: 0,
              padding: 0
            }}
          >
            {/* Header dentro del menú móvil */}
            <div className="header-nav-container bg-black" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between h-[78px]">
                {/* Logo */}
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative" style={{ height: '40px', minWidth: '120px' }}>
                    <Image
                      src="/images/logos/logo-horizontal.png"
                      alt="MELE ROLLER"
                      width={500}
                      height={78}
                      style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left center', filter: 'brightness(0) invert(1)' }}
                      priority
                      unoptimized
                    />
                  </div>
                </Link>

                {/* Close button */}
                <button 
                  className="flex flex-col gap-[5px] p-2"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menu"
                >
                  <span className="block h-[2px] w-[24px] bg-white rotate-45 translate-y-[8px]" />
                  <span className="block h-[2px] w-[24px] bg-white opacity-0" />
                  <span className="block h-[2px] w-[24px] bg-white -rotate-45 -translate-y-[8px]" />
                </button>
              </div>
            </div>

            {/* Menu items */}
            <div className="header-nav-container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
              <div style={{ width: '100%' }}>
                {/* Cortinas */}
                <div style={{ marginBottom: '35px' }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 300,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 20px 0',
                    textAlign: 'left'
                  }}>
                    CORTINAS
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                    {navigation.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        style={{ marginBottom: '10px' }}
                      >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Oswald, sans-serif',
                            fontWeight: 300,
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'block',
                            transition: 'opacity 0.3s',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {item.name}
                  </Link>
                      </motion.li>
                ))}
                  </ul>
                </div>

                {/* Toldos */}
                <div>
                  <h3 style={{
                    fontSize: '28px',
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 300,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 20px 0',
                    textAlign: 'left'
                  }}>
                    TOLDOS
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      style={{ marginBottom: '10px' }}
                    >
                      <Link
                        href="/toldos-cerramientos"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          fontSize: '18px',
                          fontFamily: 'Oswald, sans-serif',
                          fontWeight: 300,
                          color: '#fff',
                          textDecoration: 'none',
                          display: 'block',
                          transition: 'opacity 0.3s',
                          textAlign: 'left'
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
