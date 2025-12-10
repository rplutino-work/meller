# Configuración del Webhook de Mercado Pago

## 🔗 URL del Webhook

Para configurar el webhook en Mercado Pago, usa la siguiente URL:

### En Producción (Vercel)
```
https://tu-dominio.vercel.app/api/pagos/mercado-pago/webhook
```

**Ejemplo:**
```
https://meleroller.vercel.app/api/pagos/mercado-pago/webhook
```

### En Desarrollo Local
El webhook **NO funcionará en desarrollo local** porque Mercado Pago necesita una URL pública accesible desde internet.

Para probar el webhook en desarrollo, puedes usar [ngrok](https://ngrok.com/):
```bash
ngrok http 3000
```

Luego usa la URL de ngrok:
```
https://tu-url-ngrok.ngrok.io/api/pagos/mercado-pago/webhook
```

## 📝 Pasos para Configurar el Webhook

### 1. Obtener la URL de tu aplicación

Una vez que hayas desplegado en Vercel:
1. Ve a tu proyecto en Vercel
2. Copia la URL de tu deployment (ej: `https://meleroller.vercel.app`)
3. Agrega `/api/pagos/mercado-pago/webhook` al final

### 2. Configurar en Mercado Pago

1. **Ve a tu panel de Mercado Pago:**
   - [Panel de Developers](https://www.mercadopago.com.ar/developers/panel)

2. **Selecciona tu aplicación:**
   - Ve a la aplicación que estás usando (ID: `5377841122569497`)

3. **Ve a la sección de Webhooks:**
   - Busca "Webhooks" o "Notificaciones" en el menú lateral
   - O ve directamente a: `https://www.mercadopago.com.ar/developers/panel/app/5377841122569497/webhooks`

4. **Agrega el webhook:**
   - Haz clic en "Crear webhook" o "Agregar URL"
   - Pega la URL completa: `https://tu-dominio.vercel.app/api/pagos/mercado-pago/webhook`
   - Selecciona los eventos que quieres recibir:
     - ✅ `payment` (Pagos)
     - ✅ `merchant_order` (Opcional, para órdenes)
   - Guarda la configuración

### 3. Verificar que funciona

1. **Realiza un pago de prueba:**
   - Crea un pago desde el admin
   - Completa el pago con una tarjeta de prueba
   - El webhook debería recibir la notificación automáticamente

2. **Revisa los logs:**
   - En Vercel, ve a tu proyecto > Logs
   - Busca mensajes que digan "Webhook recibido" o "Pago actualizado"
   - También puedes revisar los logs en el panel de Mercado Pago

## 🔍 Verificación del Webhook

### En el Panel de Mercado Pago

1. Ve a la sección de Webhooks
2. Verás una lista de notificaciones enviadas
3. Cada notificación muestra:
   - Estado (200 = éxito, otros = error)
   - Fecha y hora
   - Respuesta del servidor

### En los Logs de Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en "Logs"
3. Busca mensajes que contengan:
   - `Webhook recibido`
   - `Pago actualizado a estado`
   - `Error processing webhook`

## ⚠️ Notas Importantes

- **El webhook debe ser HTTPS:** Mercado Pago solo acepta URLs HTTPS
- **Debe ser accesible públicamente:** No funcionará con `localhost` o IPs privadas
- **Timeout:** Mercado Pago espera una respuesta en menos de 5 segundos
- **Reintentos:** Si el webhook falla, Mercado Pago reintentará automáticamente
- **Idempotencia:** El webhook puede enviar múltiples notificaciones para el mismo pago

## 🐛 Troubleshooting

### El webhook no recibe notificaciones

1. **Verifica la URL:**
   - Asegúrate de que la URL sea correcta y accesible
   - Prueba acceder a la URL en tu navegador (debería retornar un error JSON, pero no un 404)

2. **Verifica los logs de Vercel:**
   - Revisa si hay errores en los logs
   - Verifica que la ruta `/api/pagos/mercado-pago/webhook` existe

3. **Verifica en el panel de Mercado Pago:**
   - Ve a la sección de Webhooks
   - Revisa si hay notificaciones fallidas
   - Verifica el estado de cada notificación

### El webhook recibe notificaciones pero no actualiza el pago

1. **Revisa los logs del servidor:**
   - Busca mensajes de error
   - Verifica que el `external_reference` coincida con el token del pago

2. **Verifica la base de datos:**
   - Asegúrate de que el pago existe en la BD
   - Verifica que el token coincida

## 📚 Referencias

- [Documentación de Webhooks de Mercado Pago](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)
- [Panel de Mercado Pago](https://www.mercadopago.com.ar/developers/panel)

