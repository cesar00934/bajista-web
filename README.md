# Oscar Arce — Bajista profesional

Página web estática, rápida y responsive para promocionar los servicios musicales de Oscar Arce en Huacho.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP.
2. Sube **todos los archivos de la carpeta** a un repositorio nuevo de GitHub.
3. En Vercel, pulsa **Add New → Project** y selecciona el repositorio.
4. Vercel detectará la configuración incluida. Pulsa **Deploy**.
5. Al terminar, abre el dominio asignado y verifica los botones de WhatsApp, llamada y TikTok.

No necesitas configurar Framework Preset, Build Command ni Output Directory porque ya están en `vercel.json`.

## Dominio propio (recomendado para SEO)

Cuando tengas un dominio, agrégalo en **Vercel → Project → Settings → Domains** y crea la variable de entorno:

- Nombre: `SITE_URL`
- Valor: `https://tudominio.com`
- Entorno: Production

Luego vuelve a desplegar. El build generará automáticamente `canonical`, `robots.txt` y `sitemap.xml` con el dominio correcto.

## Google Search Console

Después de publicar:

1. Agrega el dominio o la URL de Vercel a Google Search Console.
2. Envía `https://tu-dominio/sitemap.xml`.
3. Inspecciona la página principal y solicita indexación.
4. Mantén el nombre, teléfono y ubicación iguales en redes sociales para mejorar la confianza local.

## Editar datos

- Textos: `src/index.html`
- Diseño: `src/css/styles.css`
- Comportamiento: `src/js/main.js`
- Fotos: `src/assets/images/`
- Video: `src/assets/video/`
- Teléfono actual: `989 776 412`
- TikTok actual: `@user351525079256`

## Prueba local opcional

```bash
npm install
npm run dev
```

La web usa recursos locales y no depende de fuentes, librerías ni servidores externos para cargar su diseño.
