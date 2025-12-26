# Configuración DNS en Nick Argentina

## 📋 Pasos Específicos para Nick Argentina

### 1. Acceder al Panel de Nick Argentina

1. **Ve a:** [https://www.nick.com.ar](https://www.nick.com.ar)
2. **Inicia sesión** con las credenciales del cliente
3. **Ve a la sección de "Dominios" o "DNS"**

### 2. Localizar el Dominio

1. **Busca el dominio:** `meleroller.com.ar`
2. **Haz clic en "Gestionar" o "Configurar DNS"**
3. **Ve a la sección de "Registros DNS" o "Zona DNS"**

### 3. Configurar los Registros

**IMPORTANTE:** Antes de modificar, toma nota de los registros actuales (especialmente los MX para email).

#### Para `www.meleroller.com.ar`:

1. **Busca si existe un registro CNAME para `www`**
   - Si existe, **modifícalo**
   - Si no existe, **agrégalo**

2. **Configuración:**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   TTL: 3600
   ```

#### Para `meleroller.com.ar` (sin www):

**Vercel te está pidiendo (Método Nuevo - Recomendado):**
```
Tipo: A
Nombre: @ (o raíz, o dejar en blanco)
Valor: 216.198.79.1
TTL: 3600
```

**También necesitas configurar `www.meleroller.com.ar`:**

**Opción A: CNAME (Recomendado)**
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

**Nota:** Vercel menciona que los registros antiguos (cname.vercel-dns.com y 76.76.21.21) seguirán funcionando, pero recomienda usar los nuevos (216.198.79.1).

### 4. ⚠️ Registros que NO debes modificar

**NO toques estos registros:**
- **MX** (para email, ej: `info@meleroller.com.ar`)
- **TXT** (si hay alguno para verificación)
- **SPF, DKIM, DMARC** (si existen para email)
- Otros subdominios (si los hay)

### 5. Guardar y Esperar

1. **Guarda los cambios**
2. **Espera la propagación DNS** (puede tomar hasta 48 horas)
3. **Vercel verificará automáticamente** el dominio
4. **SSL se generará automáticamente** después de la verificación

## 🔍 Verificación

### Verificar que los registros están correctos:

```bash
# Verificar CNAME para www
dig www.meleroller.com.ar CNAME

# Verificar A record para raíz
dig meleroller.com.ar A
```

### Verificar en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings > Domains
3. Verás el estado del dominio
4. Cuando esté "Valid", el SSL estará activo

## 📝 Notas sobre Dattatec

**El SSL de Dattatec:**
- Ya no será necesario una vez que el dominio apunte a Vercel
- Vercel proporcionará un SSL nuevo automáticamente
- No necesitas hacer nada con el SSL de Dattatec

**El hosting de Dattatec:**
- Puede seguir funcionando para otros servicios (email, etc.)
- Solo el sitio web apuntará a Vercel
- El email seguirá funcionando si no tocas los registros MX

## 🆘 Troubleshooting

### Si no encuentras la opción de DNS en Nick Argentina:

1. **Contacta a Nick Argentina:**
   - Pueden tener el DNS gestionado por Dattatec
   - Pregunta dónde se gestionan los registros DNS

2. **Si el DNS está en Dattatec:**
   - Accede al panel de Dattatec
   - Busca la sección de DNS
   - Configura los mismos registros

### Si el dominio no se verifica en Vercel:

1. **Verifica que los registros DNS estén correctos:**
   - Usa `dig` o herramientas online como [whatsmydns.net](https://www.whatsmydns.net/)

2. **Espera la propagación:**
   - Puede tomar hasta 48 horas
   - Nick Argentina puede tener tiempos de propagación más largos

3. **Contacta a Nick Argentina:**
   - Si después de 48 horas no funciona, puede haber un problema con la configuración
   - Ellos pueden ayudarte a verificar los registros

## 📞 Contacto

- **Nick Argentina:** [https://www.nick.com.ar](https://www.nick.com.ar)
- **Soporte:** Pueden ayudarte con la configuración DNS si es necesario

