import StaticPageLayout from '@/components/layout/StaticPageLayout'
import Image from 'next/image'

export default function SillonesPage() {
  return (
    <StaticPageLayout
      titulo="RESTAURACIÓN"
      subtitulo="Renovamos y damos vida a tus muebles"
      heroImage="https://www.meleroller.com.ar/media/sillones/sillones-mele-roller-01.jpg"
      categoria="SILLONES"
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
          En <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> ofrecemos un servicio integral de <span style={{ color: '#000' }}><strong>restauración y tapizado de sillones</strong></span>, renovando por completo tus muebles favoritos con materiales de primera calidad.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Trabajamos con una amplia variedad de telas: <span style={{ color: '#000' }}><strong>cuerina</strong></span>, <span style={{ color: '#000' }}><strong>pana</strong></span>, <span style={{ color: '#000' }}><strong>chenille</strong></span>, <span style={{ color: '#000' }}><strong>terciopelo</strong></span> y <span style={{ color: '#000' }}><strong>lino</strong></span>, entre otras opciones que se adaptan a tu estilo y necesidades.
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
          Nuestro servicio incluye el <span style={{ color: '#000' }}><strong>retiro y entrega a domicilio</strong></span>, para que el proceso sea lo más cómodo posible. Además, realizamos trabajos de <span style={{ color: '#000' }}><strong>relleno de espuma</strong></span>, <span style={{ color: '#000' }}><strong>cambio de estructura</strong></span> y <span style={{ color: '#000' }}><strong>reparación de mecanismos</strong></span> en sillones reclinables.
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
          También fabricamos <span style={{ color: '#000' }}><strong>sillones a medida</strong></span> y <span style={{ color: '#000' }}><strong>puff</strong></span> personalizados, adaptándonos a las dimensiones y diseños que necesites para cada espacio.
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
            src="https://www.meleroller.com.ar/media/sillones/sillones-mele-roller-02.jpg"
            alt="Sillones Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="https://www.meleroller.com.ar/media/sillones/sillones-mele-roller-03.jpg"
            alt="Sillones Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Categorías */}
      <section style={{ marginBottom: '60px' }}>
        <h3 style={{
          fontSize: '28px',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 400,
          color: '#000',
          marginBottom: '30px'
        }}>
          Nuestros Servicios
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            background: '#f8f8f8',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 500,
              color: '#000',
              marginBottom: '15px'
            }}>
              Tradicionales
            </h4>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#666',
              fontFamily: 'Arial, sans-serif'
            }}>
              Restauración de sillones clásicos, sofás y butacas con tapizados premium.
            </p>
          </div>
          <div style={{
            background: '#f8f8f8',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 500,
              color: '#000',
              marginBottom: '15px'
            }}>
              Puff Movibles
            </h4>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#666',
              fontFamily: 'Arial, sans-serif'
            }}>
              Diseños modernos y versátiles para cualquier ambiente.
            </p>
          </div>
          <div style={{
            background: '#f8f8f8',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 500,
              color: '#000',
              marginBottom: '15px'
            }}>
              Restauración
            </h4>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#666',
              fontFamily: 'Arial, sans-serif'
            }}>
              Recuperamos tus muebles favoritos dándoles una nueva vida.
            </p>
          </div>
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
          ¿Por qué elegir el servicio de sillones de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Más de 20 años de experiencia en el rubro.',
            'Amplia variedad de telas y materiales de primera calidad.',
            'Retiro y entrega a domicilio sin cargo.',
            'Presupuesto sin compromiso.',
            'Trabajos garantizados.',
            'Fabricación de muebles a medida.',
            'Asesoramiento personalizado.',
            'Atendemos en todo el país.'
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
    </StaticPageLayout>
  )
}
