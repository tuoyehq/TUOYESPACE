const http = require("http");
const fs = require("fs");
const path = require("path");
const M = {
  html: "text/html;charset=utf-8",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  ico: "image/x-icon"
};
http.createServer((q, s) => {
  let f = path.join(__dirname, q.url === "/" ? "index.html" : decodeURI(q.url));
  if (!fs.existsSync(f)) { s.writeHead(404); s.end(); return; }
  const e = path.extname(f).slice(1).toLowerCase();
  s.writeHead(200, { "Content-Type": M[e] || "application/octet-stream" });
  fs.createReadStream(f).pipe(s);
}).listen(3001, () => console.log("http://localhost:3000"));

