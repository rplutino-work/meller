import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function TradicionalesPage() {
  // Imágenes locales
  const galleryImages = [
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-01.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-02.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-03.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-04.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-05.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-06.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-07.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-08.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-09.jpg',
    '/images/cortinas/tradicionales/cortina-tradicional-mele-roller-10.jpg'
  ].filter(Boolean)

  return (
    <CortinasLayout
      currentPage="tradicionales"
      titulo="TRADICIONALES"
      subtitulo="Lo convencional no pierde vigencia"
      heroImage="/images/cortinas/tradicionales/cortina-tradicional-mele-roller-01.jpg"
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
          En <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> fabricamos <span style={{ color: '#000' }}><strong>Cortinas Convencionales</strong></span> a medida, porque los clásicos siempre mantienen su vigencia. Este tipo de Cortinas se caracteriza por contar con <span style={{ color: '#000' }}><strong>tres tipos de cabezales: plizado, tableado y americano.</strong></span> Con un frunce del 250%, sistema de ganchos deslizantes y auto regulables en altura.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Las <span style={{ color: '#000' }}><strong>telas convencionales</strong></span> pueden quedar sujetas mediante un sistema de riel europeo hecho en aluminio, correderas giratorias de bastones metálicos para su accionamiento o, también, mediante un barral de metal o madera con argollas.
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
          Este tipo de <span style={{ color: '#000' }}><strong>Cortinas</strong></span> mantienen su vigencia y elegancia pese al paso del tiempo y las innovaciones por lo que siempre son una elección sugerida, según el estilo de diseño que quiera desarrollar en cada uno de sus ambientes.
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
            src="/images/cortinas/tradicionales/cortina-tradicional-mele-roller-02.jpg"
            alt="Cortinas Tradicionales Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/tradicionales/cortina-tradicional-mele-roller-03.jpg"
            alt="Cortinas Tradicionales Mele Roller"
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
          ¿Por qué elegir las cortinas convencionales de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'La amplia variedad de telas y métodos de confección, las convierten en las preferidas de nuestros clientes más tradicionales.',
            'Funcionan como aislante térmico y sonoro.',
            'Se fabrican a medida.',
            'Brindamos tres años de garantía.',
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
