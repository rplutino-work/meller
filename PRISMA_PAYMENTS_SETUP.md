# Configuración de Prisma Medios de Pago

Esta guía explica cómo configurar Prisma Medios de Pago (Decidir) como proveedor de pagos adicional a Mercado Pago.

## Documentación Oficial

- Portal de desarrolladores: https://developers.prismamediosdepago.com/portal/
- API Reference: https://developers.prismamediosdepago.com/portal/

## Requisitos Previos

1. Cuenta activa en Prisma Medios de Pago
2. Credenciales de API (API Key pública y privada)
3. Site ID de tu comercio

## Variables de Entorno

Agrega las siguientes variables a tu archivo `.env` (local) y en Vercel (producción):

```env
# Prisma Medios de Pago
PRISMA_API_URL=https://live.decidir.com/api/v2
PRISMA_PUBLIC_KEY=tu_public_key_aqui
PRISMA_PRIVATE_KEY=tu_private_key_aqui
PRISMA_SITE_ID=tu_site_id_aqui
```

### Obtener las Credenciales

1. Ingresa al portal de Prisma Medios de Pago
2. Ve a la sección de "Credenciales" o "API Keys"
3. Copia el **Public Key** (para tokenización en frontend)
4. Copia el **Private Key** (para procesamiento en backend)
5. Copia el **Site ID** de tu comercio

### Entornos

- **Sandbox (pruebas)**: `https://api-sandbox.prismamediosdepago.com`
- **Producción**: `https://live.decidir.com/api/v2`

### Credenciales Sandbox (Pruebas) - Mele Roller

```env
PRISMA_API_URL=https://api-sandbox.prismamediosdepago.com/api/v2
PRISMA_PUBLIC_KEY=019b6b3a-65b5-7674-b34e-c7d3d9512c66
PRISMA_PRIVATE_KEY=019b6b3a-65b5-7674-b34e-c9ace7232941
PRISMA_SITE_ID=d837225c-99b2-4c86-afd3-53626be3cde8
```

> ⚠️ **Importante:** Estas son credenciales de sandbox para pruebas. En producción, usar las credenciales de producción.
> 
> **Estado:** Organización en Validación - Solo sandbox disponible por ahora.

## Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega cada variable:
   - `PRISMA_API_URL`
   - `PRISMA_PUBLIC_KEY`
   - `PRISMA_PRIVATE_KEY`
   - `PRISMA_SITE_ID`
4. Selecciona los entornos (Production, Preview, Development)
5. Redeploya tu aplicación

## Uso en el Admin

### Crear un Pago con Prisma

1. Ve a **Administración > Pagos**
2. Click en **Nuevo Pago**
3. Completa los datos:
   - Cliente
   - Monto
   - Cuotas máximas
4. En **Proveedor de Pago**, selecciona **Prisma Medios de Pago**
5. Click en **Guardar**

### Flujo de Pago

1. Se genera un link de pago interno (ej: `/pagar/abc123`)
2. El cliente accede al link
3. Completa el formulario con los datos de su tarjeta
4. El pago se procesa directamente con Prisma
5. Se muestra el resultado (aprobado/rechazado)

## Diferencias con Mercado Pago

| Característica | Mercado Pago | Prisma |
|----------------|--------------|--------|
| Tipo de pago | Checkout externo | Formulario propio |
| Tokenización | En MP | En tu página |
| Link externo | Sí | No |
| Control del diseño | Limitado | Total |

## Seguridad

### PCI-DSS Compliance

Para cumplir con PCI-DSS cuando uses Prisma:

1. **Nunca almacenes** datos de tarjetas en tu base de datos
2. **Siempre tokeniza** en el frontend antes de enviar al servidor
3. **Usa HTTPS** obligatoriamente en producción
4. **No loguees** números de tarjeta

### Tokenización (Importante)

En la implementación actual, se incluye un formulario de pago básico. Para producción, debes integrar el SDK oficial de Prisma para tokenizar las tarjetas de forma segura.

```javascript
// Ejemplo con SDK de Prisma (implementar según documentación oficial)
const token = await prismaSDK.createToken({
  card_number: '4507990000004905',
  card_expiration_month: '12',
  card_expiration_year: '25',
  security_code: '123',
  card_holder_name: 'JUAN PEREZ',
  card_holder_identification: {
    type: 'DNI',
    number: '12345678'
  }
});
```

## Webhook

Para recibir notificaciones de cambios de estado:

1. Configura el webhook en el panel de Prisma
2. URL: `https://tu-dominio.com/api/pagos/prisma/webhook`
3. Los estados se actualizarán automáticamente

## Tarjetas de Prueba (Sandbox)

Para realizar pruebas en el entorno sandbox:

| Marca | Número | CVV | Vencimiento |
|-------|--------|-----|-------------|
| Visa | 4507 9900 0000 4905 | 123 | Cualquier fecha futura |
| Mastercard | 5299 9100 0000 0002 | 123 | Cualquier fecha futura |
| American Express | 3711 8030 0000 0000 | 1234 | Cualquier fecha futura |

**Datos de prueba:**
- DNI: Cualquier número de 8 dígitos
- Nombre: APPROVED (para aprobar) / REJECTED (para rechazar)

## Estados de Pago

| ID | Estado | Descripción |
|----|--------|-------------|
| 1 | approved | Pago aprobado |
| 2 | rejected | Pago rechazado |
| 3 | pending | Pago pendiente |
| 4 | pre_approved | Pre-aprobado |
| 5 | annulled | Anulado |
| 6 | review | En revisión |

## Métodos de Pago Soportados

| ID | Método |
|----|--------|
| 1 | Visa |
| 15 | Mastercard |
| 65 | American Express |
| 22 | Visa Débito |
| 23 | Mastercard Débito |
| 26 | Cabal |
| 27 | Naranja |
| 30 | Argencard |
| 31 | Diners |

## Troubleshooting

### "PRISMA_PRIVATE_KEY no está configurado"

Verifica que las variables de entorno estén correctamente configuradas:
- En local: archivo `.env`
- En Vercel: Settings > Environment Variables

### Pago rechazado sin motivo claro

1. Verifica que estés usando las tarjetas de prueba correctas
2. En producción, el rechazo puede venir del banco emisor
3. Revisa los logs del servidor para más detalles

### Error de tokenización

Asegúrate de que:
1. La Public Key sea correcta
2. El Site ID corresponda a tu comercio
3. Estés usando el entorno correcto (sandbox/producción)

## Soporte

- Documentación: https://developers.prismamediosdepago.com/portal/
- Soporte técnico: Contactar a Prisma Medios de Pago

