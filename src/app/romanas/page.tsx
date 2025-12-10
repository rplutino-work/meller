'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Pliegues horizontales elegantes',
  'Disponibles en telas opacas y traslúcidas',
  'Ideales para cualquier estilo decorativo',
  'Sistema de accionamiento manual o motorizado',
  'Variedad de texturas y colores',
  'Confección a medida',
]

export default function RomanasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-stone-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/romanas-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-medium mb-4 uppercase tracking-wider">
              Cortinas
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Romanas
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              Elegancia clásica con pliegues horizontales que aportan calidez 
              y sofisticación a cualquier ambiente.
            </p>
            <Link
              href="/#solicitar-visita"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors"
            >
              Solicitar visita sin cargo
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Estilo atemporal
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Las cortinas romanas combinan la funcionalidad de un estor con 
                la elegancia de una cortina tradicional. Sus pliegues horizontales 
                crean un efecto visual único cuando están recogidas.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-secondary" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-700 to-stone-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/romanas-detail.jpg)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Dale un toque de elegancia a tus espacios
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Coordiná una visita con nuestro decorador y descubrí 
              todas las opciones de telas y colores disponibles.
            </p>
            <Link
              href="/#solicitar-visita"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors"
            >
              Solicitar visita sin cargo
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

