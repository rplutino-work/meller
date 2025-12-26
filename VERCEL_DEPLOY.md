# Guía de Despliegue en Vercel

## Variables de Entorno Requeridas

Configura las siguientes variables de entorno en el panel de Vercel:

### 1. Base de Datos (PostgreSQL)
```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### 2. NextAuth
```
AUTH_SECRET=tu-secret-key-generada
NEXTAUTH_SECRET=tu-secret-key-generada
```

**Para generar un secret key:**
```bash
openssl rand -base64 32
```

### 3. Mercado Pago
```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-tu-access-token
```

### 4. Base URL (Automático - Recomendado)
Vercel configurará automáticamente `VERCEL_URL` con la URL de tu deployment. El código usará esto automáticamente.

**Opcional:** Si necesitas configurarlo manualmente:

```
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
```

**Nota:** El código detecta automáticamente si estás en producción (HTTPS) y solo entonces activa `auto_return` y `notification_url` para Mercado Pago.

## Pasos para Desplegar

1. **Conecta tu repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu proyecto desde GitHub/GitLab/Bitbucket

2. **Configura las variables de entorno**
   - En el panel de Vercel, ve a Settings > Environment Variables
   - Agrega todas las variables listadas arriba

3. **Configura la base de datos**
   - Asegúrate de que tu base de datos PostgreSQL (Neon) esté accesible desde internet
   - Copia la `DATABASE_URL` completa a las variables de entorno

4. **Ejecuta las migraciones de Prisma**
   - El archivo `vercel.json` ya está configurado con el build command correcto
   - Alternativamente, puedes configurarlo en Settings > Build & Development Settings:
   ```
   prisma generate && next build
   ```
   - **Nota:** El script `postinstall` en `package.json` ejecutará `prisma generate` automáticamente después de `npm install`

5. **Configura el Dominio Personalizado (www.meleroller.com.ar)**
   - Ve a Settings > Domains en Vercel
   - Agrega `www.meleroller.com.ar`
   - Sigue las instrucciones de Vercel para configurar los registros DNS
   - Vercel generará automáticamente el SSL
   - Ver guía completa en `DOMAIN_MIGRATION.md`

6. **Configura el Webhook de Mercado Pago**
   - Una vez configurado el dominio, actualiza el webhook con:
   ```
   https://www.meleroller.com.ar/api/pagos/mercado-pago/webhook
   ```
   - Ve a tu panel de Mercado Pago > Webhooks
   - Actualiza la URL del webhook con el nuevo dominio

## Notas Importantes

- **Webhook URL**: Debe ser accesible públicamente. Vercel lo hace automáticamente.
- **Base URL**: Vercel configurará automáticamente `VERCEL_URL`, pero puedes usar `NEXT_PUBLIC_BASE_URL` para mayor control.
- **Mercado Pago Sandbox vs Production**: Asegúrate de usar las credenciales correctas según el ambiente.

## Verificación Post-Deploy

1. Verifica que el sitio carga correctamente
2. Prueba el login del admin
3. Crea un pago de prueba desde el admin
4. Verifica que el link de pago funciona
5. Prueba el webhook de Mercado Pago

