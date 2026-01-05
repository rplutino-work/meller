import ToldosLayout from '@/components/toldos/ToldosLayout'
import Image from 'next/image'

export default function ToldosCerramientosPage() {
  // Generar array de imágenes de la galería (04 a 30)
  const galleryImages = Array.from({ length: 27 }, (_, i) => 
    `/images/toldos/toldos-cerramientos-mele-roller-${String(i + 4).padStart(2, '0')}.png`
  )

  return (
    <ToldosLayout
      currentPage="toldos-cerramientos"
      titulo="CERRAMIENTOS"
      subtitulo="Protección y diseño para tus espacios"
      heroImage="/images/toldos/toldos-cerramientos-mele-roller-04.png"
      categoria="TOLDOS"
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
          En <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> fabricamos <span style={{ color: '#000' }}><strong>Toldos y Cerramientos</strong></span> de alta calidad, ideales para proteger tus espacios exteriores del sol y la lluvia, sin resignar elegancia ni funcionalidad.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Nuestros toldos son perfectos para balcones, terrazas, patios y negocios. Contamos con una amplia variedad de modelos: <span style={{ color: '#000' }}><strong>toldos retráctiles</strong></span>, <span style={{ color: '#000' }}><strong>toldos de brazo invisible</strong></span>, <span style={{ color: '#000' }}><strong>toldos tipo toldo-cortina</strong></span> y <span style={{ color: '#000' }}><strong>cerramientos de PVC cristal</strong></span>.
        </p>
        <br />
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Los <span style={{ color: '#000' }}><strong>cerramientos de PVC cristal</strong></span> son ideales para proteger espacios del viento y la lluvia, manteniendo la visibilidad y luminosidad. Son muy utilizados en gastronomía, comercios y viviendas particulares.
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
          Todos nuestros productos son <span style={{ color: '#000' }}><strong>fabricados a medida</strong></span> y cuentan con materiales de primera calidad, garantizando durabilidad y resistencia a las inclemencias del tiempo.
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
            src="/images/toldos/toldos-cerramientos-mele-roller-05.png"
            alt="Toldos y Cerramientos Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/toldos/toldos-cerramientos-mele-roller-06.png"
            alt="Toldos y Cerramientos Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/toldos/toldos-cerramientos-mele-roller-07.png"
            alt="Toldos y Cerramientos Mele Roller"
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
          ¿Por qué elegir los toldos y cerramientos de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Protección eficiente contra el sol, la lluvia y el viento.',
            'Fabricados a medida según las necesidades de cada espacio.',
            'Amplia variedad de modelos y materiales.',
            'Lonas de alta resistencia UV y a la intemperie.',
            'Instalación profesional incluida.',
            'Cuentan con tres años de garantía.',
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
    </ToldosLayout>
  )
}
