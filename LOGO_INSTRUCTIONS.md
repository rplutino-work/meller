# Instrucciones para los Logos

## Ubicación de los archivos

Coloca los logos en la siguiente ubicación:
```
public/images/logos/
```

## Archivos necesarios

Basándome en las descripciones de los logos que proporcionaste, necesitas los siguientes archivos:

### 1. Logo Horizontal (para headers principales)
- **Archivo**: `logo-horizontal.png` o `logo-horizontal.svg`
- **Descripción**: Logo con "MELE" en un rectángulo negro y "ROLLER" al lado
- **Uso**: Header principal del hero section y header sticky

### 2. Logo Horizontal Blanco (para header sticky con fondo negro)
- **Archivo**: `logo-horizontal-white.png` o `logo-horizontal-white.svg`
- **Descripción**: Versión en blanco del logo horizontal (o el mismo logo con filtro CSS)
- **Uso**: HeaderNav (header sticky que aparece al hacer scroll)

### 3. Logo Vertical (opcional, para favicon u otros usos)
- **Archivo**: `logo-vertical.png` o `logo-vertical.svg`
- **Descripción**: Logo con "MELE" en un cuadrado negro (2x2) y "ROLLER" debajo
- **Uso**: Favicon o uso vertical

## Formatos soportados

- PNG (recomendado para logos con transparencia)
- SVG (recomendado para mejor calidad y escalabilidad)
- JPG (si no hay transparencia)

## Tamaños recomendados

- **Logo horizontal**: 320x80px (o proporción 4:1)
- **Logo vertical**: 160x200px (o proporción 4:5)

## Notas

- Si solo tienes el logo horizontal en negro, el sistema aplicará un filtro CSS para convertirlo a blanco en el header sticky
- Los logos se escalarán automáticamente según el contexto
- Asegúrate de que los logos tengan fondo transparente si es necesario

