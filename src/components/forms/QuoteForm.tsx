'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle, Loader2 } from 'lucide-react'

const productTypes = [
  'Roller Blackout',
  'Roller Sun Screen (5%)',
  'Roller Eclipse',
  'Bandas Verticales Blackout',
  'Bandas Verticales Sun Screen (5%)',
  'Tradicionales Livianas Traslúcidas a Riel',
  'Tradicionales Blackout Texturadas a Riel',
  'Tradicionales Livianas Traslúcidas a Barral',
  'Tradicionales Blackout Texturadas a Barral',
]

const productSchema = z.object({
  tipo: z.string().min(1, 'Selecciona un tipo'),
  ancho: z.string().min(1, 'El ancho es requerido'),
  alto: z.string().min(1, 'El alto es requerido'),
})

const quoteSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  productos: z.array(productSchema).min(1, 'Agregá al menos un producto'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface QuoteFormProps {
  onClose?: () => void
}

export default function QuoteForm({ onClose }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('Te enviaremos tu cotización dentro de las próximas 24 hs. hábiles.')

  useEffect(() => {
    // Cargar mensaje de éxito desde la configuración
    fetch('/api/configuracion-formulario?nombre=presupuesto')
      .then(res => res.json())
      .then(config => {
        if (config && config.mensajeExito) {
          setSuccessMessage(config.mensajeExito)
        }
      })
      .catch(() => {
        // Usar mensaje por defecto si hay error
      })
  }, [])

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productos: [{ tipo: '', ancho: '', alto: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productos',
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/solicitudes/presupuesto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          productos: JSON.stringify(data.productos),
        }),
      })

      if (!response.ok) throw new Error('Error al enviar la solicitud')

      setIsSuccess(true)
      reset()
    } catch {
      setError('Hubo un error al enviar tu solicitud. Por favor, intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">¡Listo!</h3>
        <p className="text-gray-600 mb-6">
          {successMessage}
        </p>
        <button
          onClick={onClose}
          className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Entendido
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-xl font-bold text-primary mb-4">SOLICITAR PRESUPUESTO</h3>

      {/* Productos */}
      <div className="space-y-4">
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Cortina {index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <select
                    {...register(`productos.${index}.tipo`)}
                    className="input-styled w-full px-4 py-3 rounded-lg bg-white outline-none"
                  >
                    <option value="">Tipo de cortina</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.productos?.[index]?.tipo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.productos[index]?.tipo?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register(`productos.${index}.ancho`)}
                    placeholder="Ancho (cm)"
                    className="input-styled w-full px-4 py-3 rounded-lg bg-white outline-none"
                  />
                  {errors.productos?.[index]?.ancho && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.productos[index]?.ancho?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register(`productos.${index}.alto`)}
                    placeholder="Alto (cm)"
                    className="input-styled w-full px-4 py-3 rounded-lg bg-white outline-none"
                  />
                  {errors.productos?.[index]?.alto && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.productos[index]?.alto?.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => append({ tipo: '', ancho: '', alto: '' })}
          className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Agregar cortina</span>
        </button>
      </div>

      {/* Datos personales */}
      <div className="border-t pt-6 mt-6">
        <h4 className="text-lg font-semibold text-primary mb-4">
          COMPLETA TUS DATOS Y TE COTIZAMOS SIN CARGO
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              {...register('nombre')}
              placeholder="Nombre completo"
              className="input-styled w-full px-4 py-3 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="input-styled w-full px-4 py-3 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              type="tel"
              {...register('telefono')}
              placeholder="Teléfono"
              className="input-styled w-full px-4 py-3 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-animated bg-secondary text-white py-4 rounded-lg font-medium text-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          'RECIBIR COTIZACIÓN'
        )}
      </button>
    </form>
  )
}

