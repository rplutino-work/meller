# Configuración DNS en Nick Argentina - Valores Específicos

## 📋 Registros DNS que Necesitas Configurar

Vercel te está pidiendo estos registros específicos:

### 1. Para `meleroller.com.ar` (dominio raíz, sin www)

```
Tipo: A
Nombre: @ (o raíz, o dejar en blanco)
Valor: 216.198.79.1
TTL: 3600 (o automático)
```

### 2. Para `www.meleroller.com.ar` (con www)

**Opción A: CNAME (Recomendado si Nick Argentina lo soporta)**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Opción B: A Record (si CNAME no funciona)**
```
Tipo: A
Nombre: www
Valor: 216.198.79.1
TTL: 3600
```

## 🔧 Pasos en Nick Argentina

### Paso 1: Acceder al Panel

1. Ve a [https://www.nick.com.ar](https://www.nick.com.ar)
2. Inicia sesión con las credenciales del cliente
3. Ve a **"Dominios"** o **"Mis Dominios"**
4. Busca `meleroller.com.ar`
5. Haz clic en **"Gestionar"** o **"Configurar DNS"**

### Paso 2: Configurar el Registro A para el Dominio Raíz

1. **Busca si existe un registro A para `@` o raíz**
   - Si existe y apunta a otra IP (probablemente de Dattatec), **modifícalo**
   - Si no existe, **agrégalo**

2. **Configuración:**
   - **Tipo:** A
   - **Nombre:** `@` (o raíz, o deja en blanco según la interfaz de Nick Argentina)
   - **Valor:** `216.198.79.1`
   - **TTL:** `3600` (o automático)

### Paso 3: Configurar el Registro para www

1. **Busca si existe un registro para `www`**
   - Si existe un CNAME, **modifícalo**
   - Si existe un A Record, **cámbialo a CNAME** (o déjalo como A con la nueva IP)
   - Si no existe, **agrégalo**

2. **Configuración (Intenta CNAME primero):**
   - **Tipo:** CNAME
   - **Nombre:** `www`
   - **Valor:** `cname.vercel-dns.com`
   - **TTL:** `3600`

   **Si CNAME no funciona en Nick Argentina, usa:**
   - **Tipo:** A
   - **Nombre:** `www`
   - **Valor:** `216.198.79.1`
   - **TTL:** `3600`

### Paso 4: Guardar y Verificar

1. **Guarda los cambios** en Nick Argentina
2. **Espera unos minutos** (puede tomar hasta 48 horas para propagarse)
3. **Vuelve a Vercel** y verifica el estado del dominio

## ⚠️ Registros que NO debes modificar

**NO toques estos registros:**
- **MX** (para email, ej: `info@meleroller.com.ar`)
- **TXT** (si hay alguno para verificación de email)
- **SPF, DKIM, DMARC** (si existen para email)
- Otros subdominios (si los hay)

## 🔍 Verificación

### Verificar en la Terminal:

```bash
# Verificar el registro A para el dominio raíz
dig meleroller.com.ar A

# Debería mostrar: 216.198.79.1

# Verificar CNAME para www
dig www.meleroller.com.ar CNAME

# Debería mostrar: cname.vercel-dns.com
```

### Verificar en Vercel:

1. Ve a tu proyecto en Vercel
2. **Settings** > **Domains**
3. Verás el estado del dominio:
   - **"Valid"** = ✅ Todo correcto, SSL activo
   - **"Invalid Configuration"** = ⚠️ Los registros DNS no están correctos o aún no se propagaron
   - **"Pending"** = ⏳ Esperando verificación

## 🐛 Solución de Problemas

### Error: "Invalid Configuration"

**Posibles causas:**

1. **Los registros DNS aún no se propagaron:**
   - Espera entre 15 minutos y 48 horas
   - Usa [whatsmydns.net](https://www.whatsmydns.net/) para verificar la propagación

2. **Los registros están mal configurados:**
   - Verifica que el registro A para `@` tenga el valor `216.198.79.1`
   - Verifica que el registro para `www` esté correcto
   - Asegúrate de que no haya registros conflictivos

3. **Nick Argentina tiene una interfaz diferente:**
   - Algunos paneles usan "raíz" en lugar de "@"
   - Algunos requieren dejar el nombre en blanco para el dominio raíz
   - Si tienes dudas, contacta a Nick Argentina

### Verificar que los registros están correctos:

```bash
# Verificar registro A
nslookup meleroller.com.ar

# Debería mostrar: 216.198.79.1

# Verificar www
nslookup www.meleroller.com.ar

# Debería mostrar: cname.vercel-dns.com o 216.198.79.1
```

### Si después de 48 horas sigue dando error:

1. **Verifica los registros en Nick Argentina:**
   - Asegúrate de que estén guardados correctamente
   - Toma capturas de pantalla de los registros

2. **Contacta a Nick Argentina:**
   - Pueden ayudarte a verificar la configuración
   - Puede haber algún problema con su sistema DNS

3. **Verifica en Vercel:**
   - Ve a Settings > Domains
   - Revisa los mensajes de error específicos
   - Vercel te dirá exactamente qué registro está mal

## 📝 Checklist

- [ ] Registro A para `@` configurado con valor `216.198.79.1`
- [ ] Registro CNAME o A para `www` configurado
- [ ] Registros MX no modificados (si usan email)
- [ ] Cambios guardados en Nick Argentina
- [ ] Esperando propagación DNS (puede tomar hasta 48 horas)
- [ ] Verificado en Vercel después de esperar

## 📞 Contacto

- **Nick Argentina:** [https://www.nick.com.ar](https://www.nick.com.ar)
- **Soporte Nick Argentina:** Pueden ayudarte con la configuración DNS si es necesario

