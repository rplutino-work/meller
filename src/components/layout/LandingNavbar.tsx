'use client'

import { useState } from 'react'
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

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Navbar top - siempre visible */}
      <header className="sticky top-0 z-[100] bg-white" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div className="border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-[80px]">
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
          <>
            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-white overflow-auto"
              style={{ top: 0 }}
            >
              {/* Header dentro del menu */}
              <div className="border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                  <div className="flex items-center justify-between h-[80px]">
                    <Link href="/" className="flex items-center gap-5" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center">
                        <span className="border border-black px-3 py-1.5 text-[16px] font-medium tracking-[0.15em]">
                          MELE
                        </span>
                        <span className="text-[16px] font-light tracking-[0.15em] ml-1">
                          ROLLER
                        </span>
                      </div>
                      <span className="hidden md:block text-[11px] tracking-[0.2em] text-gray-400 uppercase">
                        Cortinas y Cerramientos
                      </span>
                    </Link>

                    <button
                      className="flex flex-col gap-[6px] p-2"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Cerrar menu"
                    >
                      <span className="block w-[28px] h-[2px] bg-black rotate-45 translate-y-[8px]" />
                      <span className="block w-[28px] h-[2px] bg-black opacity-0" />
                      <span className="block w-[28px] h-[2px] bg-black -rotate-45 -translate-y-[8px]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="pt-12 pb-20 px-6 lg:px-10">
                <div className="max-w-[1400px] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Cortinas */}
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                        Cortinas
                      </h3>
                      <ul className="space-y-4">
                        {navigation.map((item, index) => (
                          <motion.li
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.04 }}
                          >
                            <Link
                              href={item.href}
                              className="text-[28px] lg:text-[32px] font-serif font-light hover:text-gray-400 transition-colors leading-tight block"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Toldos */}
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                        Toldos
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          href="/toldos-cerramientos"
                          className="text-[28px] lg:text-[32px] font-serif font-light hover:text-gray-400 transition-colors leading-tight block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Toldos
                        </Link>
                      </motion.div>
                    </div>

                    {/* Acciones */}
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                        Solicitar
                      </h3>
                      <ul className="space-y-4">
                        {[
                          { name: 'Solicitar Visita', href: '/#solicitar-visita' },
                          { name: 'Cotizador', href: '/#cotizador' },
                          { name: 'Contacto', href: '/contacto' },
                        ].map((item, index) => (
                          <motion.li
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.46 + index * 0.04 }}
                          >
                            <Link
                              href={item.href}
                              className="text-[28px] lg:text-[32px] font-serif font-light hover:text-gray-400 transition-colors leading-tight block"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                        Contacto
                      </h3>
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                      >
                        <p className="text-[15px]">
                          <a href="tel:1175191273" className="hover:text-gray-400 transition-colors">
                            11 7519 1273
                          </a>
                          {' • '}
                          <a href="tel:1122729695" className="hover:text-gray-400 transition-colors">
                            11 2272 9695
                          </a>
                        </p>
                        <p>
                          <a
                            href="mailto:info@meleroller.com.ar"
                            className="text-[15px] hover:text-gray-400 transition-colors"
                          >
                            info@meleroller.com.ar
                          </a>
                        </p>
                        <div className="pt-6">
                          <p className="text-gray-400 text-[13px] leading-relaxed">
                            Presidente Juan Domingo Perón 1154<br />
                            Burzaco - Buenos Aires - Argentina
                          </p>
                          <p className="text-gray-400 text-[13px] mt-4">
                            Lunes a Viernes de 8.00 a 12.00 hs.<br />
                            y de 13.30 a 17.00 hs.
                          </p>
                          <p className="text-gray-400 text-[12px] mt-4 italic">
                            Visitas al Showroom con cita previa.
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

