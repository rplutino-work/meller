'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Variedad de telas livianas y texturadas',
  'Sistemas a riel o barral',
  'Opciones blackout y traslúcidas',
  'Confección a medida',
  'Amplia paleta de colores',
  'Estilo clásico y elegante',
]

const types = [
  {
    name: 'Livianas Traslúcidas a Riel',
    description: 'Telas suaves que filtran la luz de forma delicada.',
  },
  {
    name: 'Blackout Texturadas a Riel',
    description: 'Bloqueo total de luz con acabado texturizado.',
  },
  {
    name: 'Livianas Traslúcidas a Barral',
    description: 'Elegancia clásica con caída natural.',
  },
  {
    name: 'Blackout Texturadas a Barral',
    description: 'Máxima privacidad con estilo tradicional.',
  },
]

export default function TradicionalesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-zinc-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/tradicionales-hero.jpg)' }}
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
              Tradicionales
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              El encanto de lo clásico con la calidad de siempre. 
              Cortinas de tela con sistemas a riel o barral para cada estilo.
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
                Elegancia clásica
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Las cortinas tradicionales nunca pasan de moda. Ofrecemos una 
                amplia variedad de telas, desde las más livianas y traslúcidas 
                hasta las más pesadas con bloqueo de luz.
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
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/tradicionales-detail.jpg)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Tipos disponibles
            </h2>
            <p className="text-gray-600">
              Encontrá la combinación perfecta para tu espacio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary mb-2">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
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
              Lo clásico nunca falla
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Nuestro decorador puede mostrarte todas las opciones de telas 
              y sistemas en la comodidad de tu hogar.
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

