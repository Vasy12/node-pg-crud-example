const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT ?? 3000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
