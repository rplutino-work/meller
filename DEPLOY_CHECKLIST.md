# Checklist de Deploy - Meleroller

## ✅ Pre-Deploy Checklist

### 1. Dependencias Actualizadas
- ✅ Next.js actualizado a `16.0.8` (sin vulnerabilidades)
- ✅ eslint-config-next actualizado a `16.0.8`
- ✅ Todas las dependencias sin vulnerabilidades conocidas

### 2. Configuración de Build
- ✅ `package.json` con script `postinstall` para generar Prisma Client
- ✅ `package.json` con script `build` que incluye `prisma generate`
- ✅ `vercel.json` configurado con build command correcto

### 3. Base de Datos
- ✅ Schema de Prisma actualizado con todos los modelos:
  - User
  - SolicitudVisita
  - SolicitudPresupuesto
  - SolicitudContacto
  - ConfiguracionFormulario
  - Configuracion
  - HeroBanner
  - Pago

### 4. Variables de Entorno Requeridas en Vercel

Configura estas variables en Vercel > Settings > Environment Variables:

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
AUTH_SECRET=tu-secret-key-generada
NEXTAUTH_SECRET=tu-secret-key-generada
MERCADOPAGO_ACCESS_TOKEN=APP_USR-tu-access-token
```

**Nota:** `VERCEL_URL` se configura automáticamente por Vercel.

### 5. Archivos de Configuración
- ✅ `vercel.json` - Configuración de build
- ✅ `next.config.ts` - Configuración de Next.js
- ✅ `tsconfig.json` - Configuración de TypeScript
- ✅ `prisma/schema.prisma` - Schema de base de datos

## 🚀 Pasos para Deploy

1. **Push al repositorio**
   ```bash
   git add .
   git commit -m "Preparado para deploy"
   git push
   ```

2. **Conectar a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu proyecto desde GitHub/GitLab/Bitbucket

3. **Configurar Variables de Entorno**
   - Settings > Environment Variables
   - Agrega todas las variables listadas arriba

4. **Deploy**
   - Vercel detectará automáticamente Next.js
   - El build se ejecutará con el comando configurado en `vercel.json`
   - `prisma generate` se ejecutará automáticamente en `postinstall`

5. **Post-Deploy**
   - Configura el webhook de Mercado Pago:
     ```
     https://tu-dominio.vercel.app/api/pagos/mercado-pago/webhook
     ```

## 📝 Notas Importantes

- **Prisma Client**: Se genera automáticamente en `postinstall` y en el build
- **Mercado Pago**: El código detecta automáticamente si está en producción (HTTPS)
- **Base URL**: Vercel configura `VERCEL_URL` automáticamente
- **Webhook**: Solo funciona en producción (HTTPS), no en desarrollo local

## ✅ Verificación Post-Deploy

1. ✅ El sitio carga correctamente
2. ✅ El login del admin funciona
3. ✅ Se pueden crear pagos desde el admin
4. ✅ Los links de pago funcionan
5. ✅ El webhook de Mercado Pago está configurado

