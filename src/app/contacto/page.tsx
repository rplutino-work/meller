'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import VisitForm from '@/components/forms/VisitForm'

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Contacto
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Estamos para ayudarte. Contactanos por el medio que prefieras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                Envianos un mensaje
              </h2>
              <VisitForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Información de contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                      <a href="tel:1175191273" className="text-gray-600 hover:text-secondary transition-colors block">
                        11 7519 1273
                      </a>
                      <a href="tel:1122729695" className="text-gray-600 hover:text-secondary transition-colors block">
                        11 2272 9695
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:info@meleroller.com.ar" className="text-gray-600 hover:text-secondary transition-colors">
                        info@meleroller.com.ar
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                      <p className="text-gray-600">
                        Presidente Juan Domingo Perón 1154<br />
                        Burzaco, Buenos Aires, Argentina
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horario de atención</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes<br />
                        8:00 a 12:00 y 13:30 a 17:00
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Visitas al Showroom con cita previa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Seguinos en redes
                </h2>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/meleroller"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={20} />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/meleroller"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Facebook size={20} />
                    Facebook
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Ubicación
                </h2>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.8!2d-58.38!3d-34.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ5JzEyLjAiUyA1OMKwMjInNDguMCJX!5e0!3m2!1ses!2sar!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

