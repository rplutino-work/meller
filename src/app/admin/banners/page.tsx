'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, X, Save, Loader2 } from 'lucide-react'

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

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

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

  const handleSave = async (banner: Partial<Banner>) => {
    setSaving(true)
    try {
      if (editingBanner?.id) {
        // Actualizar
        await fetch(`/api/banners/${editingBanner.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(banner),
        })
      } else {
        // Crear
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
    if (!confirm('¿Estás seguro de eliminar este banner?')) return

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Banners del Hero</h1>
          <p className="text-gray-500 mt-1">Gestiona los slides del carrusel principal</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true)
            setEditingBanner(emptyBanner as Banner)
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nuevo Banner
        </button>
      </div>

      {/* Lista de banners */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">Orden</div>
          <div className="col-span-2">Imagen</div>
          <div className="col-span-3">Título</div>
          <div className="col-span-3">Subtítulo</div>
          <div className="col-span-1">Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {banners.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            No hay banners creados. ¡Crea el primero!
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50"
            >
              <div className="col-span-1 flex items-center gap-2 text-gray-400">
                <GripVertical size={16} />
                {banner.orden + 1}
              </div>
              <div className="col-span-2">
                <div
                  className="w-20 h-14 bg-cover bg-center rounded-lg border border-gray-200"
                  style={{ backgroundImage: `url(${banner.imagen})` }}
                />
              </div>
              <div className="col-span-3">
                <p className="font-medium text-gray-900 truncate">{banner.titulo}</p>
              </div>
              <div className="col-span-3">
                <p className="text-gray-500 text-sm truncate">{banner.subtitulo}</p>
              </div>
              <div className="col-span-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    banner.activo
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {banner.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleActivo(banner)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={banner.activo ? 'Desactivar' : 'Activar'}
                >
                  {banner.activo ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button
                  onClick={() => {
                    setEditingBanner(banner)
                    setIsCreating(false)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de edición/creación */}
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
    </div>
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isCreating ? 'Nuevo Banner' : 'Editar Banner'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Vista previa de imagen */}
          {formData.imagen && (
            <div
              className="w-full h-48 bg-cover bg-center rounded-xl border border-gray-200"
              style={{ backgroundImage: `url(${formData.imagen})` }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ej: BMW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Imagen *
              </label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo *
            </label>
            <textarea
              value={formData.subtitulo}
              onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Descripción breve del proyecto"
            />
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Características (bullets)
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Agregar característica
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Título del bullet"
                    />
                    <input
                      type="text"
                      value={feature.desc}
                      onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descripción"
                    />
                  </div>
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación (opcional)
              </label>
              <input
                type="text"
                value={formData.ubicacion || ''}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ej: Oficinas BMW en Argentina"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría (opcional)
              </label>
              <input
                type="text"
                value={formData.categoria || ''}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ej: Muy utilizadas en oficinas..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo"
              checked={formData.activo}
              onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="activo" className="text-sm text-gray-700">
              Banner activo (visible en la home)
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.titulo || !formData.subtitulo || !formData.imagen}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={18} />
                Guardar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

