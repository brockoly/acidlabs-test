const app = require('./app');
const http = require('http');

const server = http.createServer(app);
const port = 5000;

app.set('port', port);

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
