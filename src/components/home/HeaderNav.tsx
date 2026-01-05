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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg"
        >
          <div style={{ padding: '0px 3rem 0 2.3rem' }}>
            <div className="flex items-center justify-between h-[65px]">
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
              <button className="lg:hidden flex flex-col gap-[5px] p-2">
                <span className="block w-[24px] h-[2px] bg-white" />
                <span className="block w-[24px] h-[2px] bg-white" />
                <span className="block w-[24px] h-[2px] bg-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
