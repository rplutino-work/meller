# Sistema de Gestión de Pagos con Mercado Pago

## Configuración

### Variables de Entorno

Agrega las siguientes variables a tu archivo `.env`:

```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago

# Base URL (para webhooks y redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # En producción: https://tudominio.com
```

### Obtener Access Token de Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Crea una aplicación
3. Obtén tu Access Token (Production o Test)
4. Agrega el token a tu `.env`

## Funcionalidades Implementadas

### 1. Modelo de Base de Datos
- Modelo `Pago` con todos los campos necesarios
- Token único para cada pago
- Integración con Mercado Pago (ID de preferencia, estado)

### 2. API Routes
- `GET /api/pagos` - Listar pagos (con filtros por estado, últimos 30 días, o por token)
- `POST /api/pagos` - Crear nuevo pago (genera token y preferencia de Mercado Pago)
- `GET /api/pagos/[id]` - Obtener pago por ID
- `PUT /api/pagos/[id]` - Actualizar pago
- `DELETE /api/pagos/[id]` - Eliminar pago
- `POST /api/pagos/mercado-pago/webhook` - Webhook para recibir notificaciones de Mercado Pago

### 3. Página de Administración
- `/admin/pagos` - Gestión completa de pagos
  - Lista de pagos pendientes (estado GENERADO)
  - Lista de pagos aprobados de los últimos 30 días
  - Crear nuevo pago
  - Editar pago existente
  - Copiar link de pago
  - Devolver pagos aprobados
  - Búsqueda y filtrado

### 4. Página Pública de Pago
- `/pagar/[token]` - Página donde los usuarios realizan el pago
  - Muestra información del pago
  - Botón para pagar con Mercado Pago
  - Manejo de estados (aprobado, rechazado, pendiente)
  - Redirección automática después del pago

## Flujo de Pago

1. **Admin crea un pago:**
   - Ingresa cliente, monto, pedido, etc.
   - El sistema genera un token único
   - Se crea una preferencia en Mercado Pago
   - Se guarda el pago en la base de datos

2. **Admin copia el link:**
   - El link tiene el formato: `https://tudominio.com/pagar/[token]`
   - Se envía al cliente

3. **Cliente realiza el pago:**
   - Accede al link
   - Ve la información del pago
   - Hace clic en "Pagar con Mercado Pago"
   - Se redirige a Mercado Pago para completar el pago

4. **Mercado Pago notifica:**
   - Webhook actualiza el estado del pago
   - El cliente es redirigido de vuelta con el estado

5. **Admin ve el resultado:**
   - Los pagos aprobados aparecen en "Pagos Aprobados"
   - Los pagos rechazados aparecen en "Pagos Pendientes" con estado RECHAZADO

## Configuración de Webhook en Mercado Pago

1. Ve a tu aplicación en Mercado Pago Developers
2. Configura la URL del webhook: `https://tudominio.com/api/pagos/mercado-pago/webhook`
3. Asegúrate de que tu servidor sea accesible públicamente (usar ngrok en desarrollo)

## Notas Importantes

- Los errores de TypeScript sobre `prisma.pago` deberían resolverse al reiniciar el servidor de desarrollo
- En producción, asegúrate de configurar correctamente `NEXT_PUBLIC_BASE_URL`
- El webhook de Mercado Pago requiere que tu servidor sea accesible públicamente
- Para desarrollo local, puedes usar ngrok para exponer tu servidor

