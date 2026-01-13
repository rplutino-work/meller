# 📧 Configurar Google Workspace con Vercel para Emails

Esta guía explica cómo configurar Google Workspace para que Vercel pueda enviar emails usando tu dominio @meleroller.com.ar.

---

## 🔐 Paso 0: Verificar el Dominio en Google Workspace

Cuando configurás Google Workspace, necesitás verificar que sos el dueño del dominio. Google te da varias opciones:

### Opción 1: Método TXT (Recomendado para Vercel)

**Esta es la opción más fácil cuando tu sitio está en Vercel.**

1. En el panel de Google Workspace, cuando te pida verificar el dominio, seleccioná **"Agregar un registro TXT"**
2. Google te dará un código como: `google-site-verification=xxxxxxxxxxxxxxxxxxxxx`
3. Ve al panel de DNS de NIC Argentina
4. Agrega este registro:

```
Tipo: TXT
Nombre: @
Valor: google-site-verification=xxxxxxxxxxxxxxxxxxxxx
```

5. Espera 5-15 minutos para que se propague
6. Volvé a Google Workspace y hacé clic en **"Verificar"**

### Opción 2: Método HTML (Si Google te pide el "host")

Si Google te pregunta por el "host" del dominio:

1. **Host del dominio:** `www.meleroller.com.ar` (o `meleroller.com.ar` si no usás www)
2. **URL completa:** `https://www.meleroller.com.ar` (o `https://meleroller.com.ar`)

**Pero atención:** Para el método HTML, necesitarías subir un archivo a tu sitio. Como está en Vercel, es más complicado. **Mejor usar el método TXT (Opción 1).**

### Opción 3: Método Meta Tag

Si Google te da una meta tag:

1. Necesitarías agregarla al `<head>` de tu sitio
2. Esto requiere modificar el código y redeployar
3. **Recomendación:** Usar el método TXT (Opción 1) que es más simple

---

## ⚠️ Importante: Vercel NO es un "Host" en Google Workspace

**Vercel no necesita aparecer como "host" en Google Workspace.** Lo que necesitás es:

1. **Verificar el dominio** usando el método TXT (ver arriba)
2. **Configurar el servidor SMTP de Google Workspace** en las variables de entorno de Vercel
3. **Opcional:** Configurar registros SPF/DKIM en DNS para mejorar la entrega de emails

---

## 🔧 Configuración Paso a Paso

### Paso 1: Verificar el Dominio (Si aún no lo hiciste)

Si Google Workspace te está pidiendo verificar el dominio:

1. **Seleccioná el método TXT** (no el método HTML)
2. Copiá el código que te da Google
3. Agregalo como registro TXT en NIC Argentina (ver Paso 0 arriba)
4. Espera 5-15 minutos y verificá en Google Workspace

**Si ya verificaste el dominio, pasá al Paso 2.**

---

### Paso 2: Obtener Credenciales de Google Workspace

#### 2.1 Activar Verificación en 2 Pasos

1. Ve a [Google Account](https://myaccount.google.com/)
2. **Seguridad** → **Verificación en 2 pasos**
3. Actívala si no está activada

#### 2.2 Generar Contraseña de Aplicación

1. Ve a [App Passwords](https://myaccount.google.com/apppasswords)
2. Si no aparece, asegúrate de tener verificación en 2 pasos activada
3. Selecciona:
   - **App:** Correo
   - **Device:** Otro (nombre personalizado)
   - Escribe: `Vercel - MeleRoller`
4. Haz clic en **Generar**
5. **Copia la contraseña de 16 caracteres** (guárdala, no la verás de nuevo)

**Ejemplo de contraseña:** `abcd efgh ijkl mnop`

---

### Paso 3: Configurar Variables en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Agrega estas variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=info@meleroller.com.ar
```

**Reemplaza:**
- `info@meleroller.com.ar` por el email que quieras usar
- `abcd efgh ijkl mnop` por la contraseña de aplicación que generaste

4. Selecciona los entornos: ✅ Production, ✅ Preview, ✅ Development
5. Haz clic en **Save** para cada variable

---

### Paso 4: Redeployar en Vercel

1. Ve a **Deployments**
2. Haz clic en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. Espera a que termine

---

### Paso 5: Probar la Configuración

```bash
npm run test-email
```

O simplemente completa un formulario en el sitio y verifica que llegue el email.

---

## 🌐 Configuración DNS (Opcional pero Recomendado)

Para mejorar la entrega de emails y evitar que vayan a spam, podés configurar registros SPF y DKIM.

### Configurar SPF para Google Workspace

El registro SPF ya debería estar configurado si Google Workspace está activo, pero podés verificar:

1. Ve al panel de administración de Google Workspace
2. **Apps** → **Google Workspace** → **Gmail**
3. **Configuración de enrutamiento** → Verifica que el SPF esté configurado

**O manualmente en NIC:**

1. Ve al panel de DNS de NIC Argentina
2. Agrega o verifica este registro TXT:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:_spf.google.com ~all
```

**Nota:** Si ya existe un registro SPF, NO lo reemplaces. En su lugar, agregá `include:_spf.google.com` a la lista existente.

---

### Configurar DKIM (Opcional)

DKIM ayuda a autenticar los emails. Google Workspace lo configura automáticamente:

1. Ve al panel de administración de Google Workspace
2. **Apps** → **Google Workspace** → **Gmail**
3. **Autenticación de email**
4. Busca la sección **DKIM**
5. Haz clic en **Comenzar a autenticar email**
6. Copia el registro TXT que te da Google
7. Agrégalo en el DNS de NIC Argentina

**Ejemplo de registro DKIM:**
```
Tipo: TXT
Nombre: google._domainkey
Valor: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

---

## ✅ Verificar que Funciona

### Opción 1: Script de Prueba

```bash
npm run test-email
```

### Opción 2: Desde el Sitio

1. Completa el formulario de "Solicitar visita"
2. Revisa los logs de Vercel
3. Verifica que el email llegue a la casilla configurada

### Opción 3: Verificar Logs de Vercel

1. Ve a **Deployments** → Último deployment
2. Haz clic en **Functions** o **Logs**
3. Busca mensajes:
   - `📧 Intentando enviar email`
   - `✅ Email enviado exitosamente`
   - `❌ Error enviando email`

---

## 🐛 Problemas Comunes

### Error: "Error de autenticación"

**Causa:** Contraseña incorrecta o no es una contraseña de aplicación

**Solución:**
1. Verifica que estés usando una "Contraseña de aplicación", no tu contraseña normal
2. Regenera la contraseña de aplicación si es necesario
3. Asegúrate de que no tenga espacios extra al copiar

---

### Error: "Error de conexión"

**Causa:** Variables SMTP incorrectas

**Solución:**
1. Verifica que `SMTP_HOST=smtp.gmail.com`
2. Verifica que `SMTP_PORT=587`
3. Verifica que `SMTP_SECURE=false`
4. Verifica que `SMTP_USER` sea el email completo (ej: `info@meleroller.com.ar`)

---

### Emails van a spam

**Causa:** Falta configuración SPF/DKIM

**Solución:**
1. Configura el registro SPF (ver Paso 4)
2. Configura DKIM en Google Workspace (ver Paso 4)
3. Espera 24-48 horas para que se propague

---

## 📋 Checklist

- [ ] Verificación en 2 pasos activada en Google Workspace
- [ ] Contraseña de aplicación generada
- [ ] Variables SMTP agregadas en Vercel
- [ ] Aplicación redeployada
- [ ] Email de prueba enviado y recibido
- [ ] Registro SPF configurado (opcional)
- [ ] DKIM configurado (opcional)

---

## 🔗 Enlaces Útiles

- **Google Workspace Admin:** https://admin.google.com/
- **App Passwords:** https://myaccount.google.com/apppasswords
- **Verificar SPF:** https://mxtoolbox.com/spf.aspx
- **Verificar DKIM:** https://mxtoolbox.com/dkim.aspx

---

## 📝 Notas Importantes

1. **Vercel NO necesita aparecer como "host"** - Solo necesitás configurar las variables SMTP
2. **Usa contraseña de aplicación**, no tu contraseña normal de Google
3. **El email debe existir** en Google Workspace (ej: `info@meleroller.com.ar`)
4. **SPF y DKIM son opcionales** pero mejoran la entrega de emails
5. **Los cambios DNS pueden tardar 24-48 horas** en propagarse

---

## 🆘 Si Necesitas Ayuda

Si después de seguir esta guía aún tienes problemas:

1. Verifica los logs de Vercel para ver el error específico
2. Prueba con `npm run test-email` para ver el error detallado
3. Verifica que el email de Google Workspace esté activo y funcional
4. Contacta al soporte de Google Workspace si el problema es con las credenciales

