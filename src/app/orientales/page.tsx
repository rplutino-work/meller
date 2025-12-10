'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Diseño minimalista y moderno',
  'Ideales para grandes ventanales',
  'Funcionan como divisores de ambientes',
  'Sistema de paneles deslizantes',
  'Amplia variedad de telas y colores',
  'Accionamiento manual o motorizado',
]

export default function OrientalesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-neutral-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/orientales-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-medium mb-4 uppercase tracking-wider">
              Paneles
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Orientales
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              Elegancia minimalista para grandes ventanales. Perfectos como 
              cortinas o divisores de ambientes con un estilo contemporáneo.
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
                Versatilidad oriental
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Los paneles orientales son la solución perfecta para ventanales 
                de gran tamaño y puertas corredizas. Su diseño de paneles 
                deslizantes permite un control preciso de la luz y la privacidad.
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
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/orientales-detail.jpg)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Usos ideales
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ventanales',
                description: 'Perfectos para cubrir grandes superficies acristaladas con elegancia.',
              },
              {
                title: 'Divisores',
                description: 'Separá ambientes de forma elegante y funcional.',
              },
              {
                title: 'Puertas corredizas',
                description: 'Ideales para salidas a balcones y jardines.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
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
              Transformá tus espacios
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Los paneles orientales son ideales para restaurantes, hoteles 
              y centros de estética. Solicitá una visita sin cargo.
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

