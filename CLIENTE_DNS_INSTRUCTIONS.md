# Instrucciones para el Cliente - Configuración DNS

## 📋 Lo que Necesitas del Cliente

### Situación Actual del Cliente

- **Dominio registrado en:** Nick Argentina
- **SSL actual en:** Dattatec (probablemente el hosting actual)
- **Necesitamos:** Configurar DNS para apuntar a Vercel

### Opción 1: Que te den acceso al panel DNS (Recomendado)

**Pide al cliente:**
- Acceso al panel de **Nick Argentina** (donde está el dominio)
- O acceso al panel de **Dattatec** (si gestionan el DNS desde ahí)
- Necesitas acceso para modificar los registros DNS

**Con este acceso podrás:**
- Configurar los registros DNS directamente
- Verificar que todo esté correcto
- Hacer cambios rápidos si es necesario

### Opción 2: Que configuren los registros DNS (Alternativa)

Si no pueden darte acceso, pídeles que configuren estos registros DNS:

**Para `www.meleroller.com.ar`:**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600 (o automático)
```

**Para `meleroller.com.ar` (sin www):**
```
Tipo: A
Nombre: @ (o dejar en blanco)
Valor: [IP que Vercel te dará - típicamente 76.76.21.21]
TTL: 3600 (o automático)
```

**O si Nick Argentina soporta ALIAS/ANAME:**
```
Tipo: ALIAS (o ANAME)
Nombre: @
Valor: cname.vercel-dns.com
TTL: 3600
```

**⚠️ IMPORTANTE:**
- **NO modifiques los registros MX** (para email)
- **NO modifiques otros registros** que no sean A/CNAME para www y raíz
- El SSL de Dattatec ya no será necesario, Vercel proporcionará uno nuevo automáticamente

## 📝 Email para el Cliente

Puedes enviarles algo como esto:

---

**Asunto: Configuración DNS para migración del sitio**

Hola,

Para migrar el sitio a la nueva plataforma, necesitamos configurar los registros DNS del dominio `meleroller.com.ar` en Nick Argentina.

**Situación actual:**
- Dominio registrado en: Nick Argentina
- SSL actual en: Dattatec (ya no será necesario, Vercel proporcionará uno nuevo automáticamente)

**Opción A (Recomendada):** Darnos acceso temporal al panel de Nick Argentina para que podamos configurar los registros DNS nosotros.

**Opción B:** Les enviaremos las instrucciones exactas para que configuren los registros DNS ellos mismos en Nick Argentina.

**Importante:**
- El email (si usan info@meleroller.com.ar) seguirá funcionando normalmente
- Solo modificaremos los registros para el sitio web
- No tocaremos los registros de email (MX)

Una vez configurado:
- El sitio funcionará en el mismo dominio (www.meleroller.com.ar)
- SSL se configurará automáticamente (gratis, sin costo adicional)
- No habrá cambios visibles para los usuarios finales
- Todo funcionará igual o mejor que antes

¿Cuál opción prefieren? ¿Tienen acceso al panel de Nick Argentina?

Saludos,

---

## ✅ Confirmación sobre SSL

**SÍ, Vercel proporciona SSL automáticamente:**

1. **SSL Gratuito y Automático:**
   - Vercel emite certificados SSL mediante Let's Encrypt
   - Se renuevan automáticamente
   - Es completamente gratuito

2. **Válido para Mercado Pago:**
   - ✅ El SSL de Vercel es un certificado válido y reconocido
   - ✅ Mercado Pago acepta cualquier certificado SSL válido
   - ✅ Funciona perfectamente para webhooks HTTPS
   - ✅ Cumple con todos los estándares de seguridad

3. **No necesitas configurar nada:**
   - Vercel lo hace automáticamente
   - Solo necesitas configurar el dominio
   - El SSL se genera después de verificar el dominio

## 🔄 Migración de la Configuración

### ¿Puedes migrar la configuración después?

**Sí, pero hay consideraciones:**

1. **Proyecto en Vercel:**
   - El proyecto puede quedarse en tu cuenta de Vercel
   - O puedes transferirlo a una cuenta del cliente

2. **Transferir el Proyecto:**
   - Vercel permite transferir proyectos entre cuentas
   - Settings > General > Transfer Project
   - El cliente necesita crear una cuenta en Vercel

3. **Dominio:**
   - El dominio seguirá apuntando a Vercel
   - Solo necesitas transferir el proyecto
   - O mantenerlo en tu cuenta y darles acceso

4. **Variables de Entorno:**
   - Se pueden exportar/importar
   - O configurarlas en la nueva cuenta

### Opciones Post-Migración:

**Opción A: Mantener en tu cuenta**
- Pro: Tú controlas todo
- Pro: Fácil de mantener
- Contra: Dependen de ti

**Opción B: Transferir a cuenta del cliente**
- Pro: Cliente tiene control total
- Contra: Necesitan aprender Vercel
- Contra: Pueden romper algo

**Opción C: Cuenta compartida**
- Pro: Ambos tienen acceso
- Pro: Puedes ayudar cuando sea necesario
- Contra: Necesitas coordinar cambios

## 📋 Checklist para el Cliente

**Lo que necesitas pedirles:**

- [ ] Acceso al panel DNS (o que configuren los registros)
- [ ] Confirmar dónde está registrado el dominio
- [ ] Confirmar si usan email con el dominio (para no tocar registros MX)
- [ ] Decidir si quieren que el proyecto quede en tu cuenta o transferirlo

## 🔒 Seguridad y SSL

**Preguntas frecuentes:**

**¿El SSL de Vercel es válido?**
✅ Sí, es un certificado SSL válido emitido por Let's Encrypt, reconocido mundialmente.

**¿Funciona con Mercado Pago?**
✅ Sí, Mercado Pago acepta cualquier certificado SSL válido. El SSL de Vercel funciona perfectamente.

**¿Necesito pagar por SSL?**
❌ No, Vercel proporciona SSL gratuito y automático.

**¿Se renueva automáticamente?**
✅ Sí, Vercel renueva el certificado automáticamente antes de que expire.

## 📞 Contacto con el Cliente

**Template de email completo:**

```
Asunto: Migración del sitio - Configuración DNS en Nick Argentina

Hola [Nombre],

Para completar la migración del sitio www.meleroller.com.ar a la nueva 
plataforma, necesitamos configurar los registros DNS del dominio en 
Nick Argentina.

Situación actual:
- Dominio registrado en: Nick Argentina
- SSL actual en: Dattatec (ya no será necesario, Vercel proporcionará 
  uno nuevo automáticamente y gratis)

¿Qué necesitamos?

1. Acceso al panel de Nick Argentina donde gestionan el dominio 
   meleroller.com.ar

   O alternativamente, les enviaremos las instrucciones exactas para 
   que configuren los registros DNS ellos mismos en Nick Argentina.

2. Confirmar si usan email con el dominio (ej: info@meleroller.com.ar)
   para asegurarnos de no afectar el correo. Solo modificaremos los 
   registros para el sitio web, el email seguirá funcionando normalmente.

Una vez configurado:
- El sitio funcionará en el mismo dominio (www.meleroller.com.ar)
- SSL se configurará automáticamente por Vercel (gratis, sin costo)
- No habrá cambios visibles para los usuarios finales
- El email seguirá funcionando normalmente
- Todo funcionará igual o mejor que antes

¿Cuándo podemos coordinar esto? ¿Tienen acceso al panel de Nick Argentina?

Saludos,
[Tu nombre]
```

