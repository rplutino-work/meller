# Guía de Migración de Dominio a Vercel

## ✅ Confirmación Importante: SSL de Vercel

**SÍ, Vercel proporciona SSL automáticamente y es válido para Mercado Pago:**

- ✅ **SSL Gratuito:** Vercel emite certificados SSL mediante Let's Encrypt
- ✅ **Renovación Automática:** Se renuevan automáticamente, no necesitas hacer nada
- ✅ **Válido para Mercado Pago:** El SSL de Vercel es un certificado válido reconocido mundialmente
- ✅ **Webhooks HTTPS:** Funciona perfectamente para webhooks de Mercado Pago
- ✅ **Sin Configuración Manual:** Vercel lo hace todo automáticamente

**No necesitas comprar ni configurar SSL manualmente.** Vercel lo gestiona todo.

## 📋 Pasos para Migrar www.meleroller.com.ar a Vercel

### 1. Configurar el Dominio en Vercel (TÚ LO HACES)

1. **Ve a tu proyecto en Vercel:**
   - Accede a [vercel.com](https://vercel.com)
   - Selecciona tu proyecto `meleroller`

2. **Agrega el dominio:**
   - Ve a **Settings** > **Domains**
   - Haz clic en **Add Domain**
   - Ingresa: `www.meleroller.com.ar`
   - Haz clic en **Add**

3. **Agrega también el dominio sin www (opcional pero recomendado):**
   - Agrega también: `meleroller.com.ar`
   - Vercel te dará instrucciones para redirigir uno al otro

4. **Vercel te mostrará los registros DNS necesarios:**
   - Copia estos registros
   - Los necesitarás para el siguiente paso

### 2. Configurar los Registros DNS (NECESITAS AYUDA DEL CLIENTE)

**IMPORTANTE:** Este paso requiere acceso al panel DNS donde está registrado el dominio. El cliente debe darte acceso o configurarlo ellos mismos.

**Opciones:**

#### Opción A: Que te den acceso (Recomendado)
- Pide acceso al panel de **Nick Argentina** (donde está el dominio)
- O acceso al panel de **Dattatec** (si gestionan el DNS desde ahí)
- Configura los registros tú mismo

#### Opción B: Que lo configuren ellos
- Envía las instrucciones al cliente (ver `CLIENTE_DNS_INSTRUCTIONS.md` y `NICK_ARGENTINA_DNS.md`)
- Ellos configuran los registros DNS en Nick Argentina

**Registros DNS que Vercel te mostrará (típicamente):**

#### Registros que Vercel te está pidiendo:

**Para `meleroller.com.ar` (dominio raíz, sin www):**
- **Tipo:** `A`
- **Nombre:** `@` (o raíz, según la interfaz de Nick Argentina)
- **Valor:** `216.198.79.1` (IP que Vercel te proporcionó)
- **TTL:** `3600`

**Para `www.meleroller.com.ar` (con www):**
- **Tipo:** `CNAME` (recomendado) o `A`
- **Nombre:** `www`
- **Valor:** `cname.vercel-dns.com` (si CNAME) o `216.198.79.1` (si A Record)
- **TTL:** `3600`

**Nota:** Vercel menciona que los registros antiguos (cname.vercel-dns.com y 76.76.21.21) seguirán funcionando, pero recomienda usar los nuevos (216.198.79.1).

**Ver `CONFIGURACION_DNS_NICK_ARGENTINA.md` para instrucciones detalladas paso a paso.**

### 3. Configurar en Nick Argentina (NECESITAS AYUDA DEL CLIENTE)

**Situación del cliente:**
- **Dominio registrado en:** Nick Argentina
- **SSL actual en:** Dattatec (ya no será necesario, Vercel proporcionará uno nuevo)

**Pasos:**

1. **Accede al panel de Nick Argentina** (con acceso del cliente o pídeles que lo hagan)
   - Ve a [https://www.nick.com.ar](https://www.nick.com.ar)
   - Inicia sesión
   - Ve a "Dominios" > `meleroller.com.ar` > "Gestionar DNS"

2. **Busca la sección de "Registros DNS" o "Zona DNS"**

3. **Configura los registros según lo que Vercel te mostró:**
   - Para `www`: CNAME → `cname.vercel-dns.com`
   - Para raíz: A Record o ALIAS (según lo que Vercel indique)

4. **⚠️ NO modifiques:**
   - Registros MX (para email)
   - Otros registros que no sean A/CNAME para www y raíz

**Ver `NICK_ARGENTINA_DNS.md` para instrucciones detalladas paso a paso.**

### 4. Verificación y SSL (Automático)

1. **Vercel verificará automáticamente el dominio:**
   - Esto puede tomar desde minutos hasta 48 horas (depende de la propagación DNS)
   - **Vercel emitirá automáticamente un certificado SSL gratuito**
   - **No necesitas hacer nada más**

2. **Verifica el estado:**
   - En Vercel > Settings > Domains verás el estado
   - Cuando esté "Valid", el SSL estará activo
   - El SSL es válido para Mercado Pago y todos los servicios

3. **El SSL se renueva automáticamente:**
   - Vercel lo gestiona todo
   - No necesitas preocuparte por renovaciones

### 5. Redirección (Opcional pero Recomendado)

Configura redirecciones en Vercel:

- `meleroller.com.ar` → `www.meleroller.com.ar` (o viceversa)
- Esto se hace en Settings > Domains > Configure

### 6. Actualizar Variables de Entorno

Una vez que el dominio esté configurado, actualiza las variables de entorno en Vercel:

```
NEXT_PUBLIC_BASE_URL=https://www.meleroller.com.ar
```

O deja que Vercel lo configure automáticamente con `VERCEL_URL`.

### 7. Verificar que Todo Funciona

1. **Espera la propagación DNS (puede tomar hasta 48 horas)**
2. **Verifica el SSL:**
   ```bash
   curl -I https://www.meleroller.com.ar
   ```
3. **Prueba todas las funcionalidades:**
   - Homepage
   - Formularios
   - Admin panel
   - Links de pago

## ⚠️ Consideraciones Importantes

### Antes de Cambiar el DNS:

1. **Backup del sitio actual:**
   - Asegúrate de tener un backup completo
   - Documenta cualquier configuración especial

2. **Tiempo de inactividad:**
   - Puede haber un período de inactividad durante la migración
   - Planifica el cambio en un horario de bajo tráfico

3. **Email y SSL de Dattatec:**
   - ⚠️ **CRÍTICO:** Si usan email con el dominio (ej: `info@meleroller.com.ar`), **NO modifiques los registros MX**
   - Solo modifica los registros A/CNAME para el sitio web
   - Los registros MX deben quedarse exactamente como están
   - **El SSL de Dattatec ya no será necesario:** Vercel proporcionará un SSL nuevo automáticamente
   - El email seguirá funcionando normalmente (no toques los registros MX)

4. **Subdominios:**
   - Si tienen otros subdominios (ej: `mail.meleroller.com.ar`), no los modifiques
   - Solo configura `www.meleroller.com.ar` y `meleroller.com.ar`

### Transferencia del Proyecto (Opcional - Después)

**Puedes transferir el proyecto de Vercel al cliente después:**

1. **El cliente crea una cuenta en Vercel** (gratis)
2. **En tu proyecto:** Settings > General > Transfer Project
3. **Ingresa el email del cliente**
4. **El cliente acepta la transferencia**
5. **El proyecto pasa a su cuenta**

**O mantenerlo en tu cuenta:**
- Puedes darles acceso como colaboradores (Settings > Team)
- O mantenerlo completamente en tu cuenta
- Es tu decisión según el acuerdo con el cliente

**Variables de entorno:**
- Se mantienen en el proyecto
- No necesitas reconfigurarlas al transferir

## 🔍 Troubleshooting

### El dominio no se verifica

1. **Verifica que los registros DNS estén correctos:**
   ```bash
   dig www.meleroller.com.ar
   nslookup www.meleroller.com.ar
   ```

2. **Espera la propagación DNS:**
   - Puede tomar hasta 48 horas
   - Usa herramientas como [whatsmydns.net](https://www.whatsmydns.net/)

3. **Verifica en Vercel:**
   - Ve a Settings > Domains
   - Revisa los mensajes de error

### El SSL no se genera

1. **Espera la verificación del dominio:**
   - El SSL solo se genera después de que el dominio esté verificado

2. **Verifica los registros DNS:**
   - Asegúrate de que apunten correctamente a Vercel

3. **Contacta a Vercel:**
   - Si después de 48 horas no funciona, contacta al soporte

## 📚 Referencias

- [Documentación de Vercel - Domains](https://vercel.com/docs/concepts/projects/domains)
- [Vercel DNS Configuration](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

## ✅ Checklist Pre-Migración

- [ ] Backup del sitio actual
- [ ] Documentar configuraciones especiales
- [ ] Verificar que el sitio en Vercel funciona correctamente
- [ ] Tener acceso al panel DNS del proveedor
- [ ] Planificar el cambio en horario de bajo tráfico
- [ ] Comunicar el cambio a los usuarios si es necesario

## ✅ Checklist Post-Migración

- [ ] Dominio verificado en Vercel
- [ ] SSL activo y funcionando
- [ ] Sitio accesible en www.meleroller.com.ar
- [ ] Redirecciones configuradas
- [ ] Variables de entorno actualizadas
- [ ] Todos los formularios funcionando
- [ ] Admin panel accesible
- [ ] Links de pago funcionando
- [ ] Webhook de Mercado Pago actualizado con nueva URL

