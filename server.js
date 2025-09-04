const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Parse URL
  const parsedUrl = url.parse(req.url);
  
  // Prevent directory traversal
  let pathname = path.join(__dirname, parsedUrl.pathname);
  
  // If the path ends with /, serve index.html
  if (parsedUrl.pathname.endsWith('/')) {
    pathname = path.join(__dirname, parsedUrl.pathname, 'index.html');
  }
  
  // Get the file extension
  const ext = path.parse(pathname).ext;
  
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Read the file
  fs.readFile(pathname, (err, data) => {
    if (err) {
      // If the file is not found, try serving index.html for SPA routing
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
          if (err) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
          } else {
            res.setHeader('Content-type', 'text/html');
            res.end(data);
          }
        });
      } else {
        // Some server error
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      }
    } else {
      // If the file is found, set the content type and send data
      res.setHeader('Content-type', MIME_TYPES[ext] || 'application/octet-stream');
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});
