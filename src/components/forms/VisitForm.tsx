'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'

const visitSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  direccion: z.string().optional(),
  localidad: z.string().optional(),
  mensaje: z.string().optional(),
})

type VisitFormData = z.infer<typeof visitSchema>

interface VisitFormProps {
  variant?: 'full' | 'simple' | 'contact'
}

export default function VisitForm({ variant = 'full' }: VisitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('Nos pondremos en contacto para coordinar la visita de nuestro decorador.')

  useEffect(() => {
    // Cargar mensaje de éxito desde la configuración
    fetch('/api/configuracion-formulario?nombre=visita')
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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VisitFormData>({
    resolver: zodResolver(visitSchema),
  })

  const onSubmit = async (data: VisitFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/solicitudes/visita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar la solicitud')
      }

      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Hubo un error al enviar tu solicitud. Por favor, intentá de nuevo.')
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
        <h3 className="text-[24px] font-serif mb-2">¡Solicitud enviada!</h3>
        <p className="text-gray-600">
          {successMessage}
        </p>
      </motion.div>
    )
  }

  // Contact variant - exact match to original site
  if (variant === 'contact') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'block' }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            {...register('nombre')}
            style={{
              width: '457.5px',
              padding: '10px 16px',
              border: '0.67px solid #aaa',
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              backgroundColor: '#fff',
              color: '#000',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            placeholder="Nombre"
            required
          />
          {errors.nombre && (
            <p style={{ color: '#f00', fontSize: '12px', marginTop: '5px' }}>{errors.nombre.message}</p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="tel"
            {...register('telefono')}
            style={{
              width: '457.5px',
              padding: '10px 16px',
              border: '0.67px solid #aaa',
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              backgroundColor: '#fff',
              color: '#000',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            placeholder="Teléfono"
          />
          {errors.telefono && (
            <p style={{ color: '#f00', fontSize: '12px', marginTop: '5px' }}>{errors.telefono.message}</p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            {...register('email')}
            style={{
              width: '457.5px',
              padding: '10px 16px',
              border: '0.67px solid #aaa',
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              backgroundColor: '#fff',
              color: '#000',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p style={{ color: '#f00', fontSize: '12px', marginTop: '5px' }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            {...register('mensaje')}
            rows={4}
            style={{
              width: '457.5px',
              padding: '10px 16px',
              border: '0.67px solid #aaa',
              fontSize: '20px',
              fontFamily: 'Oswald, sans-serif',
              backgroundColor: '#fff',
              color: '#000',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box'
            }}
            placeholder="Mensaje"
            required
          />
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', marginBottom: '15px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <br />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '457.5px',
            padding: '30px 16px',
            border: '4.67px solid #000',
            fontSize: '20px',
            fontFamily: 'Oswald, sans-serif',
            backgroundColor: '#fff',
            color: '#000',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase',
            fontWeight: 400,
            display: 'block',
            boxSizing: 'border-box',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
            }
          }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    )
  }

  // Simple variant - like the original site
  if (variant === 'simple') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-0 max-w-[500px]">
        <div>
          <input
            type="text"
            {...register('nombre')}
            className="w-full px-5 py-5 border border-gray-300 bg-white text-[16px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 text-[12px] mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            {...register('telefono')}
            className="w-full px-5 py-5 border border-gray-300 border-t-0 bg-white text-[16px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="Teléfono"
          />
          {errors.telefono && (
            <p className="text-red-500 text-[12px] mt-1">{errors.telefono.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register('email')}
            className="w-full px-5 py-5 border border-gray-300 border-t-0 bg-white text-[16px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('mensaje')}
            rows={2}
            className="w-full px-5 py-5 border border-gray-300 border-t-0 bg-white text-[16px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
            placeholder="Mensaje"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 text-[13px]">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-black text-white text-[14px] uppercase tracking-[0.25em] font-normal hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </form>
    )
  }

  // Full variant - with more fields
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-[13px] text-gray-500 mb-6">
        Presidente Juan Domingo Perón 1154 - Burzaco - Buenos Aires - Argentina
      </p>
      <p className="text-[13px] text-gray-500 mb-8">
        Horario de Atención: Lunes a Viernes de 8.00 a 12.00 hs. y de 13.30 a 17.00 hs.
      </p>
      <p className="text-[13px] text-gray-500 mb-8">
        Visitas al Showroom con cita previa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            {...register('nombre')}
            className="input-field"
            placeholder="Nombre completo *"
          />
          {errors.nombre && (
            <p className="text-red-500 text-[12px] mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register('email')}
            className="input-field"
            placeholder="Email *"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            {...register('telefono')}
            className="input-field"
            placeholder="Teléfono *"
          />
          {errors.telefono && (
            <p className="text-red-500 text-[12px] mt-1">{errors.telefono.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register('localidad')}
            className="input-field"
            placeholder="Localidad"
          />
        </div>
      </div>

      <div>
        <input
          type="text"
          {...register('direccion')}
          className="input-field"
          placeholder="Dirección"
        />
      </div>

      <div>
        <textarea
          {...register('mensaje')}
          rows={3}
          className="input-field resize-none"
          placeholder="Mensaje (opcional)"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 text-[13px]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar'
        )}
      </button>
    </form>
  )
}
