import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function OrientalesPage() {
  // Solo las imágenes 01-04 existen realmente
  const galleryImages = [
    '/images/cortinas/orientales/paneles-orientales-mele-roller-01.jpg',
    '/images/cortinas/orientales/paneles-orientales-mele-roller-02.jpg',
    '/images/cortinas/orientales/paneles-orientales-mele-roller-03.jpg',
    '/images/cortinas/orientales/paneles-orientales-mele-roller-04.jpg'
  ]

  return (
    <CortinasLayout
      currentPage="orientales"
      titulo="ORIENTALES"
      subtitulo="El minimalismo en tu ambiente"
      heroImage="/images/cortinas/orientales/paneles-orientales-mele-roller-01.jpg"
      categoria="PANELES"
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
          Los <span style={{ color: '#000' }}><strong>Paneles Orientales</strong></span> van ganando cada vez más lugar en el mercado y en Mele Roller sabemos cómo maximizar su funcionalidad y diseño. Estos cortinados, de origen japonés, ayudan a crear ambientes sencillos y minimalistas aportando un toque de elegancia a todo tipo de espacio.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Estos paños, son utilizados para ventanas de amplias dimensiones, al tiempo que se han convertido en un reemplazo elegante de puertas corredizas y de divisores de espacio. Este último es el uso más común en mono ambientes, oficinas, locales comerciales y centros de estética, entre otros.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Los paneles orientales se erigen sobre un <span style={{ color: '#000' }}><strong>sistema de rieles</strong></span> por los que los paneles de tela se deslizan fácilmente. <span style={{ color: '#000' }}><strong>La luminosidad</strong></span> que aporten, dependerá de la tela elegida. Se puede optar por paneles en tela blackout, que impiden por completo el paso de luz, o por telas <span style={{ color: '#000' }}><strong>sunscreen</strong></span>, que reducen el ingreso de la luz del día sin perderla del todo.
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
          Porque sabemos que las cortinas son un elemento central a la hora de definir el estilo de tus ambientes, en <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> te ofrecemos además la <span style={{ color: '#000' }}><strong>impresión personalizada de tus telas</strong></span>, para darles tu toque único sin perder la elegancia y el buen gusto.
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
            src="/images/cortinas/orientales/paneles-orientales-mele-roller-02.jpg"
            alt="Paneles Orientales Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/orientales/paneles-orientales-mele-roller-03.jpg"
            alt="Paneles Orientales Mele Roller"
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
          ¿Por qué elegir paneles orientales en Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Son ideales para dividir los ambientes de un modo estético y atractivo.',
            'Podrás elegir entre distintas telas para que el ingreso de luz sea el que buscás.',
            'Las telas utilizadas actúan como aislante térmico.',
            'Se fabrican a medida y pueden personalizarse.',
            'Cuentan con tres años de garantía.',
            'Su limpieza no requiere más que de agua y una gota de detergente.',
            'Las telas no se ven afectadas por el contacto directo y continuo de los rayos solares.',
            'Nuestros materiales son de primera calidad.',
            'Hacemos envíos a todo el país.'
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
