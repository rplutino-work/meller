'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const values = [
  {
    title: 'Versatilidad',
    description: 'Somos fábrica. Vendemos por mayor y menor. Brindamos atención especial a casas de decoración, arquitectos y constructoras.',
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
  },
  {
    title: 'Calidad',
    description: 'Damos 3 años de garantía. Utilizamos sistemas nacionales e importados. Contamos con más de 50 diseños de telas.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
  },
  {
    title: 'Servicio',
    description: 'Hacemos envíos a todo el país. Nuestros decoradores profesionales realizan visitas sin cargo y entregan presupuestos en el acto.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
  },
]

export default function ValuesSection() {
  return (
    <section className="mt-16 lg:mt-24 py-0 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex flex-col"
          >
            {/* Image with black bar title */}
            <div className="relative h-[280px] overflow-hidden">
              <Image
                src={value.image}
                alt={value.title}
                fill
                className="object-cover"
              />
              {/* Black bar with title */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-black py-4 px-6">
                  <h3 className="text-white text-[15px] font-normal uppercase tracking-[0.2em] text-center">
                    {value.title}
                  </h3>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="px-6 py-8 text-center">
              <p className="text-[15px] font-light text-gray-600 leading-[1.8]">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
