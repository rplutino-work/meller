'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Black Out', href: '/blackout' },
  { name: 'SunScreen', href: '/sunscreen' },
  { name: 'Romanas', href: '/romanas' },
  { name: 'Orientales', href: '/orientales' },
  { name: 'Tradicionales', href: '/tradicionales' },
  { name: 'Eclipse', href: '/eclipse' },
  { name: 'Bandas Verticales', href: '/bandas-verticales' },
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
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-[65px]">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="border-2 border-white px-2.5 py-0.5 text-[14px] font-medium tracking-wider text-white">
                  MELE
                </span>
                <span className="text-[14px] font-light tracking-wider ml-0.5 text-white">
                  ROLLER
                </span>
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
