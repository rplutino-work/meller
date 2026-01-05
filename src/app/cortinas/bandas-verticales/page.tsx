import CortinasLayout from '@/components/cortinas/CortinasLayout'
import Image from 'next/image'

export default function BandasVerticalesPage() {
  // Imágenes locales
  const galleryImages = [
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-01.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-02.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-03.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-04.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-05.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-06.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-07.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-08.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-09.jpg',
    '/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-10.jpg'
  ].filter(Boolean)

  return (
    <CortinasLayout
      currentPage="bandas-verticales"
      titulo="VERTICALES"
      subtitulo="La más versátil de las cortinas"
      heroImage="/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-01.jpg"
      categoria="BANDAS"
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
          En <span style={{ color: '#000' }}><strong>Mele Roller</strong></span> contamos con una amplia variedad de opciones y, entre ellas, se destacan las <span style={{ color: '#000' }}><strong>Cortinas Verticales</strong></span>. Este modelo es muy elegido por aquellos amantes del diseño y la decoración de interiores.
        </p>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 400
        }}>
          Las <span style={{ color: '#000' }}><strong>Bandas Verticales</strong></span> son una elección recurrente en salones y centros de belleza porque además de brindar elegancia, permiten diversificar los efectos de la luz natural.
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
          Este tipo de cortinas es montado sobre un sistema de rieles y puede utilizarse tanto de modo manual como automático por control remoto.
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
          Al girar sobre su propio eje, se puede seleccionar en qué ángulo poner las bandas para permitir o evitar el paso de la luz desde un 0% a un 100%; lo que las convierte en la más versátil de nuestras alternativas.
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
            src="/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-02.jpg"
            alt="Cortinas Bandas Verticales Mele Roller"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#f5f5f5' }}>
          <Image
            src="/images/cortinas/bandas-verticales/bandas-verticales-mele-roller-03.jpg"
            alt="Cortinas Bandas Verticales Mele Roller"
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
          ¿Por qué elegir las bandas verticales de Mele Roller?
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Permiten bloquear por completo el paso de la luz exterior.',
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
