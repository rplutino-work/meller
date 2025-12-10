'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, Phone } from 'lucide-react'

interface MeasureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MeasureModal({ isOpen, onClose }: MeasureModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 modal-backdrop z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                  <Ruler className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  CÓMO MEDIR TUS VENTANAS
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Medir el ancho de la ventana teniendo en cuenta los marcos de la misma, 
                  a esta medida es conveniente que exceda <strong>10 cm de cada lado</strong>.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  En el alto lo mismo, agregar <strong>10 cm de cada lado</strong>.
                </p>

                <div className="bg-secondary/10 rounded-xl p-6 text-center">
                  <p className="text-xl font-bold text-primary mb-2">
                    ANCHO TOTAL EN CM = x + 20
                  </p>
                  <p className="text-sm text-gray-600">
                    (ancho de ventana + 10cm izquierda + 10cm derecha)
                  </p>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    Para asesoramiento técnico visitenos en:
                  </p>
                  <p className="text-center font-medium text-primary mb-4">
                    Pres. Juan D. Perón 1154, Burzaco.
                  </p>
                  <a
                    href="tel:1122729695"
                    className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors"
                  >
                    <Phone size={18} />
                    <span className="font-medium">11 2272 9695</span>
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full mt-6 bg-secondary text-white py-3 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

