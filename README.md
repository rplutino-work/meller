# MeleRoller - Sitio Web y Panel de Administración

Réplica del sitio web [meleroller.com.ar](https://www.meleroller.com.ar/) con panel de administración para gestionar formularios y solicitudes.

## 🚀 Tecnologías

- **Frontend:** Next.js 16, React, TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Base de datos:** SQLite con Prisma ORM
- **Autenticación:** NextAuth.js
- **Formularios:** React Hook Form + Zod
- **Iconos:** Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Crear base de datos
npx prisma migrate dev

# Sembrar datos iniciales (usuario admin y ejemplos)
npx ts-node scripts/seed.ts

# Iniciar servidor de desarrollo
npm run dev
```

## 🔐 Acceso al Panel de Administración

URL: `http://localhost:3000/admin`

**Credenciales de demo:**
- Email: `admin@meleroller.com.ar`
- Contraseña: `admin123`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (public)/           # Páginas públicas
│   │   ├── page.tsx        # Home
│   │   ├── blackout/       # Productos
│   │   ├── sunscreen/
│   │   ├── romanas/
│   │   ├── orientales/
│   │   ├── tradicionales/
│   │   ├── eclipse/
│   │   ├── bandas-verticales/
│   │   ├── sillones/
│   │   ├── toldos/
│   │   └── contacto/
│   ├── admin/              # Panel de administración
│   │   ├── page.tsx        # Dashboard
│   │   ├── visitas/        # Gestión de visitas
│   │   ├── presupuestos/   # Gestión de presupuestos
│   │   ├── configuracion/  # Configuración
│   │   └── login/
│   └── api/                # API Routes
│       ├── auth/
│       └── solicitudes/
├── components/
│   ├── layout/             # Header, Footer
│   ├── home/               # Componentes del home
│   ├── forms/              # Formularios
│   └── modals/             # Modales
├── lib/
│   └── prisma.ts
└── auth.ts
```

## ✨ Funcionalidades

### Sitio Público
- ✅ Página principal con slider de proyectos
- ✅ Páginas de productos (BlackOut, SunScreen, etc.)
- ✅ Formulario de solicitud de visita
- ✅ Cotizador online
- ✅ Modal "Cómo medir tu ventana"
- ✅ Diseño responsive
- ✅ Animaciones y transiciones

### Panel de Administración
- ✅ Dashboard con estadísticas
- ✅ Gestión de solicitudes de visita
- ✅ Gestión de solicitudes de presupuesto
- ✅ Cambio de estado (Pendiente → En proceso → Completado)
- ✅ Exportar a CSV
- ✅ Filtros y búsqueda
- ✅ Contacto directo por WhatsApp/Email
- ✅ Configuración de formularios

## 🖼️ Imágenes

Agregar las imágenes en las siguientes carpetas:

```
public/images/
├── projects/
│   ├── bmw.jpg
│   ├── embajada.jpg
│   ├── fontenla.jpg
│   ├── boom.jpg
│   └── nordelta.jpg
└── products/
    ├── blackout.jpg
    ├── blackout-hero.jpg
    ├── sunscreen.jpg
    ├── sunscreen-hero.jpg
    ├── romanas.jpg
    ├── orientales.jpg
    ├── tradicionales.jpg
    ├── eclipse.jpg
    ├── bandas.jpg
    └── toldos.jpg
```

## 📝 Licencia

Este proyecto es una réplica con fines educativos y de desarrollo freelance.

## 🤝 Contacto

Para consultas sobre el desarrollo: [tu-email@ejemplo.com]
