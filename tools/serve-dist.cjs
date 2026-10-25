/* Preview a production build the way Netlify will serve it.
 *
 *   npm run build && npm run serve:dist      -> http://127.0.0.1:8850/
 *
 * Mirrors the two things a file server does not do: the SPA fallback
 * (/* -> /index.html, from public/_redirects and netlify.toml) and the
 * Cache-Control headers from netlify.toml. Dev-only tool; the site itself
 * has no dependencies.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '../dist/daniel-diaz/browser');
const PORT = Number(process.argv[2] || process.env.PORT || 8850);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.png': 'image/png',
  '.map': 'application/json',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function cacheFor(file) {
  if (file.endsWith('.html')) return 'public, max-age=0, must-revalidate';
  if (/\.(js|css|woff2)$/.test(file)) return 'public, max-age=31536000, immutable';
  if (file.startsWith('/assets/img/')) return 'public, max-age=604800';
  return 'public, max-age=0, must-revalidate';
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.normalize(path.join(DIST, url));

  if (!file.startsWith(DIST)) {
    res.writeHead(403).end('forbidden');
    return;
  }

  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (path.extname(url)) {
      // A missing asset stays a 404, exactly like Netlify without a rewrite.
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    file = path.join(DIST, 'index.html'); // SPA fallback
  }

  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': cacheFor(url),
  });
  fs.createReadStream(file).pipe(res);
});

if (!fs.existsSync(DIST)) {
  console.error('No build found at ' + DIST + '\nRun: npm run build');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log('Serving ' + DIST + '\n-> http://127.0.0.1:' + PORT + '/');
});
