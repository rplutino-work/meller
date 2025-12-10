'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const products = [
  {
    id: 1,
    prefix: 'ROLLER',
    name: 'BLACKOUT',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    href: '/blackout',
  },
  {
    id: 2,
    prefix: 'ROLLER',
    name: 'SUNSCREEN',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    href: '/sunscreen',
  },
  {
    id: 3,
    prefix: '',
    name: 'ECLIPSE',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
    href: '/eclipse',
  },
  {
    id: 4,
    prefix: 'PANELES',
    name: 'ORIENTALES',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    href: '/orientales',
  },
  {
    id: 5,
    prefix: '',
    name: 'ROMANAS',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    href: '/romanas',
  },
  {
    id: 6,
    prefix: '',
    name: 'TRADICIONALES',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    href: '/tradicionales',
  },
]

export default function ProductCards() {
  return (
    <section className="bg-white">
      {/* Title - with black borders top and bottom */}
      <div className="border-t border-b border-black py-10 lg:py-14 px-6 lg:px-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[48px] md:text-[64px] lg:text-[80px] xl:text-[90px] font-light italic uppercase tracking-[-0.02em] text-black text-center leading-[0.95]"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          SOMOS ESPECIALISTAS EN CORTINAS
        </motion.h3>
      </div>

      {/* Products Grid - 2 rows of 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={product.href} className="relative block aspect-[4/3] overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Text - aligned to bottom left */}
              <div className="absolute bottom-6 left-6 text-white text-left">
                {product.prefix && (
                  <span className="block text-[16px] md:text-[18px] lg:text-[20px] font-light tracking-[0.15em]">
                    {product.prefix}
                  </span>
                )}
                <h3 
                  className="text-[24px] md:text-[28px] lg:text-[32px] font-bold tracking-[0.05em]" 
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {product.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
