# 📋 Manual de Administración - MeleRoller

## 🔐 Acceso al Panel de Administración

**URL:** `https://www.meleroller.com.ar/admin` (o `http://localhost:3000/admin` en desarrollo)

### Credenciales de Super Administrador

El usuario super administrador tiene acceso completo a todas las funcionalidades del sistema:

- **Email:** `admin@meleroller.com.ar`
- **Contraseña:** `admin123` (se recomienda cambiar después del primer acceso)

> ⚠️ **IMPORTANTE:** Esta cuenta tiene permisos completos. Solo debe ser utilizada por personal autorizado.
> 
> 🔒 **RECOMENDACIÓN DE SEGURIDAD:** Cambiar la contraseña después del primer acceso desde la sección de Usuarios (si eres SUPERADMIN) o solicitar al desarrollador que la cambie.

---

## 👥 Sistema de Usuarios y Roles

### Tipos de Usuarios

El sistema cuenta con dos niveles de acceso:

1. **SUPERADMIN** (`admin@meleroller.com.ar`)
   - Acceso completo a todas las funcionalidades
   - Puede crear, editar y eliminar usuarios
   - Puede gestionar roles de otros usuarios
   - Acceso a la sección "Usuarios" en Configuración

2. **ADMIN**
   - Acceso a todas las funcionalidades excepto gestión de usuarios
   - Puede gestionar solicitudes, presupuestos y pagos
   - Puede modificar configuraciones del sitio

### Gestión de Usuarios

**Ubicación:** `/admin/configuracion/usuarios`

**Solo disponible para SUPERADMIN**

Desde esta sección puedes:

- **Ver todos los usuarios** del sistema con su nombre, email y rol
- **Crear nuevos usuarios:**
  - Nombre completo
  - Email (debe ser único)
  - Contraseña (se encripta automáticamente)
  - Rol (SUPERADMIN o ADMIN)
- **Editar usuarios existentes:**
  - Modificar nombre, email y rol
  - Cambiar contraseña (opcional, dejar vacío para mantener la actual)
- **Eliminar usuarios:**
  - No puedes eliminar tu propio usuario
  - Se requiere confirmación antes de eliminar

---

## 📊 Secciones del Panel de Administración

### 1. Dashboard (`/admin`)

**Vista general del sistema**

Muestra:
- **Estadísticas generales:**
  - Total de solicitudes de visita
  - Total de presupuestos
  - Solicitudes pendientes
  - Solicitudes en proceso
  - Solicitudes completadas
- **Solicitudes recientes:** Las últimas 5 solicitudes (visitas y presupuestos) ordenadas por fecha

---

### 2. Solicitudes de Visita (`/admin/visitas`)

**Gestión de solicitudes de visitas de decoradores**

Funcionalidades:
- **Ver todas las solicitudes** con información del cliente (nombre, email, teléfono, dirección)
- **Filtrar por estado:**
  - Pendiente
  - En Proceso
  - Completado
  - Cancelado
- **Buscar solicitudes** por nombre, email o teléfono
- **Actualizar estado** de cada solicitud
- **Agregar notas** internas para seguimiento
- **Eliminar solicitudes** (con confirmación)

**Estados disponibles:**
- `PENDIENTE`: Solicitud nueva, sin procesar
- `EN_PROCESO`: Solicitud en curso
- `COMPLETADO`: Visita realizada
- `CANCELADO`: Solicitud cancelada

---

### 3. Presupuestos (`/admin/presupuestos`)

**Gestión de solicitudes de presupuestos**

Funcionalidades similares a Solicitudes de Visita:
- **Ver todas las solicitudes** con productos y medidas solicitadas
- **Filtrar y buscar** solicitudes
- **Actualizar estado** y agregar notas
- **Eliminar solicitudes**

Los productos se muestran en formato JSON con información de:
- Tipo de producto
- Ancho y alto
- Cantidad

---

### 4. Pagos (`/admin/pagos`)

**Gestión completa del sistema de pagos**

#### Secciones principales:

**A. Pagos Pendientes**
- Pagos generados que aún no han sido aprobados
- Muestra: ID de plataforma, plataforma de pago, cliente, pedido asociado, monto, fecha de alta, estado, link de pago
- Acciones disponibles:
  - Ver link de pago
  - Copiar link
  - Editar pago
  - Eliminar pago

**B. Pagos Aprobados**
- Pagos aprobados de los últimos 30 días
- Muestra: ID de plataforma, plataforma, cliente, pedido, monto, fecha de pago, estado
- Acciones disponibles:
  - Marcar como APROBADO (si está en otro estado)
  - **DEVOLVER** (solo para pagos aprobados con ID de Mercado Pago)
  - Editar pago

**C. Pagos Devueltos**
- Pagos que han sido devueltos/reembolsados
- Muestra: ID de plataforma, plataforma, cliente, pedido, monto, fecha de devolución, estado

#### Filtros disponibles:

- **Por estado:** Todos, Generado, Aprobado, Devuelto, Rechazado
- **Por fecha:** Todas, Hoy, Últimos 7 días, Últimos 30 días
- **Búsqueda:** Por cliente, pedido o ID cliente

#### Funcionalidades especiales:

**Crear nuevo pago:**
- Cliente (obligatorio)
- ID Cliente (opcional)
- ID Pedido (puede asociarse con solicitudes de visita o presupuesto)
- Monto (obligatorio)
- Cantidad máxima de cuotas
- Método: Checkout Pro (Mercado Pago)
- Estado inicial: Generado

**Asociar con solicitudes:**
- Al crear un pago, puedes usar el botón "Asociar Solicitud"
- Seleccionar una solicitud de visita o presupuesto
- El ID se asignará automáticamente con formato `VISITA-{número}` o `PRESUPUESTO-{número}`

**Devolver un pago:**
- Solo disponible para pagos con estado APROBADO
- Solo funciona con pagos reales de Mercado Pago (que tengan `mercadoPagoId`)
- Procesa el reembolso directamente en Mercado Pago
- Actualiza el estado a DEVUELTO
- Envía notificación de reembolso al cliente

**IDs de pagos:**
- Se muestra el **ID de la plataforma** (Mercado Pago) en lugar del ID interno
- La columna "Plataforma" muestra el logo de Mercado Pago cuando está disponible

---

### 5. Configuración (`/admin/configuracion`)

**Ajustes y preferencias del sitio**

#### Secciones disponibles:

**A. Hero & Banners** (`/admin/configuracion/customizacion`)
- Gestiona el contenido del hero principal
- Configura banners promocionales
- Personalización visual del sitio

**B. Banner Promocional** (`/admin/configuracion/preheader`)
- Texto del banner superior del sitio
- Mensajes promocionales

**C. Formularios** ⚠️ **NO DISPONIBLE**
- Configuración de emails y mensajes de formularios
- **Estado:** Configuración incompleta - No disponible temporalmente
- Aparece en gris y no es accesible

**D. Notificaciones** ⚠️ **NO DISPONIBLE**
- Alertas y notificaciones del sistema
- **Estado:** Configuración incompleta - No disponible temporalmente
- Aparece en gris y no es accesible

**E. Sitio en Mantenimiento** (`/admin/configuracion/mantenimiento`)
- Activa o desactiva la pantalla de mantenimiento
- Útil para realizar actualizaciones sin que los usuarios vean el sitio

**F. Usuarios** (`/admin/configuracion/usuarios`) 🔒 **Solo SUPERADMIN**
- Gestión completa de usuarios y roles
- Ver sección "Sistema de Usuarios y Roles" arriba

---

## 🔄 IDs de Solicitudes

Las solicitudes ahora usan un sistema de numeración secuencial más legible:

- **Visitas:** `VISITA-1`, `VISITA-2`, `VISITA-3`, etc.
- **Presupuestos:** `PRESUPUESTO-1`, `PRESUPUESTO-2`, `PRESUPUESTO-3`, etc.

Estos IDs se pueden asociar directamente a los pagos para mantener un registro claro de qué solicitud generó cada pago.

---

## 💳 Sistema de Pagos

### Plataformas de Pago

Actualmente solo está activo **Mercado Pago Checkout Pro**.

- Los pagos se generan con un link único
- El cliente puede pagar con tarjeta, transferencia o efectivo
- Los pagos se sincronizan automáticamente con Mercado Pago
- Los estados se actualizan mediante webhooks

### Estados de Pago

- **GENERADO:** Pago creado, link generado, pendiente de pago
- **APROBADO:** Pago completado y aprobado
- **DEVUELTO:** Pago reembolsado al cliente
- **RECHAZADO:** Pago rechazado o cancelado

### Devoluciones

Para devolver un pago:
1. El pago debe estar en estado **APROBADO**
2. El pago debe tener un `mercadoPagoId` (pago real de Mercado Pago)
3. Hacer clic en el botón **"DEVOLVER"**
4. Confirmar la acción
5. El sistema procesará el reembolso en Mercado Pago
6. El estado cambiará a **DEVUELTO**
7. El cliente recibirá una notificación de Mercado Pago

---

## 📧 Configuración de Emails

### Notificaciones Automáticas

El sistema envía automáticamente emails de notificación cuando se reciben nuevas solicitudes de:
- **Solicitud de Visita**
- **Solicitud de Presupuesto**

### Configuración de Destinatarios

Los emails se envían a las direcciones configuradas en:
**Admin → Configuración → Formularios**

Cada formulario tiene su propia configuración:
- **Email Destino:** Dirección que recibirá las notificaciones
- **Asunto Email:** Asunto del correo
- **Mensaje de Éxito:** Mensaje que verá el usuario al enviar el formulario

### Configuración SMTP (Técnico)

Para que los emails funcionen, el administrador del servidor debe configurar las variables de entorno SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-app
SMTP_FROM=noreply@meleroller.com.ar
```

**Importante:** Si los emails no están llegando, verificar:
1. Que las variables SMTP estén correctamente configuradas
2. Que el email destino en la configuración de formularios sea válido
3. Revisar los logs del servidor para ver errores de envío
4. Verificar que el firewall no bloquee el puerto SMTP

### Verificación de Emails

Si los emails no llegan después de la migración:
1. Verificar que las variables de entorno SMTP estén configuradas en el servidor de producción
2. Verificar que los emails destino en `/admin/configuracion/formularios` sean correctos
3. Revisar los logs del servidor para identificar errores
4. Probar enviando una solicitud de prueba desde el sitio