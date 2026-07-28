import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'dist');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png',
  '.mp4':'video/mp4','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8',
  '.webmanifest':'application/manifest+json; charset=utf-8'
};

http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(root, safePath === '/' ? 'index.html' : safePath);
    if (!filePath.startsWith(root)) throw new Error('Invalid path');
    try {
      const info = await stat(filePath);
      if (info.isDirectory()) filePath = path.join(filePath, 'index.html');
    } catch {
      if (!path.extname(filePath)) filePath += '.html';
    }
    let data;
    try { data = await readFile(filePath); }
    catch { data = await readFile(path.join(root, '404.html')); res.statusCode = 404; }
    res.setHeader('Content-Type', mime[path.extname(filePath)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.statusCode = 500;
    res.end('Error interno');
  }
}).listen(port, () => console.log(`Web local: http://localhost:${port}`));
