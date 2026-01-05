import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function BlackOutPage() {
  // Solo las imágenes 01-05 existen realmente
  const galleryImages = [
    '/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-01.jpg',
    '/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-02.jpg',
    '/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-03.jpg',
    '/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-04.jpg',
    '/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-05.jpg'
  ]

  return (
    <CortinasLayout
      currentPage="blackout"
      titulo="ROLLER BLACKOUT"
      subtitulo="Confort, estilo y privacidad"
      heroImage="/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-01.jpg"
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
          Las <span style={{ color: '#000' }}><strong>Cortinas Blackout</strong></span> resultan sumamente apropiadas para aquellos ambientes en los que se desee impedir por completo el paso del sol.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Son ideales para dormitorios, espacios en los que se quiera mejorar la visualización de pantallas u otros ambientes en los que se busque generar intimidad. Además de su hogar, las <strong>cortinas blackout</strong> son muy elegidas para salas de reuniones, hoteles, laboratorios, aulas y hospitales, entre otros.
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
          La <span style={{ color: '#000' }}><strong>tela blackout</strong></span> actúa como <span style={{ color: '#000' }}><strong>aislante térmico y solar</strong></span>, por lo que suelen utilizar para reemplazar a las persianas. Además, permiten una <span style={{ color: '#000' }}><strong>mejor refrigeración</strong></span> de los ambientes y contribuyen al cuidado de los muebles, pisos y artefactos haciendo que ninguno de ellos sufra decoloraciones, sobrecalentamiento y dilataciones propias de los rayos UV.
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
          Dentro de este estilo, se puede optar por las de uso manual o las mecanizadas, las cuales funcionan a control remoto o mediante una botonera fija. Asimismo, los mecanismos, pueden ser reforzados según el peso de las telas, de ahí que los accesorios puedan ser de metal o plástico, teniendo ambos buena resistencia. El sistema de ocupa del enrrollado de la cortina de manera vertical, haciendo que su funcionamiento sea práctico y sencillo.
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
            src="/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-02.jpg"
            alt="Cortinas roller Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/blackout/cortinas-roller-blackout-mele-roller-03.jpg"
            alt="Cortinas roller Mele Roller"
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
          ¿Por qué elegir cortinas Roller Blackout de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Son las más vendidas del mercado.',
            'La tela Blackout impide el paso total de la luz solar creando ambientes sumamente íntimos.',
            'Actúan como aislantes térmicos.',
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
