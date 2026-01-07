# 🔍 Diagnóstico de Problemas con Emails

## Problema: No llegan emails a @meleroller.com.ar después del cambio de DNS

Este documento ayuda a diagnosticar por qué los emails no están llegando a las casillas de correo de @meleroller.com.ar.

---

## ⚠️ Importante: Dos Tipos de Emails Diferentes

### 1. **Emails que ENVÍA la aplicación** (Notificaciones del sitio)
- Estos son emails que el sitio web envía cuando alguien completa un formulario
- Se envían **DESDE** el servidor SMTP configurado **HACIA** las casillas de @meleroller.com.ar
- **Configuración:** Variables de entorno SMTP en el servidor

### 2. **Emails que RECIBE el dominio** (Correo general)
- Estos son todos los emails que llegan a @meleroller.com.ar (no solo del sitio)
- Dependen de la configuración DNS (registros MX) del dominio
- **Configuración:** DNS del dominio meleroller.com.ar

---

## 🔧 Diagnóstico Paso a Paso

### Paso 1: Verificar si la aplicación está enviando emails

#### 1.1 Revisar los logs del servidor

Buscar en los logs mensajes como:
```
📧 Intentando enviar email: { from: '...', to: '...', ... }
✅ Email enviado exitosamente: { messageId: '...', ... }
❌ Error enviando email: { error: '...', ... }
```

**Si ves "✅ Email enviado exitosamente":**
- ✅ La aplicación SÍ está enviando los emails correctamente
- ❌ El problema está en la recepción (DNS/servidor de correo)

**Si ves "❌ Error enviando email":**
- ❌ El problema está en la configuración SMTP
- Verificar variables de entorno SMTP

#### 1.2 Verificar variables de entorno SMTP

En el servidor (Vercel, servidor propio, etc.), verificar que existan estas variables:

```env
SMTP_HOST=smtp.gmail.com          # O el servidor SMTP que uses
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com     # Email desde el cual se envía
SMTP_PASS=tu-contraseña-app      # Contraseña de aplicación
SMTP_FROM=noreply@meleroller.com.ar  # Opcional
```

**Si faltan estas variables:**
- ❌ La aplicación no puede enviar emails
- ✅ Agregar las variables de entorno en el panel del servidor

---

### Paso 2: Verificar configuración DNS para recepción de emails

#### 2.1 Verificar registros MX del dominio

Los registros MX (Mail Exchange) indican qué servidor recibe los emails para @meleroller.com.ar.

**Comando para verificar:**
```bash
# En terminal o usar herramientas online como:
# - https://mxtoolbox.com/
# - https://www.whatsmydns.net/#MX/meleroller.com.ar

dig meleroller.com.ar MX
# O
nslookup -type=MX meleroller.com.ar
```

**Qué buscar:**
- Debe haber al menos un registro MX apuntando al servidor de correo
- Ejemplo: `meleroller.com.ar MX 10 mail.meleroller.com.ar`
- El número (10) es la prioridad (menor = mayor prioridad)

**Si NO hay registros MX:**
- ❌ El dominio no está configurado para recibir emails
- ✅ Contactar al proveedor de hosting/DNS para configurar registros MX

#### 2.2 Verificar que el servidor de correo esté funcionando

Si los registros MX apuntan a un servidor específico (ej: `mail.meleroller.com.ar`), verificar:

1. **Que el servidor esté accesible:**
   ```bash
   telnet mail.meleroller.com.ar 25
   # O
   telnet mail.meleroller.com.ar 587
   ```

2. **Que el servidor responda:**
   - Debe mostrar un mensaje de bienvenida del servidor SMTP
   - Si no responde, el servidor puede estar caído o bloqueado por firewall

#### 2.3 Verificar registros SPF (opcional pero recomendado)

Los registros SPF ayudan a prevenir spam y mejoran la entrega de emails.

**Comando:**
```bash
dig meleroller.com.ar TXT | grep spf
```

**Qué buscar:**
- Un registro TXT que contenga `v=spf1 ...`
- Ejemplo: `v=spf1 include:_spf.google.com ~all`

**Si NO hay registro SPF:**
- ⚠️ Los emails pueden ir a spam
- ✅ Agregar registro SPF en el DNS

---

### Paso 3: Verificar configuración del servidor de correo

#### 3.1 Si usas un servicio de correo (Gmail, Outlook, etc.)

**Gmail/Google Workspace:**
- Verificar que el dominio esté verificado en Google Workspace
- Verificar que las casillas de correo existan y estén activas
- Verificar que no haya límites de cuota alcanzados

**Outlook/Office 365:**
- Verificar que el dominio esté verificado en Office 365
- Verificar que las casillas existan en el panel de administración

#### 3.2 Si usas un servidor propio

- Verificar que el servicio de correo esté corriendo
- Verificar logs del servidor de correo (Postfix, Exim, etc.)
- Verificar que el firewall permita conexiones en puertos 25, 587, 993, 995
- Verificar que no haya bloqueos por IP

---

## 🛠️ Soluciones Comunes

### Problema: "No hay configuración SMTP"

**Solución:**
1. Ir al panel del servidor (Vercel, servidor propio, etc.)
2. Agregar variables de entorno SMTP
3. Reiniciar la aplicación

### Problema: "Error de autenticación SMTP"

**Solución:**
1. Verificar que `SMTP_USER` y `SMTP_PASS` sean correctos
2. Si es Gmail, usar "Contraseña de aplicación" (no la contraseña normal)
3. Verificar que la cuenta no tenga 2FA bloqueando el acceso

### Problema: "Emails enviados pero no llegan"

**Solución:**
1. Verificar registros MX del dominio
2. Verificar que el servidor de correo esté funcionando
3. Revisar carpeta de spam en las casillas de destino
4. Verificar que las casillas de correo existan y estén activas

### Problema: "Emails van a spam"

**Solución:**
1. Agregar registro SPF en DNS
2. Agregar registro DKIM (si es posible)
3. Verificar que el dominio no esté en listas negras
4. Usar un servicio de correo profesional (Gmail, Outlook, etc.)

---

## 📋 Checklist de Verificación

- [ ] Variables SMTP configuradas en el servidor
- [ ] Logs muestran "✅ Email enviado exitosamente"
- [ ] Registros MX del dominio configurados correctamente
- [ ] Servidor de correo accesible y funcionando
- [ ] Casillas de correo existen y están activas
- [ ] Registro SPF configurado (opcional pero recomendado)
- [ ] Firewall permite conexiones SMTP
- [ ] Revisar carpeta de spam

---

## 🔗 Herramientas Útiles

- **Verificar DNS:** https://mxtoolbox.com/
- **Verificar SPF:** https://mxtoolbox.com/spf.aspx
- **Verificar blacklist:** https://mxtoolbox.com/blacklists.aspx
- **Test de envío:** https://www.mail-tester.com/

---

## 📞 Contacto para Soporte

Si después de verificar todo lo anterior el problema persiste:

1. **Proveedor de hosting/DNS:** Verificar configuración DNS y servidor de correo
2. **Proveedor de correo:** Si usas Gmail/Outlook, verificar configuración del dominio
3. **Administrador del servidor:** Verificar logs y configuración SMTP

---

## 📝 Notas Técnicas

- Los emails que envía la aplicación son **notificaciones** cuando alguien completa un formulario
- Estos emails se envían **desde** el servidor SMTP configurado **hacia** las casillas configuradas en `/admin/configuracion/formularios`
- El cambio de DNS puede afectar tanto el envío como la recepción de emails
- Es normal que después de cambiar DNS, los emails tarden hasta 48 horas en normalizarse (propagación DNS)


