'use client'

import Link from 'next/link'

const cortinas = [
  { name: 'BlackOut', href: '/cortinas/BlackOut' },
  { name: 'SunScreen', href: '/cortinas/SunScreen' },
  { name: 'Romanas', href: '/cortinas/Romanas' },
  { name: 'Orientales', href: '/cortinas/Orientales' },
  { name: 'Tradicionales', href: '/cortinas/Tradicionales' },
  { name: 'Eclipse', href: '/cortinas/Eclipse' },
  { name: 'Bandas Verticales', href: '/cortinas/Bandas-Verticales' },
]

const sillones = [
  { name: 'Tradicionales', href: '/sillones/Tradicionales' },
  { name: 'Puff Movibles', href: '/sillones/Puff-Movibles' },
  { name: 'Restauración', href: '/sillones/Restauracion' },
]

export default function Footer() {
  return (
    <footer 
      className="footer footer-sm"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '19.2px 0 16px',
        margin: 0,
        fontSize: '16px',
        fontFamily: 'Oswald, sans-serif'
      }}
    >
      <div 
        className="container"
        style={{
          width: '100%',
          maxWidth: '1170px',
          padding: '0 15px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        {/* First Row */}
        <div 
          className="row"
          style={{
            display: 'block',
            margin: '0 -15px',
            padding: 0,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Column - Social & Customer Service */}
          <div 
            className="col-md-6"
            style={{
              width: '50%',
              padding: '0 15px',
              margin: 0,
              boxSizing: 'border-box',
              display: 'block',
              float: 'left'
            }}
          >
            <h3 
              className="norm gray-light"
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'rgb(170, 170, 170)',
                margin: '22px 0 11px',
                textTransform: 'none',
                fontFamily: 'Oswald, sans-serif'
              }}
            >
              SEGUINOS EN
            </h3>
            <ul 
              className="list-inline"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 8px',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >
              <li style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <a 
                  href="https://www.facebook.com/cortinasmeleroller" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  <div 
                    className="facebook"
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '0.67px solid rgb(128, 128, 128)',
                      borderRadius: '100%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.9 17.01" enableBackground="new 0 0 7.9 17.01" xmlSpace="preserve" style={{ width: '12px', height: '24px', fill: 'rgb(128, 128, 128)' }}>
                      <path d="M7.9,5.51H5.21V3.74c0-0.66,0.44-0.82,0.75-0.82c0.31,0,1.9,0,1.9,0V0.01L5.24,0c-2.9,0-3.56,2.17-3.56,3.57v1.94H0v3h1.68c0,3.85,0,8.5,0,8.5h3.53c0,0,0-4.69,0-8.5h2.38L7.9,5.51L7.9,5.51z"/>
                    </svg>
                  </div>
                </a>
              </li>
              <li style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <a 
                  href="https://www.instagram.com/_meleroller" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  <div 
                    className="instagram"
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '0.67px solid rgb(128, 128, 128)',
                      borderRadius: '100%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16.88px" height="17.01px" viewBox="0 0 16.88 17.01" enableBackground="new 0 0 16.88 17.01" xmlSpace="preserve" style={{ width: '20px', height: '20px', fill: 'rgb(128, 128, 128)' }}>
                      <path d="M13.26,0H3.62C1.63,0,0,1.59,0,3.54v9.93c0,1.95,1.63,3.54,3.62,3.54h9.64c2,0,3.62-1.59,3.62-3.54V3.54C16.88,1.59,15.26,0,13.26,0z M15.43,13.47c0,1.15-0.97,2.08-2.16,2.08H3.62c-1.19,0-2.16-0.93-2.16-2.08V3.54c0-1.15,0.97-2.08,2.16-2.08h9.64c1.19,0,2.16,0.93,2.16,2.08V13.47z M8.44,4.09c-2.43,0-4.41,1.98-4.41,4.41c0,2.43,1.98,4.41,4.41,4.41c2.43,0,4.41-1.98,4.41-4.41C12.86,6.07,10.88,4.09,8.44,4.09z M8.44,11.46c-1.63,0-2.96-1.33-2.96-2.96c0-1.63,1.33-2.96,2.96-2.96c1.63,0,2.96,1.33,2.96,2.96C11.4,10.13,10.07,11.46,8.44,11.46z M13.18,2.83c-0.57,0-1.03,0.46-1.03,1.03c0,0.57,0.46,1.03,1.03,1.03c0.57,0,1.03-0.46,1.03-1.03C14.21,3.3,13.75,2.83,13.18,2.83z"/>
                    </svg>
                  </div>
                </a>
              </li>
              <li style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <a 
                  href="https://www.threads.com/@_meleroller?xmt=AQF0Isbp31t_Re2x8cjOx_MUzbV7m1URQH22sD_FudX7tjI" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  <div 
                    className="instagram"
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '0.67px solid rgb(128, 128, 128)',
                      borderRadius: '100%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ width: '20px', height: '20px', fill: 'rgb(128, 128, 128)' }}>
                      <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
            
            {/* Divider Line */}
            <div 
              className="line"
              style={{
                background: '#555555',
                height: '0.025em',
                width: '100%',
                margin: '11px 0'
              }}
            />
            
            <h3 
              className="norm gray-light semibold"
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: 'rgb(170, 170, 170)',
                margin: '22px 0 11px',
                textTransform: 'none',
                fontFamily: 'Oswald, sans-serif'
              }}
            >
              Atención al cliente:
            </h3>
            <p 
              className="gray-light light"
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'rgb(170, 170, 170)',
                margin: '0 0 11px',
                lineHeight: '1.6',
                fontFamily: 'Oswald, sans-serif'
              }}
            >
              Presidente Juan Domingo Perón 1154 • Burzaco • Buenos Aires • Argentina<br />
              Lunes a Viernes de 8.00 a 12.00 hs. y de 13.30 a 17.00 hs.<br />
              Visitas al Showroom con cita previa.
            </p>
          </div>
          
          {/* Middle Column - Cortinas */}
          <div 
            className="col-md-3"
            style={{
              width: '25%',
              padding: '0 15px',
              margin: 0,
              boxSizing: 'border-box',
              display: 'block',
              float: 'left'
            }}
          >
            <h3 
              className="norm"
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'rgb(128, 128, 128)',
                margin: '22px 0 11px',
                textTransform: 'none',
                fontFamily: 'Oswald, sans-serif'
              }}
            >
              <Link 
                href="/cortinas"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgb(128, 128, 128)',
                  textDecoration: 'none',
                  fontFamily: 'Oswald, sans-serif'
                }}
              >
                Cortinas
              </Link>
            </h3>
            <ul 
              className="list-unstyled"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 11px'
              }}
            >
              {cortinas.map((item) => (
                <li key={item.name} style={{ listStyle: 'none', padding: 0, margin: '0 0 5px' }}>
                  <Link 
                    href={item.href}
                    style={{
                      fontSize: '16px',
                      color: 'rgb(128, 128, 128)',
                      textDecoration: 'none',
                      fontFamily: 'Oswald, sans-serif',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(128, 128, 128)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column - Sillones */}
          <div 
            className="col-md-3"
            style={{
              width: '25%',
              padding: '0 15px',
              margin: 0,
              boxSizing: 'border-box',
              display: 'block',
              float: 'left'
            }}
          >
            <h3 
              className="norm"
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'rgb(128, 128, 128)',
                margin: '22px 0 11px',
                textTransform: 'none',
                fontFamily: 'Oswald, sans-serif'
              }}
            >
              <Link 
                href="/sillones"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgb(128, 128, 128)',
                  textDecoration: 'none',
                  fontFamily: 'Oswald, sans-serif'
                }}
              >
                Sillones
              </Link>
            </h3>
            <ul 
              className="list-unstyled"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 11px'
              }}
            >
              {sillones.map((item, index) => (
                <li 
                  key={item.name} 
                  style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: index === 2 ? '0 0 12px' : '0 0 5px' 
                  }}
                >
                  <Link 
                    href={item.href}
                    style={{
                      fontSize: '16px',
                      color: 'rgb(128, 128, 128)',
                      textDecoration: 'none',
                      fontFamily: 'Oswald, sans-serif',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(128, 128, 128)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              <li 
                className="norm"
                style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 12px' 
                }}
              >
                <Link 
                  href="/toldos-y-cerramientos"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'rgb(170, 170, 170)',
                    textDecoration: 'none',
                    fontFamily: 'Oswald, sans-serif',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(170, 170, 170)'}
                >
                  Toldos y cerramientos
                </Link>
              </li>
              
              <li 
                className="norm"
                style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 5px' 
                }}
              >
                <Link 
                  href="/#solicitar-visita"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'rgb(170, 170, 170)',
                    textDecoration: 'none',
                    fontFamily: 'Oswald, sans-serif',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(170, 170, 170)'}
                >
                  Solicitar visita sin cargo
                </Link>
              </li>
              
              <li 
                className="norm"
                style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0 
                }}
              >
                <Link 
                  href="/#cotizador"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'rgb(170, 170, 170)',
                    textDecoration: 'none',
                    fontFamily: 'Oswald, sans-serif',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(170, 170, 170)'}
                >
                  Solicitar presupuesto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Second Row - Adniverse Logo */}
        <div 
          className="row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 -15px',
            padding: 0,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            className="col-md-12 text-center"
            style={{
              flex: '0 0 100%',
              maxWidth: '100%',
              padding: '8px 15px',
              margin: 0,
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
          >
            {/* Logo de agencia oculto temporalmente */}
            {/* <div
              className="line"
              style={{
                background: '#555555',
                height: '0.025em',
                width: '100%',
                marginBottom: '12px'
              }}
            />
            <a 
              href="http://adniverse.ar/" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img 
                src="/images/adniverse.svg" 
                alt="Adniverse" 
                width={90}
                style={{ display: 'block', margin: '0 auto' }}
              />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
