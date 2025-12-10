# Cómo obtener el Access Token de Mercado Pago

## Pasos para generar tu Access Token

### 1. Crear una cuenta de Mercado Pago

Si no tienes una cuenta:
- Ve a [https://www.mercadopago.com.ar](https://www.mercadopago.com.ar)
- Crea una cuenta (puede ser personal o de negocio)

### 2. Acceder a Developers

1. Inicia sesión en tu cuenta de Mercado Pago
2. Ve a la sección de **Desarrolladores** o **Developers**
   - Puedes acceder directamente desde: [https://www.mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
   - O desde el menú de tu cuenta, busca "Desarrolladores" o "Developers"

### 3. Crear una Aplicación

1. En el panel de Developers, haz clic en **"Crear aplicación"** o **"Create application"**
2. Completa el formulario:
   - **Nombre de la aplicación**: Ej: "Mele Roller Pagos"
   - **Descripción**: Descripción de tu aplicación
   - **Producto**: Selecciona "Checkout Pro" o "Checkout API"
   - **Plataforma**: Web
3. Haz clic en **"Crear"**

### 4. Obtener las Credenciales

Una vez creada la aplicación, verás dos tipos de credenciales:

#### Credenciales de Prueba (Test)
- **Public Key** (clave pública)
- **Access Token** (token de acceso)
- Estas son para hacer pruebas sin procesar pagos reales

#### Credenciales de Producción (Production)
- **Public Key** (clave pública)
- **Access Token** (token de acceso)
- Estas son para procesar pagos reales

**⚠️ IMPORTANTE**: 
- Para desarrollo y pruebas, usa las **Credenciales de Prueba**
- Para producción, usa las **Credenciales de Producción**
- **NUNCA** compartas tu Access Token de producción públicamente

### 5. Configurar en tu proyecto

Agrega el Access Token a tu archivo `.env`:

```env
# Para desarrollo (Test)
MERCADOPAGO_ACCESS_TOKEN=TEST-tu_access_token_aqui

# Para producción
MERCADOPAGO_ACCESS_TOKEN=APP_USR-tu_access_token_aqui
```

### 6. Configurar el Webhook (Opcional pero recomendado)

1. En la configuración de tu aplicación en Mercado Pago
2. Ve a la sección de **Webhooks** o **Notificaciones**
3. Agrega la URL: `https://tudominio.com/api/pagos/mercado-pago/webhook`
4. Para desarrollo local, puedes usar [ngrok](https://ngrok.com/) para exponer tu servidor local

### 7. Probar con tarjetas de prueba

Mercado Pago proporciona tarjetas de prueba para desarrollo:

**Tarjetas de prueba aprobadas:**
- Visa: 4509 9535 6623 3704
- Mastercard: 5031 7557 3453 0604

**CVV**: Cualquier número de 3 dígitos
**Fecha de vencimiento**: Cualquier fecha futura
**Nombre del titular**: Cualquier nombre

**Tarjetas de prueba rechazadas:**
- Visa: 4013 5406 8274 6260
- Mastercard: 5031 4332 1540 6351

### Enlaces útiles

- [Panel de Developers de Mercado Pago](https://www.mercadopago.com.ar/developers)
- [Documentación de Checkout Pro](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/integration-configuration/integration-configuration)
- [Documentación de Webhooks](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)
- [Tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/testing)

### Notas importantes

1. **Seguridad**: Nunca subas tu Access Token a repositorios públicos (GitHub, etc.)
2. **Variables de entorno**: Siempre usa variables de entorno para almacenar credenciales
3. **Test vs Production**: Asegúrate de usar las credenciales correctas según el ambiente
4. **Webhooks**: Los webhooks requieren que tu servidor sea accesible públicamente (HTTPS en producción)

