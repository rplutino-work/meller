# Guía de Pruebas con Mercado Pago Sandbox

## 🔴 Error Común: "Una de las partes con la que intentás hacer el pago es de prueba"

Este error ocurre cuando estás usando **credenciales de Sandbox** pero intentas pagar con una **cuenta real de Mercado Pago**.

## ✅ Solución: Usar Tarjetas de Prueba

Para hacer pagos de prueba en Mercado Pago Sandbox, debes usar **tarjetas de prueba específicas**. No puedes usar tu tarjeta real.

### Tarjetas de Prueba Aprobadas

Usa estas tarjetas para simular pagos **aprobados**:

#### Visa
- **Número**: `4509 9535 6623 3704`
- **CVV**: Cualquier número de 3 dígitos (ej: `123`)
- **Fecha de vencimiento**: Cualquier fecha futura (ej: `12/25`)
- **Nombre del titular**: Cualquier nombre
- **DNI**: Cualquier número de 8 dígitos (ej: `12345678`)

#### Mastercard
- **Número**: `5031 7557 3453 0604`
- **CVV**: Cualquier número de 3 dígitos
- **Fecha de vencimiento**: Cualquier fecha futura
- **Nombre del titular**: Cualquier nombre
- **DNI**: Cualquier número de 8 dígitos

#### American Express
- **Número**: `3711 803032 57522`
- **CVV**: Cualquier número de 4 dígitos
- **Fecha de vencimiento**: Cualquier fecha futura
- **Nombre del titular**: Cualquier nombre
- **DNI**: Cualquier número de 8 dígitos

### Tarjetas de Prueba Rechazadas

Para probar pagos **rechazados**:

#### Visa Rechazada
- **Número**: `4013 5406 8274 6260`
- **CVV**: Cualquier número de 3 dígitos
- **Fecha de vencimiento**: Cualquier fecha futura

#### Mastercard Rechazada
- **Número**: `5031 4332 1540 6351`
- **CVV**: Cualquier número de 3 dígitos
- **Fecha de vencimiento**: Cualquier fecha futura

### Tarjetas de Prueba Pendientes

Para probar pagos **pendientes**:

#### Visa Pendiente
- **Número**: `4509 9535 6623 3704`
- **CVV**: Cualquier número de 3 dígitos
- **Fecha de vencimiento**: Cualquier fecha futura

## 📝 Pasos para Probar un Pago

1. **Crea un pago desde el admin**
   - Ve a `/admin/pagos`
   - Haz clic en "CREAR PAGO NUEVO"
   - Completa los campos (Cliente y Monto son obligatorios)
   - Guarda el pago

2. **Copia el link de pago**
   - El link se generará automáticamente
   - Debería verse algo como: `https://www.mercadopago.com.ar/checkout/v1/payment/redirect/...`

3. **Abre el link en una ventana de incógnito**
   - **IMPORTANTE:** NO te loguees con ninguna cuenta de Mercado Pago
   - Si te pide iniciar sesión, simplemente cierra esa ventana o haz clic en "Continuar como invitado"
   - **NO uses las cuentas de prueba de comprador** del panel de Mercado Pago (esas requieren verificación de email)

4. **Paga como invitado con tarjeta de prueba**
   - Selecciona "Pagar con tarjeta" o "Pagar como invitado"
   - Ingresa los datos de una de las tarjetas de prueba listadas arriba
   - **NO uses tu tarjeta real**
   - **NO necesitas estar logueado**

5. **Completa el pago**
   - El pago debería procesarse correctamente
   - Serás redirigido a tu sitio con el estado del pago

## ⚠️ Importante

- **NO uses tu cuenta real de Mercado Pago** para probar pagos en Sandbox
- **NO uses tu tarjeta real** para probar pagos en Sandbox
- **NO necesitas usar cuentas de prueba de comprador** - puedes pagar como invitado
- **NO te loguees** - simplemente paga como invitado con las tarjetas de prueba
- Las tarjetas de prueba **solo funcionan en el ambiente Sandbox**
- En producción, necesitarás usar **credenciales de producción** y los usuarios pagarán con sus tarjetas reales

## ❌ Problema Común: "Ingresá el código que te enviamos por e-mail"

Si Mercado Pago te pide un código de verificación por email, significa que intentaste usar una cuenta de prueba de comprador. **No necesitas hacer esto**.

**Solución:**
1. Cierra la ventana de verificación
2. Vuelve al checkout
3. Selecciona "Pagar como invitado" o "Pagar con tarjeta"
4. Ingresa directamente los datos de la tarjeta de prueba
5. **NO te loguees con ninguna cuenta**

## 🔄 Cambiar a Producción

Cuando estés listo para producción:

1. **Genera credenciales de producción** en tu panel de Mercado Pago
2. **Actualiza** `MERCADOPAGO_ACCESS_TOKEN` con el token de producción
3. **Configura el webhook** con la URL de producción
4. Los usuarios podrán pagar con sus tarjetas reales

## 📚 Referencias

- [Documentación oficial de Mercado Pago - Tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Panel de Mercado Pago](https://www.mercadopago.com.ar/developers/panel)

