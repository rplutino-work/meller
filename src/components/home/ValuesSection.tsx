'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const values = [
  {
    title: 'SERVICIO',
    description: 'Hacemos envíos a todo el país. Nuestros decoradores profesionales realizan visitas sin cargo y entregan presupuestos en el acto.',
    image: '/images/servicio-phone.jpg',
  },
  {
    title: 'VERSATILIDAD',
    description: 'Somos fábrica. Vendemos por mayor y menor. Brindamos atención especial a casas de decoración, arquitectos y constructoras.',
    image: '/images/versatilidad-phone.jpg',
  },
  {
    title: 'CALIDAD',
    description: 'Damos 3 años de garantía. Utilizamos sistemas nacionales e importados. Contamos con más de 50 diseños de telas.',
    image: '/images/calidad-phone.jpg',
  },
]

export default function ValuesSection() {
  return (
    <section className="py-20 lg:py-32 bg-white values-section-padding">
      <div className="w-full px-4 lg:px-6 mx-auto max-w-[1920px]">
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="w-full lg:w-[calc(33.333%-1.5rem)] lg:max-w-[610px]"
            >
              {/* Image - title is already in the image */}
              <Image
                src={value.image}
                alt={value.title}
                width={610}
                height={365}
                className="w-full h-auto block mb-2 mx-auto lg:mx-0"
                style={{ maxWidth: '610px' }}
              />
              {/* Description text */}
              <p 
                className="text-center lg:text-left text-lg lg:text-xl font-light text-black leading-relaxed px-2 lg:px-0 lg:pl-4"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
