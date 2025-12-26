'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const values = [
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
  {
    title: 'SERVICIO',
    description: 'Hacemos envíos a todo el país. Nuestros decoradores profesionales realizan visitas sin cargo y entregan presupuestos en el acto.',
    image: '/images/servicio-phone.jpg',
  },
]

export default function ValuesSection() {
  return (
    <section style={{
      margin: '5em 0',
      padding: 0,
      backgroundColor: '#fff',
      background: '#fff',
      position: 'relative',
      zIndex: 1,
      width: '100%',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        padding: '0 15px',
        margin: '0 auto',
        maxWidth: '1920px',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        background: '#fff',
        position: 'relative',
        zIndex: 1
      }}
      className="container-fluid"
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 -15px',
          padding: 0,
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          background: '#fff',
          position: 'relative',
          zIndex: 1
        }}
        className="row"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              style={{
                flex: '0 0 33.333333%',
                maxWidth: '33.333333%',
                padding: '0 15px',
                margin: 0,
                boxSizing: 'border-box',
                width: '100%'
              }}
              className="values-col"
            >
              {/* Image - title is already in the image */}
              <Image
                src={value.image}
                alt={value.title}
                width={610}
                height={365}
                style={{
                  width: '100%',
                  maxWidth: '610px',
                  height: 'auto',
                  display: 'block',
                  marginBottom: '0.5em'
                }}
              />
              {/* Description text */}
              <p style={{
                fontSize: '20px',
                fontWeight: 300,
                color: '#000',
                paddingLeft: '18px',
                marginBottom: index < 2 ? '40px' : '0',
                lineHeight: '28.57px',
                fontFamily: 'Oswald, sans-serif'
              }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
