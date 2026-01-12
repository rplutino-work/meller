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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Header principal - siempre visible */}
      <header className="sticky top-0 z-50 bg-white">
        {/* Navegación que aparece al scrollear */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-100 overflow-hidden"
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <nav className="hidden lg:flex items-center justify-center gap-8 py-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-[13px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header con logo y hamburguesa */}
        <div className={`border-b border-gray-100 transition-all duration-300 ${isScrolled ? '' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-[78px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-5">
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
                <span className="hidden md:block text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                  Cortinas y Cerramientos
                </span>
              </Link>

              {/* Menu hamburguesa */}
              <button
                className="flex flex-col gap-[6px] p-2 group relative z-[60]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <span className={`block w-[28px] h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                <span className={`block w-[28px] h-[2px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block w-[28px] h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black"
              style={{ top: 0, overflow: 'hidden' }}
            >
              {/* Header dentro del menu */}
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
