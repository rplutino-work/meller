# 📧 Guía de Configuración de Emails - Next.js y NIC

## ⚠️ Importante: Dos Configuraciones Diferentes

Hay **DOS cosas diferentes** que configurar:

1. **Configuración SMTP en Next.js/Vercel** → Para que la aplicación **ENVÍE** emails
2. **Configuración DNS en NIC** → Para que el dominio **RECIBA** emails

---

## 1️⃣ Configuración en Next.js/Vercel (ENVÍO de emails)

### ¿Dónde configurar?

**Si estás usando Vercel:**
1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Agrega las siguientes variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
SMTP_FROM=noreply@meleroller.com.ar
```

**Si estás usando otro servidor:**
- Agrega estas variables en el archivo `.env` del servidor
- O en el panel de configuración de variables de entorno del hosting

### Opciones de Servidor SMTP

#### Opción A: Gmail (Recomendado para empezar)

1. **Activar verificación en 2 pasos:**
   - Ve a [Google Account](https://myaccount.google.com/)
   - Seguridad → Verificación en 2 pasos → Activar

2. **Generar contraseña de aplicación:**
   - Ve a [App Passwords](https://myaccount.google.com/apppasswords)
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Escribe "MeleRoller" y genera la contraseña
   - **Copia esa contraseña** (16 caracteres sin espacios)

3. **Configurar variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # La contraseña de aplicación (sin espacios)
SMTP_FROM=noreply@meleroller.com.ar
```

#### Opción B: Google Workspace (Email profesional)

Si tienes Google Workspace con `@meleroller.com.ar`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=contraseña-de-aplicación
SMTP_FROM=info@meleroller.com.ar
```

#### Opción C: Outlook/Office 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-contraseña
SMTP_FROM=noreply@meleroller.com.ar
```

#### Opción D: Servidor SMTP de NIC

Si NIC te proporciona un servidor SMTP:

```env
SMTP_HOST=mail.meleroller.com.ar  # O el servidor que te indique NIC
SMTP_PORT=587  # O 465, verificar con NIC
SMTP_SECURE=false  # O true si es puerto 465
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=tu-contraseña-de-email
SMTP_FROM=info@meleroller.com.ar
```

### Después de configurar

1. **Reinicia el servidor/despliegue:**
   - En Vercel: Ve a Deployments → Redeploy
   - En servidor propio: Reinicia el proceso de Next.js

2. **Prueba enviando un formulario:**
   - Completa el formulario de "Solicitar visita" en el sitio
   - Revisa los logs del servidor para ver si hay errores

---

## 2️⃣ Configuración en NIC (RECEPCIÓN de emails)

### ¿Qué configurar en NIC?

Los **registros MX** (Mail Exchange) le dicen al mundo dónde enviar los emails para `@meleroller.com.ar`.

### Paso 1: Acceder al panel de NIC

1. Ve al panel de administración de NIC Argentina
2. Busca la sección de "DNS" o "Zona DNS" para `meleroller.com.ar`

### Paso 2: Configurar registros MX

Necesitas agregar registros MX que apunten al servidor de correo.

#### Si usas Google Workspace:

```
Tipo: MX
Nombre: @ (o meleroller.com.ar)
Prioridad: 1
Valor: aspmx.l.google.com

Tipo: MX
Nombre: @
Prioridad: 5
Valor: alt1.aspmx.l.google.com

Tipo: MX
Nombre: @
Prioridad: 5
Valor: alt2.aspmx.l.google.com

Tipo: MX
Nombre: @
Prioridad: 10
Valor: alt3.aspmx.l.google.com

Tipo: MX
Nombre: @
Prioridad: 10
Valor: alt4.aspmx.l.google.com
```

#### Si usas Outlook/Office 365:

```
Tipo: MX
Nombre: @
Prioridad: 0
Valor: meleroller-com-ar.mail.protection.outlook.com
```

#### Si usas el servidor de correo de NIC:

```
Tipo: MX
Nombre: @
Prioridad: 10
Valor: mail.meleroller.com.ar
```

(El valor exacto te lo debe proporcionar NIC)

### Paso 3: Configurar registro SPF (Recomendado)

El registro SPF ayuda a prevenir que tus emails vayan a spam.

#### Si usas Gmail/Google Workspace:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:_spf.google.com ~all
```

#### Si usas Outlook/Office 365:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 include:spf.protection.outlook.com ~all
```

#### Si usas servidor propio:

```
Tipo: TXT
Nombre: @
Valor: v=spf1 mx ~all
```

### Paso 4: Verificar propagación DNS

Después de configurar, espera 15-60 minutos y verifica:

1. **Verificar MX:**
   - Ve a https://mxtoolbox.com/
   - Ingresa `meleroller.com.ar`
   - Verifica que aparezcan los registros MX que configuraste

2. **Verificar SPF:**
   - Ve a https://mxtoolbox.com/spf.aspx
   - Ingresa `meleroller.com.ar`
   - Verifica que el registro SPF esté correcto

---

## 🔍 Diagnóstico: ¿Dónde está el problema?

### Paso 1: Verificar si la aplicación está enviando emails

**Revisa los logs del servidor:**

En Vercel:
1. Ve a tu proyecto → Deployments → Click en el último deployment
2. Ve a la pestaña "Functions" o "Logs"
3. Busca mensajes que empiecen con:
   - `📧 Intentando enviar email`
   - `✅ Email enviado exitosamente`
   - `❌ Error enviando email`

**Si ves "✅ Email enviado exitosamente":**
- ✅ La aplicación SÍ está enviando emails
- ❌ El problema está en la RECEPCIÓN (DNS/servidor de correo)
- → Verifica la configuración DNS en NIC

**Si ves "❌ Error enviando email":**
- ❌ El problema está en la configuración SMTP
- → Verifica las variables de entorno en Vercel/servidor

**Si ves "⚠️ No hay configuración SMTP":**
- ❌ Faltan las variables de entorno
- → Agrega las variables SMTP en Vercel/servidor

### Paso 2: Verificar configuración SMTP

Ejecuta el script de diagnóstico:

```bash
npm run test-email
```

O manualmente, verifica que estas variables existan:
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`

### Paso 3: Verificar recepción de emails

1. **Verifica que las casillas existan:**
   - Si usas Google Workspace: Verifica en el panel de administración
   - Si usas Outlook: Verifica en el panel de Office 365
   - Si usas servidor propio: Verifica que las cuentas estén creadas

2. **Revisa la carpeta de spam:**
   - A veces los emails llegan pero van a spam
   - Marca como "No es spam" si los encuentras

3. **Verifica los registros MX:**
   - Usa https://mxtoolbox.com/ para verificar que los MX estén correctos

---

## 🛠️ Soluciones Comunes

### Problema: "No hay configuración SMTP"

**Solución:**
1. Ve a Vercel → Settings → Environment Variables
2. Agrega todas las variables SMTP
3. Redeploya la aplicación

### Problema: "Error de autenticación SMTP"

**Solución:**
1. Si es Gmail: Usa "Contraseña de aplicación", no tu contraseña normal
2. Verifica que `SMTP_USER` y `SMTP_PASS` sean correctos
3. Si tienes 2FA activado, asegúrate de usar contraseña de aplicación

### Problema: "Emails enviados pero no llegan"

**Solución:**
1. Verifica los registros MX en NIC
2. Verifica que las casillas de correo existan
3. Revisa la carpeta de spam
4. Espera hasta 48 horas (propagación DNS)

### Problema: "Emails van a spam"

**Solución:**
1. Agrega registro SPF en NIC
2. Verifica que el dominio no esté en listas negras
3. Usa un servicio profesional (Gmail Workspace, Outlook)

---

## 📋 Checklist de Verificación

### En Next.js/Vercel:
- [ ] Variables SMTP configuradas (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`)
- [ ] Aplicación redeployada después de agregar variables
- [ ] Logs muestran "✅ Email enviado exitosamente"
- [ ] Email destino configurado en `/admin/configuracion/formularios`

### En NIC:
- [ ] Registros MX configurados y apuntando al servidor correcto
- [ ] Registro SPF configurado (opcional pero recomendado)
- [ ] Propagación DNS verificada (usar mxtoolbox.com)
- [ ] Casillas de correo creadas y activas

### General:
- [ ] Revisada carpeta de spam
- [ ] Probado enviando un formulario desde el sitio
- [ ] Verificados logs del servidor

---

## 🔗 Herramientas Útiles

- **Verificar DNS/MX:** https://mxtoolbox.com/
- **Verificar SPF:** https://mxtoolbox.com/spf.aspx
- **Test de envío:** https://www.mail-tester.com/
- **Verificar blacklist:** https://mxtoolbox.com/blacklists.aspx

---

## 📞 Contacto para Soporte

Si después de seguir esta guía el problema persiste:

1. **Para configuración SMTP:** Contacta al administrador del servidor/hosting
2. **Para configuración DNS:** Contacta a NIC Argentina
3. **Para configuración de correo:** Contacta al proveedor (Google Workspace, Outlook, etc.)

---

## 📝 Notas Importantes

- Los emails que envía la aplicación son **notificaciones** cuando alguien completa un formulario
- Estos emails se envían **desde** el servidor SMTP configurado **hacia** las casillas configuradas en `/admin/configuracion/formularios`
- El cambio de DNS puede tardar hasta 48 horas en propagarse completamente
- Si cambias las variables SMTP, debes redeployar la aplicación para que surtan efecto

