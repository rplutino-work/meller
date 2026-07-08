import { unstable_cache } from 'next/cache'
import { prisma } from './prisma'

export const getCachedBanners = unstable_cache(
  async () => {
    const banners = await prisma.heroBanner.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
    })
    return banners.map(b => ({ ...b, features: JSON.parse(b.features || '[]') }))
  },
  ['banners'],
  { tags: ['banners'], revalidate: 300 }
)

export const getCachedConfigByKey = unstable_cache(
  async (clave: string) => {
    return prisma.configuracion.findUnique({ where: { clave } })
  },
  ['configuracion'],
  { tags: ['configuracion'], revalidate: 300 }
)

export const getCachedConfigAll = unstable_cache(
  async () => {
    return prisma.configuracion.findMany({ where: { activo: true } })
  },
  ['configuracion-all'],
  { tags: ['configuracion'], revalidate: 300 }
)

export const getCachedFormConfig = unstable_cache(
  async (nombre: string) => {
    return prisma.configuracionFormulario.findUnique({
      where: { nombreFormulario: nombre },
    })
  },
  ['form-config'],
  { tags: ['form-config'], revalidate: 300 }
)

export const getCachedFormConfigAll = unstable_cache(
  async () => {
    return prisma.configuracionFormulario.findMany({
      orderBy: { nombreFormulario: 'asc' },
    })
  },
  ['form-config-all'],
  { tags: ['form-config'], revalidate: 300 }
)
