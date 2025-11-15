const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => { 
  // console.log(req.headers.host);
  const hostDomain = req.headers.host || 'localhost:8000'; //Get domainHost + port to form an absolute URL
  const parsedUrl = new URL(req.url, `http://${hostDomain}`); //WHATWG URL requires a full URL, not just a path
  const pathname = parsedUrl.pathname; //Clean path (no query string) for routing
  // console.log(pathname);

  if (pathname === '/favicon.ico') {
    res.writeHead(204); // No Content, browser stops requesting it
    return res.end();
  }

  const logWithEpocDateTime =  `At ${Date.now()} for '${req.url}': New request received!\n`;
//   const logWithNormalDateTime = `At ${new Date().toISOString()} for '${req.url}': New request received!\n`;

  fs.appendFile('log.txt', logWithEpocDateTime, (err) => {
    if (err) console.error('Failed to append log:', err);
  });

  switch (pathname) {
    case '/':
      res.end('Homepage');
      break;
    case '/about':
      res.end('about page loaded');
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found!');
  }
});

myServer.listen(8000, () => console.log('Server Started on port 8000!'));
