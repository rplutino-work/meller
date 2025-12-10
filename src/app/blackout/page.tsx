'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Bloqueo total de luz (100%)',
  'Máxima privacidad',
  'Ideal para dormitorios y salas de cine',
  'Aislamiento térmico',
  'Reducción de ruido exterior',
  'Fácil mantenimiento',
]

const colors = [
  { name: 'Blanco', hex: '#ffffff' },
  { name: 'Crema', hex: '#f5f5dc' },
  { name: 'Gris Claro', hex: '#d3d3d3' },
  { name: 'Gris Oscuro', hex: '#696969' },
  { name: 'Negro', hex: '#1a1a1a' },
  { name: 'Beige', hex: '#f5f5dc' },
]

export default function BlackoutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/blackout-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-medium mb-4 uppercase tracking-wider">
              Cortinas Roller
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Black Out
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              Control total de la luz con bloqueo del 100%. Perfectas para dormitorios, 
              salas de cine y espacios que requieren oscuridad completa.
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
                Características principales
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Las cortinas Roller Black Out están diseñadas con una tela especial 
                que bloquea completamente el paso de la luz, brindando oscuridad 
                total en cualquier momento del día.
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
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/blackout-detail.jpg)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Colores disponibles
            </h2>
            <p className="text-gray-600">
              Contamos con una amplia variedad de colores para adaptarnos a tu decoración.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div 
                  className="w-full aspect-square rounded-xl mb-2 border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-sm text-gray-600">{color.name}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            * Estos son solo algunos de los colores disponibles. Consultá por más opciones.
          </p>
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
              ¿Querés ver las telas en persona?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Nuestro decorador puede visitarte sin cargo con todas las muestras 
              para que elijas la que mejor se adapte a tus espacios.
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

