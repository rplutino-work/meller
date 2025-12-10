'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight, Sun } from 'lucide-react'

const features = [
  'Filtrado de rayos UV hasta 95%',
  'Mantiene la visibilidad hacia el exterior',
  'Control de temperatura interior',
  'Reduce el deslumbramiento',
  'Ideal para oficinas y livings',
  'Diferentes grados de apertura',
]

const apertures = [
  { name: '1%', description: 'Máxima privacidad', privacy: 95 },
  { name: '3%', description: 'Alta privacidad', privacy: 85 },
  { name: '5%', description: 'Privacidad moderada', privacy: 70 },
  { name: '10%', description: 'Mayor visibilidad', privacy: 50 },
]

export default function SunscreenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-amber-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/sunscreen-hero.jpg)' }}
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
              Sun Screen
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              Filtra la luz solar sin perder la conexión con el exterior. 
              Protección UV y control de temperatura con diseño moderno.
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
                Protección solar inteligente
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Las cortinas Sun Screen están fabricadas con una tela micro perforada 
                que permite el paso controlado de la luz, reduciendo el calor y 
                protegiendo tus muebles de los rayos UV.
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
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-700 to-amber-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/sunscreen-detail.jpg)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aperture Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Grados de apertura
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elegí el nivel de privacidad y paso de luz que mejor se adapte a tus necesidades.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {apertures.map((aperture, index) => (
              <motion.div
                key={aperture.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{aperture.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{aperture.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${aperture.privacy}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Privacidad: {aperture.privacy}%</p>
              </motion.div>
            ))}
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
              Protegé tus ambientes del sol
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Solicitá una visita sin cargo y nuestro decorador te mostrará 
              todas las opciones de Sun Screen disponibles.
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

