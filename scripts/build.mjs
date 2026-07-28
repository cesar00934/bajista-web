import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });

const rawUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'https://oscar-arce-bajista-huacho.vercel.app';
const siteUrl = rawUrl.startsWith('http') ? rawUrl.replace(/\/$/, '') : `https://${rawUrl.replace(/\/$/, '')}`;
const isProduction = process.env.VERCEL_ENV === 'production' || Boolean(process.env.SITE_URL);

for (const file of ['index.html', '404.html']) {
  const filePath = path.join(dist, file);
  let content = await readFile(filePath, 'utf8');
  content = content.replaceAll('{{SITE_URL}}', siteUrl).replaceAll('{{BUILD_DATE}}', new Date().toISOString());
  await writeFile(filePath, content);
}

const robots = isProduction
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`;
await writeFile(path.join(dist, 'robots.txt'), robots);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`Built site in dist/ for ${siteUrl} (${isProduction ? 'indexable' : 'noindex preview'})`);
