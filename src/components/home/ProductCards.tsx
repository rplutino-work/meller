'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Roller Black Out',
    headingHTML: 'Roller <br><span>Black Out</span>',
    image: '/images/products/cortinas-roller-blackout-mele-roller-03.jpg',
    href: '/blackout',
    className: 'effect-chico',
    fontSize: '52px',
  },
  {
    id: 2,
    name: 'Roller Sunscreen',
    headingHTML: 'Roller <br><span>Sunscreen</span>',
    image: '/images/products/cortina-roller-sunscreen-05.jpg',
    href: '/sunscreen',
    className: 'effect-chico',
    fontSize: '52px',
  },
  {
    id: 3,
    name: 'Eclipse',
    headingHTML: 'Eclipse',
    image: '/images/products/cortina-eclipse-mele-roller-01.jpg',
    href: '/eclipse',
    className: 'effect-chico special-2',
    fontSize: '34px',
  },
  {
    id: 4,
    name: 'Paneles Orientales',
    headingHTML: 'Paneles Orientales',
    image: '/images/products/paneles-orientales-mele-roller-04.jpg',
    href: '/orientales',
    className: 'effect-chico special-1',
    fontSize: '34px',
  },
  {
    id: 5,
    name: 'Romanas',
    headingHTML: 'Romanas',
    image: '/images/products/cortinas-romanas-mele-roller-06.jpg',
    href: '/romanas',
    className: 'effect-chico special-2',
    fontSize: '34px',
  },
  {
    id: 6,
    name: 'Tradicionales',
    headingHTML: 'Tradicionales',
    image: '/images/products/cortina-tradicional-mele-roller-07.jpg',
    href: '/tradicionales',
    className: 'effect-chico special-2',
    fontSize: '34px',
  },
]

export default function ProductCards() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true)
            if (titleRef.current) {
              titleRef.current.classList.add('animar')
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [isAnimated])

  // Dividir el texto en letras
  const text = 'SOMOS ESPECIALISTAS EN CORTINAS'
  const letters = text.split('')

  return (
    <>
      {/* Title Section - with animated letters */}
      <section style={{ margin: '5em 0' }}>
        <div className="container-fluid" style={{ width: '100%', padding: '0 15px', margin: '0 auto', maxWidth: '100%' }}>
          <div className="row" style={{ display: 'block', margin: '0 -15px', padding: 0, width: '100%', boxSizing: 'border-box' }}>
            <div className="col-md-12 text-center" style={{ width: '100%', padding: '0 15px', margin: 0, boxSizing: 'border-box' }}>
              <h3
                id="titulo-animado"
                ref={titleRef}
                style={{
                  fontSize: '7vw',
                  margin: 0,
                  padding: 0,
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 300,
                  color: '#000',
                  textAlign: 'center',
                  display: 'inline-block',
                  overflow: 'hidden'
                }}
              >
                {letters.map((letter, index) => (
                  <span
                    key={index}
                    className="letra"
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="cortinas" style={{ padding: 0, margin: 0, backgroundColor: 'transparent' }}>
        <div className="grid" style={{ padding: 0, display: 'block', textAlign: 'center', fontSize: 0 }}>
          {products.map((product, index) => (
            <figure
              key={product.id}
              className={product.className}
              style={{
                display: 'inline-block',
                position: 'relative',
                width: '479.992px',
                height: '400px',
                margin: '-2.16px',
                padding: 0,
                backgroundColor: '#000',
                overflow: 'hidden',
                cursor: 'pointer',
                verticalAlign: 'top'
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="479.992px"
                style={{
                  objectFit: 'cover'
                }}
                priority={index < 3}
                unoptimized
                className="product-image"
              />
              <figcaption
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '3em',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  opacity: 1,
                  transition: 'all 0.35s ease'
                }}
                className="product-figcaption"
              >
                <h2
                  className="xxlarge"
                  style={{
                    fontSize: product.fontSize,
                    fontWeight: 300,
                    color: '#fff',
                    fontFamily: 'Oswald, sans-serif',
                    textTransform: 'uppercase',
                    margin: 0,
                    padding: 0,
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    lineHeight: product.fontSize === '52px' ? '57.2px' : '37.4px',
                    letterSpacing: 'normal',
                    fontStyle: 'normal'
                  }}
                  dangerouslySetInnerHTML={{ __html: product.headingHTML }}
                />
                <Link
                  href={product.href}
                  style={{
                    fontSize: '0px',
                    fontWeight: 400,
                    color: '#000',
                    textDecoration: 'none',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    zIndex: 1000
                  }}
                >
                  Ver más
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
