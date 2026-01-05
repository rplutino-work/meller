import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function EclipsePage() {
  // Imágenes locales (solo las que existen)
  const galleryImages = [
    '/images/cortinas/eclipse/cortina-eclipse-mele-roller-01.jpg',
    '/images/cortinas/eclipse/cortina-eclipse-mele-roller-02.jpg',
    '/images/cortinas/eclipse/cortina-eclipse-mele-roller-03.jpg',
    '/images/cortinas/eclipse/cortina-eclipse-mele-roller-04.jpg'
  ]

  return (
    <CortinasLayout
      currentPage="eclipse"
      titulo="ECLIPSE"
      subtitulo="Elegancia y Confort"
      heroImage="/images/cortinas/eclipse/cortina-eclipse-mele-roller-01.jpg"
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
          Las <span style={{ color: '#000' }}><strong>Cortinas Roller Eclipse</strong></span> están diseñadas con bandas horizontales que, al superponerlas, logran un ingreso de luz adaptable a la necesidad de cada momento.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          La superposición de la tela opaca sobre la transparente, logra un ambiente delicado aumentando la sensación de intimidad, elegancia y confort.
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
          En <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> sabemos que las cortinas son fundamentales a la hora de darle personalidad a tus ambientes, por eso contamos con una muy amplia variedad de telas.
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
            src="/images/cortinas/eclipse/cortina-eclipse-mele-roller-02.jpg"
            alt="Cortinas Eclipse Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/eclipse/cortina-eclipse-mele-roller-03.jpg"
            alt="Cortinas Eclipse Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
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
          ¿Por qué elegir cortinas Roller Eclipse en Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Se fabican a medida y pueden personalizarse.',
            'Cuentan con tres años de garantía.',
            'No se ven afectadas por el contacto directo y continuo de los rayos solares.',
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
