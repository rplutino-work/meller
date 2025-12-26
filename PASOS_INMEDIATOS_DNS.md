# 🚀 Pasos Inmediatos - Configurar DNS en Nick Argentina

## ⚠️ El Error "Invalid Configuration" es Normal

Este error aparece porque **aún no has configurado los registros DNS en Nick Argentina**. Vercel está esperando que configures los registros que te indicó.

## ✅ Lo que Tienes que Hacer AHORA

### Paso 1: Acceder a Nick Argentina

1. Ve a [https://www.nick.com.ar](https://www.nick.com.ar)
2. Inicia sesión con las credenciales del cliente
3. Ve a **"Dominios"** o **"Mis Dominios"**
4. Busca `meleroller.com.ar`
5. Haz clic en **"Gestionar"** o **"Configurar DNS"**

### Paso 2: Configurar el Registro A (OBLIGATORIO)

**Busca o crea un registro A para el dominio raíz:**

```
Tipo: A
Nombre: @ (o raíz, o deja en blanco según la interfaz)
Valor: 216.198.79.1
TTL: 3600 (o automático)
```

**⚠️ IMPORTANTE:**
- Si ya existe un registro A que apunta a otra IP (probablemente de Dattatec), **MODIFÍCALO** para que apunte a `216.198.79.1`
- Si no existe, **AGREGA** uno nuevo

### Paso 3: Configurar el Registro para www (RECOMENDADO)

**Busca o crea un registro CNAME para www:**

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Si Nick Argentina no soporta CNAME, usa:**
```
Tipo: A
Nombre: www
Valor: 216.198.79.1
TTL: 3600
```

### Paso 4: Guardar y Esperar

1. **Guarda los cambios** en Nick Argentina
2. **Espera entre 15 minutos y 48 horas** para la propagación DNS
3. **Vuelve a Vercel** y verifica el estado

## 🔍 Cómo Verificar que Está Funcionando

### Opción 1: Verificar en la Terminal

```bash
# Verificar el registro A
dig meleroller.com.ar A

# Debería mostrar: 216.198.79.1
```

### Opción 2: Verificar Online

Ve a [https://www.whatsmydns.net/#A/meleroller.com.ar](https://www.whatsmydns.net/#A/meleroller.com.ar)

Debería mostrar `216.198.79.1` en la mayoría de los servidores DNS.

### Opción 3: Verificar en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** > **Domains**
3. El estado debería cambiar de:
   - ❌ "Invalid Configuration" → ✅ "Valid"

## ⚠️ Registros que NO debes tocar

**NO modifiques estos registros (son para email):**
- **MX** (para email, ej: `info@meleroller.com.ar`)
- **TXT** (si hay alguno para verificación)
- **SPF, DKIM, DMARC** (si existen)

## 🐛 Si Sigue Dando Error Después de Configurar

### 1. Verifica que los registros estén correctos

- Asegúrate de que el registro A para `@` tenga el valor `216.198.79.1`
- Verifica que no haya errores de tipeo
- Toma capturas de pantalla de los registros en Nick Argentina

### 2. Espera la propagación

- Puede tomar hasta 48 horas
- Usa [whatsmydns.net](https://www.whatsmydns.net/) para verificar la propagación global

### 3. Contacta a Nick Argentina

- Si después de 48 horas sigue dando error, puede haber un problema
- Ellos pueden ayudarte a verificar la configuración

## 📋 Checklist Rápido

- [ ] Accedí al panel de Nick Argentina
- [ ] Configuré el registro A para `@` con valor `216.198.79.1`
- [ ] Configuré el registro CNAME o A para `www`
- [ ] Guardé los cambios
- [ ] NO modifiqué los registros MX (email)
- [ ] Esperé al menos 15 minutos
- [ ] Verifiqué en Vercel el estado del dominio

## 🎯 Resultado Esperado

Una vez que los DNS se propaguen:
- ✅ Vercel mostrará "Valid" en lugar de "Invalid Configuration"
- ✅ El SSL se generará automáticamente
- ✅ El sitio estará disponible en `www.meleroller.com.ar`

