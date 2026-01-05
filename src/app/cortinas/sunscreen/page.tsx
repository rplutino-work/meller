import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function SunScreenPage() {
  // Imágenes locales
  const galleryImages = [
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-01.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-02.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-03.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-04.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-05.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-06.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-07.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-08.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-09.jpg',
    '/images/cortinas/sunscreen/cortina-roller-sunscreen-10.jpg'
  ].filter(Boolean)

  return (
    <CortinasLayout
      currentPage="sunscreen"
      titulo="ROLLER SUNSCREEN"
      subtitulo="Confort, estilo y luminosidad"
      heroImage="/images/cortinas/sunscreen/cortina-roller-sunscreen-01.jpg"
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
          Las <span style={{ color: '#000' }}><strong>Cortinas Roller Sunscreen</strong></span>, al igual que las <strong>blackout</strong>, impiden el ingreso de los rayos UV pero, a diferencia de las anteriores, el bloqueo es menor, por lo que eliminan los efectos molestos de los rayos solares, manteniendo la luminosidad de los ambientes.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Las <span style={{ color: '#000' }}><strong>Telas Sunscreen</strong></span> suelen ser elegidas por su elegancia, funcionalidad y los juegos visuales que permiten al regular el ingreso de luz. Son ideales para ambientes en los que la decoración vaya de la mano de la calidez.
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
          En lo que al sistema respecta, se puede optar por las de uso manual o las mecanizadas. Estas últimas funcionan a control remoto o mediante una botonera fija de forma automática. Asimismo, los mecanismos, pueden ser reforzados según el peso de las telas, de ahí que los accesorios puedan ser de metal o plástico, teniendo ambos amplia resistencia. El sistema de ocupa del enrrollado de la cortina de manera vertical, haciendo que su funcionamiento sea práctico, sencillo y muy elegante.
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
            src="/images/cortinas/sunscreen/cortina-roller-sunscreen-02.jpg"
            alt="Cortinas roller SunScreen Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/sunscreen/cortina-roller-sunscreen-03.jpg"
            alt="Cortinas roller SunScreen Mele Roller"
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
          Por qué elegir las cortinas Roller Sunscreen en Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Las cortinas Roller son las más elegidas del mercado.',
            'Las telas sunscreen pueden graduar el paso de la luz solar creando ambientes íntimos y cálidos.',
            'Se fabrican a medida y pueden personalizarse.',
            'Cuentan con tres años de garantía.',
            'Su limpieza no requiere más que de agua y una gota de detergente.',
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
