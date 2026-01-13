# ⚙️ Cómo Configurar las Variables de Email

Esta guía te explica paso a paso cómo configurar las variables de entorno SMTP una vez que tengas los datos del cliente.

---

## 📍 Dónde Configurar

### Si estás usando Vercel (Recomendado)

1. **Acceder al panel de Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta
   - Selecciona el proyecto `meleroller`

2. **Ir a Settings:**
   - En el menú lateral, haz clic en **Settings**
   - Luego haz clic en **Environment Variables**

3. **Agregar variables:**
   - Haz clic en el botón **Add New**
   - Agrega cada variable una por una (ver sección abajo)
   - Selecciona los entornos: **Production**, **Preview**, **Development**
   - Haz clic en **Save**

4. **Redeployar:**
   - Ve a la pestaña **Deployments**
   - Haz clic en los tres puntos (⋯) del último deployment
   - Selecciona **Redeploy**
   - O simplemente haz un nuevo commit y push

---

### Si estás usando otro servidor/hosting

**Opción A: Archivo .env en el servidor**

1. Conecta al servidor por SSH
2. Ve a la carpeta del proyecto
3. Edita o crea el archivo `.env`
4. Agrega las variables (ver sección abajo)
5. Reinicia el servidor/aplicación

**Opción B: Panel de control del hosting**

1. Accede al panel de control de tu hosting
2. Busca la sección "Variables de Entorno" o "Environment Variables"
3. Agrega las variables una por una
4. Guarda y reinicia la aplicación

---

## 🔧 Variables a Configurar

### Variables Obligatorias

Agrega estas 3 variables como mínimo:

```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=xxxx xxxx xxxx xxxx
```

### Variables Opcionales (pero recomendadas)

```env
SMTP_PORT=587
SMTP_SECURE=false
SMTP_FROM=noreply@meleroller.com.ar
```

---

## 📝 Ejemplos de Configuración

### Ejemplo 1: Gmail Personal

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=meleroller@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=noreply@meleroller.com.ar
```

**Nota:** `SMTP_PASS` es la contraseña de aplicación (16 caracteres, puede tener espacios).

---

### Ejemplo 2: Google Workspace

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=info@meleroller.com.ar
```

---

### Ejemplo 3: Outlook/Office 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=contraseña123
SMTP_FROM=info@meleroller.com.ar
```

---

### Ejemplo 4: Servidor de NIC

```env
SMTP_HOST=mail.meleroller.com.ar
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=contraseña123
SMTP_FROM=info@meleroller.com.ar
```

**Nota:** El `SMTP_HOST` y `SMTP_PORT` pueden variar. Verificar con NIC.

---

## 🔍 Cómo Agregar Variables en Vercel (Paso a Paso)

### Paso 1: Acceder a Environment Variables

1. Ve a tu proyecto en Vercel
2. Haz clic en **Settings** (en el menú superior)
3. Haz clic en **Environment Variables** (en el menú lateral)

### Paso 2: Agregar SMTP_HOST

1. Haz clic en **Add New**
2. **Key:** `SMTP_HOST`
3. **Value:** `smtp.gmail.com` (o el servidor que corresponda)
4. Selecciona los entornos: ✅ Production, ✅ Preview, ✅ Development
5. Haz clic en **Save**

### Paso 3: Agregar SMTP_PORT

1. Haz clic en **Add New**
2. **Key:** `SMTP_PORT`
3. **Value:** `587` (o el puerto que corresponda)
4. Selecciona los entornos
5. Haz clic en **Save**

### Paso 4: Agregar SMTP_SECURE

1. Haz clic en **Add New**
2. **Key:** `SMTP_SECURE`
3. **Value:** `false` (o `true` si es puerto 465)
4. Selecciona los entornos
5. Haz clic en **Save**

### Paso 5: Agregar SMTP_USER

1. Haz clic en **Add New**
2. **Key:** `SMTP_USER`
3. **Value:** `info@meleroller.com.ar` (o el email que corresponda)
4. Selecciona los entornos
5. Haz clic en **Save**

### Paso 6: Agregar SMTP_PASS

1. Haz clic en **Add New**
2. **Key:** `SMTP_PASS`
3. **Value:** `xxxx xxxx xxxx xxxx` (la contraseña de aplicación o contraseña)
4. Selecciona los entornos
5. Haz clic en **Save**

**⚠️ IMPORTANTE:** Esta es información sensible. Asegúrate de no compartirla públicamente.

### Paso 7: Agregar SMTP_FROM (Opcional)

1. Haz clic en **Add New**
2. **Key:** `SMTP_FROM`
3. **Value:** `noreply@meleroller.com.ar` (o el email que corresponda)
4. Selecciona los entornos
5. Haz clic en **Save**

### Paso 8: Verificar Variables

Deberías ver una lista como esta:

```
✅ SMTP_HOST = smtp.gmail.com
✅ SMTP_PORT = 587
✅ SMTP_SECURE = false
✅ SMTP_USER = info@meleroller.com.ar
✅ SMTP_PASS = [hidden]
✅ SMTP_FROM = noreply@meleroller.com.ar
```

### Paso 9: Redeployar

1. Ve a la pestaña **Deployments**
2. Haz clic en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. Espera a que termine el deployment

**O simplemente:**
- Haz un commit y push a tu repositorio
- Vercel desplegará automáticamente con las nuevas variables

---

## ✅ Verificar que Funciona

### Opción 1: Usar el Script de Prueba

```bash
npm run test-email
```

Este script:
- Verifica que las variables estén configuradas
- Envía un email de prueba
- Muestra errores si algo falla

### Opción 2: Probar desde el Sitio

1. Ve al sitio web
2. Completa el formulario de "Solicitar visita"
3. Revisa los logs de Vercel para ver si hay errores
4. Verifica que el email llegue a la casilla configurada

### Opción 3: Revisar Logs de Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en **Deployments**
3. Haz clic en el último deployment
4. Ve a la pestaña **Functions** o **Logs**
5. Busca mensajes que empiecen con:
   - `📧 Intentando enviar email`
   - `✅ Email enviado exitosamente`
   - `❌ Error enviando email`

---

## 🐛 Solución de Problemas

### Error: "No hay configuración SMTP"

**Problema:** Faltan variables de entorno

**Solución:**
1. Verifica que todas las variables estén agregadas en Vercel
2. Asegúrate de haber redeployado después de agregar las variables
3. Verifica que las variables estén en los entornos correctos (Production, Preview, Development)

---

### Error: "Error de autenticación SMTP"

**Problema:** `SMTP_USER` o `SMTP_PASS` incorrectos

**Solución:**
1. Verifica que `SMTP_USER` sea el email correcto
2. Si es Gmail, asegúrate de usar una "Contraseña de aplicación", no la contraseña normal
3. Verifica que `SMTP_PASS` no tenga espacios extra al inicio o final
4. Si es Gmail, regenera la contraseña de aplicación

---

### Error: "Error de conexión"

**Problema:** `SMTP_HOST` o `SMTP_PORT` incorrectos

**Solución:**
1. Verifica que `SMTP_HOST` sea correcto:
   - Gmail: `smtp.gmail.com`
   - Outlook: `smtp.office365.com`
   - NIC: el que te haya dado NIC
2. Verifica que `SMTP_PORT` sea correcto:
   - Normalmente `587` para TLS
   - O `465` para SSL (entonces `SMTP_SECURE=true`)

---

### Emails enviados pero no llegan

**Problema:** Configuración DNS o casilla de correo

**Solución:**
1. Verifica que la casilla de correo destino exista
2. Revisa la carpeta de spam
3. Verifica los registros MX en NIC (ver `CONFIGURACION_EMAILS_NIC.md`)

---

## 📋 Checklist Final

- [ ] Variables agregadas en Vercel/servidor
- [ ] Variables en los entornos correctos (Production, Preview, Development)
- [ ] Aplicación redeployada
- [ ] Script de prueba ejecutado (`npm run test-email`)
- [ ] Email de prueba recibido
- [ ] Formulario del sitio probado
- [ ] Emails destino configurados en `/admin/configuracion/formularios`

---

## 📚 Documentación Relacionada

- `PREGUNTAS_CLIENTE_EMAILS.md` - Qué preguntar al cliente
- `CONFIGURACION_EMAILS_NIC.md` - Guía completa de configuración
- `README.md` - Instrucciones generales

---

## 🔒 Seguridad

**IMPORTANTE:**
- Las variables de entorno en Vercel están encriptadas
- No compartas `SMTP_PASS` públicamente
- Si necesitas compartirla, usa un método seguro (mensaje privado, llamada)
- Considera rotar las contraseñas periódicamente

