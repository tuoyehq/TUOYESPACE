const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const MEDIA_FALLBACK = path.join(__dirname, '..', 'react-site', 'public', 'media');

const M = {
  html: 'text/html;charset=utf-8',
  css: 'text/css',
  js: 'text/javascript',
  json: 'application/json',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  gif: 'image/gif', svg: 'image/svg+xml', ico: 'image/x-icon',
  webp: 'image/webp', tif: 'image/tiff', tiff: 'image/tiff'
};

http.createServer((q, s) => {
  let u = decodeURI(q.url);
  let f = path.join(BASE, u === '/' ? 'index.html' : u);
  if (!fs.existsSync(f) && u.startsWith('/media/')) {
    f = path.join(MEDIA_FALLBACK, path.basename(u));
  }
  if (!fs.existsSync(f)) { s.writeHead(404, {'Content-Type':'text/plain'}); s.end('404'); return; }
  const e = path.extname(f).slice(1).toLowerCase();
  s.writeHead(200, { 'Content-Type': M[e] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
}).listen(3000, () => console.log('http://localhost:3000'));
