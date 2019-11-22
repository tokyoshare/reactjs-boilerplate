const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');

// validate port
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}

// if port is invalid, set default to 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// create server and set it listen to error and request
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => onListening());
server.on('error', (error) => onError(error));

// events
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${port}` : `Port ${port}`;
  debug(`Listening on ${bind}`);
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
}