'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sofa, Armchair, Wrench } from 'lucide-react'

const categories = [
  {
    id: 'tradicionales',
    name: 'Sillones Tradicionales',
    description: 'Diseños clásicos con tapizados de calidad premium.',
    icon: Sofa,
  },
  {
    id: 'puff',
    name: 'Puff Movibles',
    description: 'Comodidad y versatilidad para cualquier espacio.',
    icon: Armchair,
  },
  {
    id: 'restauracion',
    name: 'Restauración',
    description: 'Devolvemos la vida a tus muebles favoritos.',
    icon: Wrench,
  },
]

export default function SillonesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-violet-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/images/products/sillones-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-medium mb-4 uppercase tracking-wider">
              Tapicería
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Sillones
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Confort y estilo para tu hogar. Sillones nuevos y servicio de restauración.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nuestros servicios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fabricamos sillones a medida y restauramos tus muebles favoritos 
              con materiales de primera calidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-light rounded-2xl p-8 text-center hover:shadow-lg transition-shadow scroll-mt-24"
              >
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <category.icon className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Link
                  href="/#solicitar-visita"
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent font-medium transition-colors"
                >
                  Consultar
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Calidad artesanal
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Cada sillón es fabricado con atención al detalle, utilizando 
                materiales de primera calidad y técnicas tradicionales de tapicería.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Estructuras de madera maciza',
                  'Espumas de alta densidad',
                  'Telas importadas y nacionales',
                  'Garantía de 2 años',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-700 to-violet-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/products/sillones-detail.jpg)' }}
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
              ¿Necesitás restaurar un sillón?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Restauramos todo tipo de sillones y muebles tapizados. 
              Solicitá una visita sin cargo para evaluar tu mueble.
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

