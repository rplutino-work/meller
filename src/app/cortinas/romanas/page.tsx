import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function RomanasPage() {
  // Solo las imágenes 01-06 existen realmente
  const galleryImages = [
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-01.jpg',
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-02.jpg',
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-03.jpg',
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-04.jpg',
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-05.jpg',
    '/images/cortinas/romanas/cortinas-romanas-mele-roller-06.jpg'
  ]

  return (
    <CortinasLayout
      currentPage="romanas"
      titulo="ROMANAS"
      subtitulo="Las más elegidas para revestir superficies vidriadas"
      heroImage="/images/cortinas/romanas/cortinas-romanas-mele-roller-01.jpg"
      categoria="CORTINAS"
      galleryImages={galleryImages}
    >
      {/* Contenido principal */}
      <section style={{ marginBottom: '40px' }}>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Las <span style={{ color: '#000' }}><strong>Cortinas Romanas</strong></span> están destinadas a revestir superficies vidriadas, brindando protección al espacio interior de la acción de los rayos solares, al tiempo que controlan el ingreso y graduación de la luz exterior.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Este modelo se coloca con varillas de aluminio distribuidas cada 25 cm y con sistema de velcro superior.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Las telas vienen en una <span style={{ color: '#000' }}><strong>amplia amalgama de colores y texturas</strong></span>, adaptándose a todo tipo de ventanas y ambientes.
        </p>
        <br />
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '40px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          El sistema de altura regulable brinda la posibilidad de detener la cortina en el nivel deseado, adaptándose a la necesidad de cada momento. Su accionamiento es manual, por medio de cadenas metálicas o plásticas.
        </p>
      </section>

      {/* Imágenes */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '60px'
      }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/romanas/cortinas-romanas-mele-roller-02.jpg"
            alt="Cortinas roller Romanas Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/romanas/cortinas-romanas-mele-roller-03.jpg"
            alt="Cortinas roller Romanas Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Por qué elegir */}
      <section style={{
        background: '#f8f8f8',
        padding: '40px',
        marginBottom: '40px'
      }}>
        <h3 style={{
          fontSize: '28px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 400,
          color: '#000',
          marginBottom: '30px'
        }}>
          ¿Por qué elegir las cortinas romanas de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Nos permiten adaptarlas a la necesidad de cada momento.',
            'Regulan el paso de la luz solar creando ambientes íntimos y cálidos.',
            'Se fabrican a medida y pueden personalizarse.',
            'Cuentan tres años de garantía.',
            'Nuestros materiales son de primera calidad.',
            'Hacemos envíos a todo el país.',
            'El asesoramiento de nuestros decoradores es sin cargo.'
          ].map((item, index) => (
            <li key={index} style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
              marginBottom: '12px',
              paddingLeft: '24px',
              position: 'relative',
              fontFamily: 'Arial, sans-serif'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '10px',
                width: '6px',
                height: '6px',
                background: '#000',
                borderRadius: '50%'
              }} />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </CortinasLayout>
  )
}
