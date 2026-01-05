# Configuración de Mercado Pago - Producción

## ✅ Estado Actual

La integración de Mercado Pago está **completamente configurada para producción**.

### Tipo de Integración
- **Checkout Pro (Redirigido)**: El cliente es redirigido a Mercado Pago para completar el pago
- **Webhooks configurados**: Para recibir notificaciones automáticas de cambios de estado
- **Auto-return activado**: El cliente vuelve automáticamente después de pagar

---

## 🔑 Credenciales de Producción

### Access Token (Production)
```
APP_USR-5081066860585799-122915-a20ed8f49172d4732509a19014ace654-227785348
```

### Public Key (Production)
```
APP_USR-590e953f-336d-4c69-bc9c-05d2261acb79
```

### Application ID
```
5081066860585799
```

---

## 🔑 Credenciales de Prueba (Sandbox)

### Access Token (Test)
```
TEST-5081066860585799-122915-22c255b9f175e1ef7da727cfe5c243e2-227785348
```

### Public Key (Test)
```
TEST-9d8f6a3a-7a08-40b3-8a72-55d10822c3bd
```

---

## 📋 Variables de Entorno Requeridas

Agregar en `.env` o en Vercel:

```env
# Mercado Pago - Producción
MERCADOPAGO_ACCESS_TOKEN=APP_USR-5081066860585799-122915-a20ed8f49172d4732509a19014ace654-227785348

# URL Base del sitio (importante para webhooks y redirects)
NEXT_PUBLIC_BASE_URL=https://www.meleroller.com.ar

# Mercado Pago - Public Key (opcional, para futuras integraciones frontend)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-590e953f-336d-4c69-bc9c-05d2261acb79
```

---

## 🔗 URLs de Webhook

### URL del Webhook
```
https://www.meleroller.com.ar/api/pagos/mercado-pago/webhook
```

### Configuración en Mercado Pago

1. Ir a: https://www.mercadopago.com.ar/developers/panel/app/5081066860585799
2. En el menú lateral, ir a **"Webhooks"** o **"Notificaciones IPN"**
3. Hacer clic en **"Crear webhook"** o **"Agregar URL"**
4. Agregar la URL: `https://www.meleroller.com.ar/api/pagos/mercado-pago/webhook`
5. Seleccionar eventos:
   - ✅ `payment` (todos los eventos de pago)
   - ✅ `payment.created` (cuando se crea un pago)
   - ✅ `payment.updated` (cuando se actualiza un pago)
6. Guardar la configuración

### Verificar Webhook

Después de configurar, Mercado Pago enviará una notificación de prueba. Verificar en los logs del servidor que se reciba correctamente.

---

## ✅ Características Implementadas

### 1. Creación de Preferencias
- ✅ Genera preferencias de pago con todos los datos necesarios
- ✅ Configura cuotas máximas
- ✅ Incluye información del cliente y pedido
- ✅ URLs de retorno (success, failure, pending)

### 2. Webhooks
- ✅ Recibe notificaciones automáticas de Mercado Pago
- ✅ Actualiza estados de pago en la base de datos
- ✅ Maneja múltiples formatos de notificación
- ✅ Retorna 200 para evitar reintentos

### 3. Auto-Return
- ✅ Cliente vuelve automáticamente después de pagar
- ✅ Solo activo en producción (HTTPS)

### 4. Actualización de Estados
- ✅ Estados mapeados correctamente:
  - `approved` → `APROBADO`
  - `rejected` / `cancelled` / `refunded` → `RECHAZADO`
  - `pending` / `in_process` → `GENERADO`

---

## 🧪 Pruebas en Producción

### Tarjetas de Prueba (Solo en Sandbox)
⚠️ **IMPORTANTE**: En producción, las tarjetas de prueba NO funcionan. Solo funcionan tarjetas reales.

### Flujo de Prueba Real
1. Crear un pago desde el admin
2. Copiar el link de pago
3. Abrir en navegador de incógnito
4. Completar el pago con una tarjeta real
5. Verificar que el estado se actualice en el admin

---

## 📊 Monitoreo

### Logs a Revisar
- `Creating preference with data:` - Datos enviados a MP
- `Mercado Pago SDK response:` - Respuesta de MP
- `Webhook recibido:` - Notificaciones recibidas
- `✅ Pago actualizado a estado:` - Confirmación de actualización

### Dashboard de Mercado Pago
- Ver pagos en: https://www.mercadopago.com.ar/activities/payments
- Ver webhooks en: https://www.mercadopago.com.ar/developers/panel/app

---

## 🔒 Seguridad

### ✅ Implementado
- ✅ Access Token solo en variables de entorno (nunca en código)
- ✅ Validación de HTTPS para webhooks
- ✅ Validación de `external_reference` en webhooks
- ✅ Manejo seguro de errores

### ⚠️ Recordatorios
- Nunca compartir el Access Token
- Mantener el webhook URL privado
- Revisar logs regularmente para detectar intentos de fraude

---

## 🚀 Checklist de Producción

- [x] Access Token configurado en variables de entorno
- [x] `NEXT_PUBLIC_BASE_URL` configurado con dominio real
- [x] Webhook URL configurado en Mercado Pago
- [x] Mensajes de sandbox eliminados
- [x] Auto-return activado (solo en HTTPS)
- [x] Notification URL configurada automáticamente
- [x] Back URLs configuradas correctamente
- [x] Webhook handler implementado y funcionando
- [x] Logs optimizados para producción
- [x] Timeout aumentado a 10s para producción
- [x] Manejo de errores mejorado

## 📝 Panel de Mercado Pago

### Link Directo a la Aplicación
https://www.mercadopago.com.ar/developers/panel/app/5081066860585799

### Credenciales Actualizadas
- ✅ Access Token: `APP_USR-5081066860585799-122915-a20ed8f49172d4732509a19014ace654-227785348`
- ✅ Public Key: `APP_USR-590e953f-336d-4c69-bc9c-05d2261acb79`
- ✅ Application ID: `5081066860585799`

---

## 📞 Soporte

Si hay problemas con los pagos:
1. Revisar logs del servidor
2. Verificar webhooks en el dashboard de MP
3. Verificar que las URLs sean HTTPS en producción
4. Contactar soporte de Mercado Pago si es necesario

---

## 🔄 Actualización de Estados

El sistema actualiza estados de 3 formas:

1. **Webhook automático**: Mercado Pago notifica cuando cambia el estado
2. **Auto-return**: Cuando el cliente vuelve después de pagar
3. **Consulta manual**: Desde el admin se puede actualizar manualmente

---

---

## ✅ Verificación Post-Configuración

### 1. Verificar Variables de Entorno
```bash
# En Vercel, verificar que estén configuradas:
MERCADOPAGO_ACCESS_TOKEN=APP_USR-5081066860585799-122915-a20ed8f49172d4732509a19014ace654-227785348
NEXT_PUBLIC_BASE_URL=https://www.meleroller.com.ar
```

### 2. Probar Creación de Pago
1. Ir al admin: `/admin/pagos`
2. Crear un pago nuevo
3. Verificar que se genere el `init_point`
4. Copiar el link y abrirlo en navegador

### 3. Verificar Webhook
1. Completar un pago de prueba (con tarjeta real en producción)
2. Revisar logs de Vercel para ver el webhook recibido
3. Verificar que el estado se actualice en el admin

### 4. Monitorear en Dashboard de MP
- Ver pagos en: https://www.mercadopago.com.ar/activities/payments
- Ver webhooks en: https://www.mercadopago.com.ar/developers/panel/app/5081066860585799/webhooks

---

## 🔧 Troubleshooting

### El pago no se crea
- Verificar que `MERCADOPAGO_ACCESS_TOKEN` esté configurado
- Revisar logs del servidor para ver el error específico
- Verificar que el token sea de producción (empieza con `APP_USR-`)

### El webhook no funciona
- Verificar que la URL sea HTTPS
- Verificar que esté configurado en el panel de MP
- Revisar logs del servidor para ver si llegan las notificaciones
- Verificar que el endpoint retorne 200

### El cliente no vuelve después de pagar
- Verificar que `auto_return` esté activado (solo en HTTPS)
- Verificar que `NEXT_PUBLIC_BASE_URL` esté configurado correctamente
- Revisar que las `back_urls` sean correctas

---

**Última actualización**: Configurado para producción - Listo para usar
**Credenciales actualizadas**: ✅ Production credentials configuradas

