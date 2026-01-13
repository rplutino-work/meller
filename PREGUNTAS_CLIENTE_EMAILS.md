# 📧 Preguntas para el Cliente - Configuración de Emails

Este documento contiene las preguntas que debes hacerle al cliente para configurar el sistema de emails.

---

## 📋 Información a Solicitar al Cliente

### Pregunta 1: ¿Tienen servicio de correo configurado?

**Opciones posibles:**
- [ ] Gmail personal (gmail.com)
- [ ] Google Workspace (correo profesional con @meleroller.com.ar)
- [ ] Outlook/Office 365
- [ ] Servidor de correo de NIC Argentina
- [ ] Otro proveedor (especificar)
- [ ] No tienen servicio de correo configurado

**Si NO tienen servicio de correo:**
- Recomendar Google Workspace o Outlook/Office 365
- O configurar el servicio de correo de NIC Argentina

---

### Pregunta 2: ¿Qué email quieren usar para ENVIAR las notificaciones?

**Ejemplos:**
- `info@meleroller.com.ar`
- `noreply@meleroller.com.ar`
- `contacto@meleroller.com.ar`
- O cualquier otro email que tengan

**Importante:** Este email debe existir y el cliente debe tener acceso a él.

---

### Pregunta 3: ¿Tienen acceso a la cuenta de correo?

**Necesitamos:**
- Email de la cuenta
- Contraseña (o contraseña de aplicación si es Gmail)
- Acceso al panel de administración (si es Google Workspace u Office 365)

---

### Pregunta 4: ¿Qué emails quieren RECIBIR las notificaciones?

**Ejemplos:**
- `info@meleroller.com.ar`
- `ventas@meleroller.com.ar`
- `admin@meleroller.com.ar`
- O múltiples emails (separados por comas)

**Nota:** Estos emails se configuran en el panel de administración (`/admin/configuracion/formularios`), pero es bueno saberlo de antemano.

---

## 🔧 Configuración según el Proveedor

### Si usan Gmail Personal

**Preguntar:**
1. ¿Qué email de Gmail quieren usar? (ej: `meleroller@gmail.com`)
2. ¿Tienen verificación en 2 pasos activada?
3. ¿Pueden generar una "Contraseña de aplicación"?

**Pasos para el cliente:**
1. Activar verificación en 2 pasos: https://myaccount.google.com/security
2. Generar contraseña de aplicación: https://myaccount.google.com/apppasswords
3. Compartir la contraseña de aplicación (16 caracteres)

**Variables a configurar:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=meleroller@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # Contraseña de aplicación
SMTP_FROM=noreply@meleroller.com.ar
```

---

### Si usan Google Workspace

**Preguntar:**
1. ¿Tienen Google Workspace configurado para @meleroller.com.ar?
2. ¿Qué email quieren usar para enviar? (ej: `info@meleroller.com.ar`)
3. ¿Tienen acceso al panel de administración de Google Workspace?
4. ¿Pueden generar una contraseña de aplicación?

**Pasos para el cliente:**
1. Activar verificación en 2 pasos en la cuenta de Google Workspace
2. Generar contraseña de aplicación: https://myaccount.google.com/apppasswords
3. Compartir la contraseña de aplicación

**Variables a configurar:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=xxxx xxxx xxxx xxxx  # Contraseña de aplicación
SMTP_FROM=info@meleroller.com.ar
```

---

### Si usan Outlook/Office 365

**Preguntar:**
1. ¿Qué email de Outlook quieren usar? (ej: `info@meleroller.com.ar`)
2. ¿Tienen la contraseña de la cuenta?
3. ¿Tienen acceso al panel de administración de Office 365?

**Variables a configurar:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=contraseña-de-la-cuenta
SMTP_FROM=info@meleroller.com.ar
```

---

### Si usan Servidor de Correo de NIC

**Preguntar:**
1. ¿Tienen servicio de correo contratado con NIC?
2. ¿Cuál es el servidor SMTP? (ej: `mail.meleroller.com.ar` o `smtp.meleroller.com.ar`)
3. ¿Qué puerto usan? (normalmente 587 o 465)
4. ¿Qué email quieren usar para enviar?
5. ¿Cuál es la contraseña de ese email?

**Variables a configurar:**
```env
SMTP_HOST=mail.meleroller.com.ar  # O el que indique NIC
SMTP_PORT=587  # O 465, verificar con NIC
SMTP_SECURE=false  # true si es puerto 465
SMTP_USER=info@meleroller.com.ar
SMTP_PASS=contraseña-del-email
SMTP_FROM=info@meleroller.com.ar
```

**Nota:** Si no tienen estos datos, deben contactar a NIC Argentina para obtenerlos.

---

### Si NO tienen servicio de correo configurado

**Recomendaciones:**

1. **Google Workspace (Recomendado):**
   - Costo: ~$6 USD/mes por usuario
   - Email profesional: @meleroller.com.ar
   - Fácil de configurar
   - Buena entrega de emails

2. **Outlook/Office 365:**
   - Costo: ~$6 USD/mes por usuario
   - Email profesional: @meleroller.com.ar
   - Integración con Microsoft

3. **Servicio de correo de NIC:**
   - Contactar a NIC Argentina para contratar el servicio
   - Precio variable según el plan

4. **Gmail Personal (Temporal):**
   - Gratis
   - Puede usarse mientras configuran un servicio profesional
   - Límite de 500 emails/día

---

## 📝 Plantilla de Email para el Cliente

Puedes copiar y pegar esto en un email al cliente:

```
Hola [Nombre del Cliente],

Para configurar el sistema de notificaciones por email del sitio web, necesito la siguiente información:

1. ¿Tienen servicio de correo configurado? (Gmail, Google Workspace, Outlook, NIC, etc.)

2. ¿Qué email quieren usar para ENVIAR las notificaciones?
   (Ejemplo: info@meleroller.com.ar o meleroller@gmail.com)

3. ¿Tienen acceso a esa cuenta de correo?
   - Si es Gmail: ¿Pueden generar una "Contraseña de aplicación"?
   - Si es otro: ¿Tienen la contraseña?

4. ¿Qué emails quieren RECIBIR las notificaciones cuando alguien complete un formulario?
   (Ejemplo: info@meleroller.com.ar, ventas@meleroller.com.ar)

Si usan Gmail o Google Workspace, necesitarán:
- Activar verificación en 2 pasos
- Generar una "Contraseña de aplicación" desde: https://myaccount.google.com/apppasswords
- Compartirme esa contraseña de aplicación

Si usan otro proveedor, necesitaré:
- Servidor SMTP (ej: smtp.gmail.com, smtp.office365.com)
- Puerto (normalmente 587 o 465)
- Email y contraseña

Si NO tienen servicio de correo configurado, puedo ayudarlos a configurar Google Workspace o contactar a NIC Argentina.

Quedo a la espera de esta información para completar la configuración.

Saludos,
[Tu nombre]
```

---

## ✅ Checklist de Configuración

Una vez que tengas los datos del cliente:

- [ ] Obtener información del proveedor de correo
- [ ] Obtener email y contraseña (o contraseña de aplicación)
- [ ] Obtener servidor SMTP y puerto (si aplica)
- [ ] Configurar variables de entorno en Vercel/servidor
- [ ] Configurar emails destino en `/admin/configuracion/formularios`
- [ ] Probar envío con `npm run test-email`
- [ ] Verificar que los emails lleguen correctamente

---

## 🔒 Seguridad - Información Sensible

**IMPORTANTE:** La contraseña de aplicación o contraseña del email es información sensible.

**Recomendaciones:**
- No compartir por email sin encriptar
- Usar un método seguro para compartir (ej: mensaje privado, llamada)
- Una vez configurado, no guardar en texto plano
- Si es posible, usar contraseñas de aplicación (más seguras que contraseñas normales)

---

## 📞 Contactos Útiles

- **NIC Argentina:** https://nic.ar/
- **Google Workspace:** https://workspace.google.com/
- **Office 365:** https://www.microsoft.com/microsoft-365

---

## 🆘 Si el Cliente No Tiene los Datos

Si el cliente no tiene los datos o no sabe cómo obtenerlos:

1. **Para Gmail/Google Workspace:**
   - Guiarlos paso a paso para generar la contraseña de aplicación
   - Enviarles capturas de pantalla si es necesario

2. **Para NIC:**
   - Pedirles que contacten a NIC Argentina
   - Solicitar específicamente: servidor SMTP, puerto, email y contraseña

3. **Para otros proveedores:**
   - Pedirles que contacten al proveedor de correo
   - Solicitar la documentación de configuración SMTP

---

## 📚 Documentación Adicional

Una vez que tengas los datos, consulta:
- `CONFIGURACION_EMAILS_NIC.md` - Guía completa de configuración
- `README.md` - Instrucciones generales del proyecto

