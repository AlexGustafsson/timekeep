const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

const root = path.resolve(__dirname, './dist');

const server = http.createServer((request, response) => {
  let filePath = './dist' + request.url;

  // Ensure that '/' is handled as '/index.html'
  if (filePath === './dist/')
    filePath = './dist/index.html'

  const extension = path.extname(filePath).toLowerCase();

  // All routing is done locally, redirect to main html
  if (extension == 'html')
    filePath = './dist/index.html';

  // Resolve path to mitigate path traverals
  filePath = path.resolve(__dirname, filePath);
  console.log(`Handling request for ${request.url} -> ${filePath}`);

  // Wanted path is outside of web root
  if (filePath.indexOf(root) !== 0)
    return;

  fs.readFile(filePath, (error, content) => {
    // Basic error handling - treat all errors as 404 file not found
    if (error) {
      response.writeHead(404);
      response.end();
      return;
    }

    // Respond with the file
    const contentType = mimeTypes[extension] || 'application/octet-stream';
    response.writeHead(200, {'Content-Type': contentType});
    response.end(content, 'utf-8');
  });

})

server.listen(3000);
console.log('Listening on :3000');
