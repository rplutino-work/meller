# 💰 Costos Mensuales - Servidores y Base de Datos

## 📊 Resumen de Servicios Necesarios

Para el sitio de MeleRoller necesitas:

1. **Hosting/Serverless** (Vercel)
2. **Base de Datos PostgreSQL** (Neon, Supabase, o similar)
3. **Servicio de Email SMTP** (opcional, para notificaciones)

---

## 💵 Opción 1: Plan Básico (Recomendado para empezar)

### **Costo Total: $0 - $20 USD/mes**

#### 1. Vercel (Hosting)
- **Plan Hobby (Gratis):**
  - ✅ 100 GB de ancho de banda/mes
  - ✅ Deployments ilimitados
  - ✅ SSL gratuito
  - ✅ Dominio personalizado
  - ✅ CDN global
  - **Costo: $0 USD/mes**

- **Plan Pro (si necesitas más):**
  - ✅ 1 TB de ancho de banda/mes
  - ✅ Analytics avanzado
  - ✅ Más funciones
  - **Costo: $20 USD/mes**

#### 2. Base de Datos PostgreSQL

**Opción A: Neon (Recomendado)**
- **Plan Free:**
  - ✅ 0.5 GB de almacenamiento
  - ✅ 1 proyecto
  - ✅ 1 branch
  - ✅ Auto-suspend después de 5 min de inactividad
  - **Costo: $0 USD/mes**

- **Plan Launch ($19 USD/mes):**
  - ✅ 10 GB de almacenamiento
  - ✅ Sin auto-suspend
  - ✅ Mejor rendimiento
  - ✅ Backup automático
  - **Costo: $19 USD/mes**

**Opción B: Supabase**
- **Plan Free:**
  - ✅ 500 MB de base de datos
  - ✅ 2 GB de almacenamiento de archivos
  - ✅ 50,000 usuarios activos/mes
  - **Costo: $0 USD/mes**

- **Plan Pro ($25 USD/mes):**
  - ✅ 8 GB de base de datos
  - ✅ 100 GB de almacenamiento
  - ✅ Backup diario
  - **Costo: $25 USD/mes**

**Opción C: Railway**
- **Plan Hobby ($5 USD/mes):**
  - ✅ 5 GB de almacenamiento
  - ✅ 512 MB RAM
  - ✅ Backup automático
  - **Costo: $5 USD/mes**

#### 3. Email SMTP (Opcional)

**Opción A: Gmail/Google Workspace**
- **Gmail Personal (Gratis):**
  - ✅ 500 emails/día
  - ⚠️ Requiere "Contraseña de aplicación"
  - **Costo: $0 USD/mes**

- **Google Workspace ($6 USD/mes):**
  - ✅ Email profesional @meleroller.com.ar
  - ✅ 2,000 emails/día
  - ✅ Mejor deliverability
  - **Costo: $6 USD/mes**

**Opción B: SendGrid**
- **Plan Free:**
  - ✅ 100 emails/día
  - ✅ 3,000 emails/mes
  - **Costo: $0 USD/mes**

- **Plan Essentials ($19.95 USD/mes):**
  - ✅ 50,000 emails/mes
  - ✅ Analytics avanzado
  - **Costo: $19.95 USD/mes**

**Opción C: Resend**
- **Plan Free:**
  - ✅ 3,000 emails/mes
  - ✅ 100 emails/día
  - **Costo: $0 USD/mes**

- **Plan Pro ($20 USD/mes):**
  - ✅ 50,000 emails/mes
  - ✅ Dominio personalizado
  - **Costo: $20 USD/mes**

---

## 💵 Opción 2: Plan Recomendado (Producción)

### **Costo Total: $19 - $45 USD/mes**

#### Recomendación:
- **Vercel Hobby:** $0 USD/mes (gratis)
- **Neon Launch:** $19 USD/mes
- **Resend Free o Gmail:** $0 USD/mes
- **Total: $19 USD/mes**

O si necesitas más:
- **Vercel Pro:** $20 USD/mes
- **Neon Launch:** $19 USD/mes
- **Resend Pro:** $20 USD/mes
- **Total: $59 USD/mes**

---

## 💵 Opción 3: Plan Premium (Alto tráfico)

### **Costo Total: $100 - $200 USD/mes**

- **Vercel Pro:** $20 USD/mes
- **Neon Scale:** $69 USD/mes (50 GB, mejor rendimiento)
- **Resend Pro:** $20 USD/mes
- **Total: ~$109 USD/mes**

---

## 📋 Comparativa de Bases de Datos

| Servicio | Plan Gratis | Plan Pago | Mejor Para |
|----------|-------------|-----------|------------|
| **Neon** | ✅ 0.5 GB | $19/mes (10 GB) | Desarrollo y producción |
| **Supabase** | ✅ 500 MB | $25/mes (8 GB) | Apps con autenticación |
| **Railway** | ❌ No hay | $5/mes (5 GB) | Proyectos pequeños |
| **PlanetScale** | ✅ 1 GB | $29/mes (10 GB) | Escalabilidad |
| **Render** | ✅ 90 días gratis | $7/mes (1 GB) | Simplicidad |

---

## 🎯 Recomendación Final

### **Para MeleRoller (Sitio E-commerce):**

**Plan Inicial (0-6 meses):**
- Vercel Hobby: **$0 USD/mes**
- Neon Free: **$0 USD/mes** (o Launch $19 si necesitas sin auto-suspend)
- Gmail/Resend Free: **$0 USD/mes**
- **Total: $0 - $19 USD/mes**

**Plan Producción (6+ meses):**
- Vercel Hobby: **$0 USD/mes** (o Pro $20 si necesitas más)
- Neon Launch: **$19 USD/mes**
- Resend Free: **$0 USD/mes** (o Pro $20 si necesitas más)
- **Total: $19 - $39 USD/mes**

---

## 💡 Consejos para Reducir Costos

1. **Empezar con planes gratuitos:**
   - Vercel Hobby es suficiente para la mayoría de sitios
   - Neon Free funciona bien para desarrollo y sitios pequeños
   - Solo pagar cuando realmente necesites más recursos

2. **Monitorear uso:**
   - Vercel muestra el uso de ancho de banda
   - Neon muestra el uso de almacenamiento
   - Ajustar el plan según necesidad real

3. **Optimizar:**
   - Usar imágenes optimizadas (Next.js Image)
   - Implementar caché donde sea posible
   - Limpiar datos antiguos de la base de datos

---

## 📊 Estimación en Pesos Argentinos (ARS)

**Cotización aproximada (diciembre 2024):**
- $1 USD ≈ $1,000 ARS

**Plan Recomendado:**
- $19 USD/mes ≈ **$19,000 ARS/mes**
- $39 USD/mes ≈ **$39,000 ARS/mes**

**Nota:** Los precios en USD son fijos, pero el cambio a ARS varía.

---

## ✅ Checklist de Configuración

- [ ] Crear cuenta en Vercel (gratis)
- [ ] Crear cuenta en Neon (gratis)
- [ ] Configurar base de datos PostgreSQL
- [ ] Configurar variables de entorno
- [ ] Configurar dominio personalizado
- [ ] Configurar SMTP (Gmail/Resend)
- [ ] Monitorear uso durante el primer mes
- [ ] Ajustar plan según necesidad real

---

## 🔗 Links Útiles

- **Vercel:** https://vercel.com/pricing
- **Neon:** https://neon.tech/pricing
- **Supabase:** https://supabase.com/pricing
- **Resend:** https://resend.com/pricing
- **SendGrid:** https://sendgrid.com/pricing/

---

## 📝 Notas Importantes

1. **Los planes gratuitos suelen ser suficientes para empezar**
2. **Puedes escalar cuando realmente lo necesites**
3. **Vercel y Neon tienen excelentes planes gratuitos**
4. **El costo aumenta principalmente con el tráfico y almacenamiento**
5. **Recomiendo empezar con planes gratuitos y monitorear el uso**

---

## 💬 Preguntas Frecuentes

**¿Cuándo necesito pasar a un plan de pago?**
- Cuando el sitio tenga mucho tráfico (más de 100 GB/mes en Vercel)
- Cuando la base de datos crezca más de 0.5 GB
- Cuando necesites más de 100 emails/día

**¿Puedo cambiar de plan después?**
- Sí, todos los servicios permiten cambiar de plan en cualquier momento
- Puedes bajar o subir según necesidad

**¿Qué pasa si me quedo sin recursos?**
- Vercel: El sitio seguirá funcionando pero puede ser más lento
- Neon: La base de datos se suspenderá después de inactividad (solo en plan free)
- Resend: Los emails dejarán de enviarse hasta el próximo mes

