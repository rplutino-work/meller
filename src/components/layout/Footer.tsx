'use client'

import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

const cortinas = [
  { name: 'BlackOut', href: '/blackout' },
  { name: 'SunScreen', href: '/sunscreen' },
  { name: 'Romanas', href: '/romanas' },
  { name: 'Orientales', href: '/orientales' },
  { name: 'Tradicionales', href: '/tradicionales' },
  { name: 'Eclipse', href: '/eclipse' },
  { name: 'Bandas Verticales', href: '/bandas-verticales' },
]

const sillones = [
  { name: 'Tradicionales', href: '/sillones#tradicionales' },
  { name: 'Puff Movibles', href: '/sillones#puff' },
  { name: 'Restauración', href: '/sillones#restauracion' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Redes sociales y atención */}
          <div>
            <h3 className="text-[13px] uppercase tracking-[0.15em] text-white mb-6">
              Seguinos en
            </h3>
            <div className="flex gap-3 mb-10">
              <a 
                href="https://facebook.com/meleroller" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:border-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com/meleroller" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:border-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://threads.net/meleroller" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:border-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.867-.72 2.062-1.148 3.56-1.27 1.187-.097 2.278.017 3.255.273-.089-.844-.353-1.493-.789-1.933-.546-.552-1.386-.834-2.5-.839l-.135-.002c-.93 0-1.96.253-2.553.687l-1.14-1.694c.904-.614 2.24-.99 3.7-.99l.202.003c1.765.019 3.153.538 4.127 1.542.918.947 1.418 2.27 1.489 3.936.31.168.605.36.882.573 1.168.903 1.965 2.18 2.307 3.694.45 1.996.137 4.389-1.64 6.233-1.838 1.906-4.17 2.733-7.34 2.758zm-1.886-6.086l.148.002c.947-.01 1.688-.286 2.202-.82.476-.495.784-1.218.917-2.149-1.37-.303-2.916-.322-4.023.039-.782.255-1.927.793-1.856 2.087.036.646.399 1.18 1.023 1.503.515.267 1.09.368 1.59.338z"/>
                </svg>
              </a>
            </div>
            
            <h3 className="text-[13px] italic text-white mb-4">
              Atención al cliente:
            </h3>
            <div className="text-[14px] text-gray-400 space-y-2">
              <p>
                Presidente Juan Domingo Perón 1154 • Burzaco • Buenos Aires • Argentina
              </p>
              <p>
                Lunes a Viernes de 8.00 a 12.00 hs. y de 13.30 a 17.00 hs.
              </p>
              <p className="text-gray-500">
                Visitas al Showroom con cita previa.
              </p>
            </div>
          </div>

          {/* Cortinas */}
          <div>
            <h3 className="text-[15px] text-white mb-6 font-light italic">
              Cortinas
            </h3>
            <ul className="space-y-2">
              {cortinas.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-[14px] text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sillones */}
          <div>
            <h3 className="text-[15px] text-white mb-6 font-light italic">
              Sillones
            </h3>
            <ul className="space-y-2">
              {sillones.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-[14px] text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-[15px] text-white mb-6 mt-8 font-light italic">
              Toldos y cerramientos
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/#solicitar-visita"
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  Solicitar visita sin cargo
                </Link>
              </li>
              <li>
                <Link 
                  href="/#cotizador"
                  className="text-[14px] text-gray-400 hover:text-white transition-colors"
                >
                  Solicitar presupuesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for spacing like original */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-[11px] text-gray-500 uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} MeleRoller. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
