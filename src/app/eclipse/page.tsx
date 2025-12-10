'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight, Sun, Moon } from 'lucide-react'

const features = [
  'Sistema doble tela (día y noche)',
  'Control gradual de luz y privacidad',
  'Efecto de franjas alternadas',
  'Diseño moderno y funcional',
  'Accionamiento a cadena o motorizado',
  'Variedad de colores y texturas',
]

export default function EclipsePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/eclipse-hero.jpg)' }}
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
              Eclipse
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              El sistema más versátil. Dos telas en una que permiten 
              controlar la luz de forma gradual, desde total apertura hasta oscuridad completa.
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

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Las cortinas Eclipse tienen franjas alternadas de tela opaca y traslúcida. 
              Al mover la cortina, las franjas se alinean de diferentes formas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-light rounded-2xl"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Modo Día</h3>
              <p className="text-gray-600">
                Franjas traslúcidas alineadas permiten el máximo paso de luz natural.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-light rounded-2xl"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="flex">
                  <Sun className="w-6 h-6 text-secondary" />
                  <Moon className="w-6 h-6 text-secondary -ml-2" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Modo Intermedio</h3>
              <p className="text-gray-600">
                Control gradual de la luz y privacidad según tus necesidades.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-light rounded-2xl"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Moon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Modo Noche</h3>
              <p className="text-gray-600">
                Franjas opacas alineadas bloquean la luz para máxima privacidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-500 order-2 lg:order-1"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/eclipse-detail.jpg)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Características
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                El sistema Eclipse es ideal para quienes buscan versatilidad 
                y un diseño contemporáneo que se adapta a cualquier decoración.
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
              La versatilidad que necesitás
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Descubrí todas las posibilidades del sistema Eclipse 
              con una visita de nuestro decorador.
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

