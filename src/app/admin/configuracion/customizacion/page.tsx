'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, Save, Loader2, ArrowLeft, X } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Feature {
  title: string
  desc: string
}

interface Banner {
  id: string
  titulo: string
  subtitulo: string
  imagen: string
  features: Feature[]
  ubicacion: string | null
  categoria: string | null
  orden: number
  activo: boolean
}

export default function CustomizacionPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/admin/configuracion"
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Hero Banners</h1>
            <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
              Administra los banners del hero principal del sitio
            </p>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'white',
            color: '#374151',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontWeight: 500,
            fontSize: '14px',
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          Ver sitio
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Guía arriba */}
        <GuidedCard />

        {/* Tabla de banners abajo - 100% width */}
        <BannersManager />
      </div>
    </div>
  )
}

function GuidedCard() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '20px',
      width: '100%'
    }}>
      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0', fontWeight: 600 }}>
        Guía rápida
      </p>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: '0 0 16px 0' }}>Cómo dejar el hero perfecto</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          'Carga imágenes grandes (mínimo 1600px ancho) para evitar pixelado.',
          'Usa títulos cortos y claros (ej: "BMW", "Depto.Boom").',
          'Define 3 bullets breves: título (beneficio) y descripción corta.',
          'Ordena los banners arrastrando el número (1, 2, 3...) para priorizar.',
        ].map((text, index) => (
          <div key={index} style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#1e293b',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              flexShrink: 0
            }}>
              {index + 1}
            </div>
            <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.6' }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SortableBannerRow({ banner, onEdit, onDelete, onToggle }: {
  banner: Banner
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: '80px 140px 200px 250px 120px 180px',
        gap: '16px',
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        alignItems: 'center',
        background: isDragging ? '#f8fafc' : 'white',
        cursor: isDragging ? 'grabbing' : 'grab',
        minWidth: '1000px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px' }}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}>
          <GripVertical size={16} />
        </div>
        {banner.orden + 1}
      </div>
      <div>
        <div
          style={{
            width: '80px',
            height: '56px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            backgroundImage: `url(${banner.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {banner.titulo}
        </p>
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {banner.subtitulo}
        </p>
      </div>
      <div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 500,
          background: banner.activo ? '#d1fae5' : '#f1f5f9',
          color: banner.activo ? '#065f46' : '#64748b'
        }}>
          {banner.activo ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          onClick={onToggle}
          style={{
            padding: '6px',
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
          title={banner.activo ? 'Desactivar' : 'Activar'}
        >
          {banner.activo ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        <button
          onClick={onEdit}
          style={{
            padding: '6px',
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '6px',
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
          title="Eliminar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

function BannersManager() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const emptyBanner: Omit<Banner, 'id'> = {
    titulo: '',
    subtitulo: '',
    imagen: '',
    features: [
      { title: '', desc: '' },
      { title: '', desc: '' },
      { title: '', desc: '' },
    ],
    ubicacion: '',
    categoria: '',
    orden: banners.length,
    activo: true,
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners/admin')
      const data = await res.json()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = banners.findIndex((b) => b.id === active.id)
      const newIndex = banners.findIndex((b) => b.id === over.id)

      const newBanners = arrayMove(banners, oldIndex, newIndex)
      setBanners(newBanners)

      // Actualizar el orden en la BD
      try {
        const updates = newBanners.map((banner, index) => ({
          id: banner.id,
          orden: index,
        }))

        await Promise.all(
          updates.map((update) =>
            fetch(`/api/banners/${update.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orden: update.orden }),
            })
          )
        )
      } catch (error) {
        console.error('Error updating order:', error)
        // Revertir en caso de error
        fetchBanners()
      }
    }
  }

  const handleSave = async (banner: Partial<Banner>) => {
    setSaving(true)
    try {
      if (editingBanner?.id) {
        await fetch(`/api/banners/${editingBanner.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(banner),
        })
      } else {
        await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(banner),
        })
      }
      await fetchBanners()
      setEditingBanner(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Error saving banner:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este banner?')) return
    try {
      await fetch(`/api/banners/${id}`, { method: 'DELETE' })
      await fetchBanners()
    } catch (error) {
      console.error('Error deleting banner:', error)
    }
  }

  const toggleActivo = async (banner: Banner) => {
    try {
      await fetch(`/api/banners/${banner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...banner, activo: !banner.activo }),
      })
      await fetchBanners()
    } catch (error) {
      console.error('Error toggling banner:', error)
    }
  }

  return (
    <>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0', fontWeight: 600 }}>
              Hero
            </p>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>Banners del hero</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Crea, edita y ordena los slides principales.</p>
          </div>
          <button
            onClick={() => {
              setIsCreating(true)
              setEditingBanner(emptyBanner as Banner)
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#1e293b',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={16} />
            Nuevo banner
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>Cargando...</div>
        ) : banners.length === 0 ? (
          <div style={{
            padding: '64px 24px',
            textAlign: 'center',
            background: '#f8fafc'
          }}>
            <p style={{ color: '#475569', fontWeight: 500, fontSize: '16px', margin: '0 0 8px 0' }}>No hay banners creados</p>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Crea el primero para comenzar</p>
          </div>
        ) : (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 140px 200px 250px 120px 180px',
              gap: '16px',
              padding: '12px 20px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '11px',
              fontWeight: 600,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              minWidth: '1000px'
            }}>
              <div>Orden</div>
              <div>Imagen</div>
              <div>Título</div>
              <div>Subtítulo</div>
              <div>Estado</div>
              <div style={{ textAlign: 'right' }}>Acciones</div>
            </div>

            {/* Table Rows with Drag and Drop */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={banners.map(b => b.id)}
                strategy={verticalListSortingStrategy}
              >
                {banners.map((banner) => (
                  <SortableBannerRow
                    key={banner.id}
                    banner={banner}
                    onEdit={() => {
                      setEditingBanner(banner)
                      setIsCreating(false)
                    }}
                    onDelete={() => handleDelete(banner.id)}
                    onToggle={() => toggleActivo(banner)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {(editingBanner || isCreating) && (
          <BannerEditor
            banner={editingBanner || (emptyBanner as Banner)}
            onSave={handleSave}
            onClose={() => {
              setEditingBanner(null)
              setIsCreating(false)
            }}
            isCreating={isCreating}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </>
  )
}

interface BannerEditorProps {
  banner: Banner
  onSave: (banner: Partial<Banner>) => void
  onClose: () => void
  isCreating: boolean
  saving: boolean
}

function BannerEditor({ banner, onSave, onClose, isCreating, saving }: BannerEditorProps) {
  const [formData, setFormData] = useState(banner)

  const handleFeatureChange = (index: number, field: 'title' | 'desc', value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFormData({ ...formData, features: newFeatures })
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: '', desc: '' }],
    })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1
        }}
      >
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f8fafc'
        }}>
          <div>
            <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0', fontWeight: 600 }}>
              {isCreating ? 'Nuevo banner' : 'Editar banner'}
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {formData.titulo || 'Sin título'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {formData.imagen && (
            <div
              style={{
                width: '100%',
                height: '200px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundImage: `url(${formData.imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '24px'
              }}
            />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Título *
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                placeholder="BMW"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                URL de Imagen *
              </label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                placeholder="https://..."
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '8px'
            }}>
              Subtítulo *
            </label>
            <textarea
              value={formData.subtitulo}
              onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '80px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Descripción breve del proyecto"
              rows={2}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151'
              }}>
                Características (bullets)
              </label>
              <button
                type="button"
                onClick={addFeature}
                style={{
                  fontSize: '13px',
                  color: '#3b82f6',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                + Agregar
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      style={{
                        padding: '8px 10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '13px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6'
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb'
                        e.target.style.boxShadow = 'none'
                      }}
                      placeholder="Título del bullet"
                    />
                    <input
                      type="text"
                      value={feature.desc}
                      onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)}
                      style={{
                        padding: '8px 10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '13px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6'
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb'
                        e.target.style.boxShadow = 'none'
                      }}
                      placeholder="Descripción"
                    />
                  </div>
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      style={{
                        padding: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Ubicación (opcional)
              </label>
              <input
                type="text"
                value={formData.ubicacion || ''}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                placeholder="Oficinas BMW en Argentina"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Categoría (opcional)
              </label>
              <input
                type="text"
                value={formData.categoria || ''}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                placeholder="Muy utilizadas en oficinas..."
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, activo: !formData.activo })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#374151'
              }}
            >
              {formData.activo ? <Eye size={18} style={{ color: '#10b981' }} /> : <EyeOff size={18} style={{ color: '#94a3b8' }} />}
              <span>{formData.activo ? 'Activo' : 'Inactivo'}</span>
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: 'white',
              color: '#374151',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.titulo || !formData.subtitulo || !formData.imagen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: saving || !formData.titulo || !formData.subtitulo || !formData.imagen ? '#94a3b8' : '#1e293b',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 500,
              fontSize: '14px',
              cursor: saving || !formData.titulo || !formData.subtitulo || !formData.imagen ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Guardando...
              </>
            ) : (
              <>
                <Save size={18} />
                Guardar
              </>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
