'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, Loader2, X } from 'lucide-react'

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
  const [step, setStep] = useState<'productos' | 'datos'>('productos')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('Te enviaremos tu cotización dentro de las próximas 24 hs. hábiles.')

  useEffect(() => {
    fetch('/api/configuracion-formulario?nombre=presupuesto')
      .then(res => res.json())
      .then(config => {
        if (config && config.mensajeExito) {
          setSuccessMessage(config.mensajeExito)
        }
      })
      .catch(() => {})
  }, [])

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
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

  const productos = watch('productos')

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

  const handleContinue = () => {
    // Validar productos antes de continuar
    const productosValidos = productos.every(p => p.tipo && p.ancho && p.alto)
    if (productosValidos) {
      setStep('datos')
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ padding: '40px', textAlign: 'center' }}
      >
        <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>¡Listo!</h3>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '16px' }}>
          {successMessage}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '12px 32px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '0',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'black'}
        >
          Entendido
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '0' }}>
      {step === 'productos' ? (
        <div style={{ padding: '32px' }}>
          {/* Banner verde */}
          <div style={{
            background: '#d1fae5',
            padding: '12px 16px',
            marginBottom: '24px',
            borderRadius: '4px'
          }}>
            <p style={{
              color: '#065f46',
              fontSize: '14px',
              fontWeight: 500,
              margin: 0
            }}>
              Cargá todas las cortinas que necesites.
            </p>
          </div>

          {/* Lista de productos */}
          <div style={{ marginBottom: '24px' }}>
            <AnimatePresence>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginBottom: '16px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr auto',
                    gap: '12px',
                    alignItems: 'end'
                  }}>
                    {/* Ancho */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Ancho (cm)
                      </label>
                      <input
                        type="number"
                        {...register(`productos.${index}.ancho`, {
                          onChange: (e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            e.target.value = value
                          }
                        })}
                        placeholder="0"
                        min="0"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.productos?.[index]?.ancho ? '2px solid #dc2626' : '1px solid #d1d5db',
                          borderRadius: '0',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#000'}
                        onBlur={(e) => {
                          if (!errors.productos?.[index]?.ancho) {
                            e.target.style.borderColor = '#d1d5db'
                          }
                        }}
                      />
                    </div>

                    {/* Alto */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Alto (cm)
                      </label>
                      <input
                        type="number"
                        {...register(`productos.${index}.alto`, {
                          onChange: (e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            e.target.value = value
                          }
                        })}
                        placeholder="0"
                        min="0"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.productos?.[index]?.alto ? '2px solid #dc2626' : '1px solid #d1d5db',
                          borderRadius: '0',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#000'}
                        onBlur={(e) => {
                          if (!errors.productos?.[index]?.alto) {
                            e.target.style.borderColor = '#d1d5db'
                          }
                        }}
                      />
                    </div>

                    {/* Tipo */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Tipo
                      </label>
                      <select
                        {...register(`productos.${index}.tipo`)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: errors.productos?.[index]?.tipo ? '2px solid #dc2626' : '1px solid #d1d5db',
                          borderRadius: '0',
                          fontSize: '14px',
                          background: 'white',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#000'}
                        onBlur={(e) => {
                          if (!errors.productos?.[index]?.tipo) {
                            e.target.style.borderColor = '#d1d5db'
                          }
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {productTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Botón eliminar */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                          padding: '10px',
                          background: 'transparent',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Botón Agregar */}
          <button
            type="button"
            onClick={() => append({ tipo: '', ancho: '', alto: '' })}
            style={{
              padding: '12px 24px',
              border: '2px solid black',
              background: 'white',
              color: 'black',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'black'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = 'black'
            }}
          >
            Agregar
            <ChevronRight size={18} />
          </button>

          {/* Botón Continuar */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={handleContinue}
              style={{
                padding: '16px 48px',
                border: '2px solid black',
                background: 'black',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'black'}
            >
              Continuar
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '32px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            COMPLETA TUS DATOS Y TE COTIZAMOS SIN CARGO!
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <input
                type="text"
                {...register('nombre')}
                placeholder="Nombre completo"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.nombre ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => {
                  if (!errors.nombre) {
                    e.target.style.borderColor = '#d1d5db'
                  }
                }}
              />
              {errors.nombre && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.email ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#d1d5db'
                  }
                }}
              />
              {errors.email && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                {...register('telefono')}
                placeholder="Teléfono"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.telefono ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => {
                  if (!errors.telefono) {
                    e.target.style.borderColor = '#d1d5db'
                  }
                }}
              />
              {errors.telefono && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  {errors.telefono.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px 16px',
              marginBottom: '24px',
              fontSize: '14px',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setStep('productos')}
              style={{
                padding: '12px 24px',
                border: '2px solid #d1d5db',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ca3af'
                e.currentTarget.style.background = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.background = 'white'
              }}
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px 32px',
                border: '2px solid black',
                background: 'black',
                color: 'white',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = '#374151'
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = 'black'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Enviando...
                </>
              ) : (
                <>
                  Recibir Cotización
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
