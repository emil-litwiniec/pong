import { createServer } from 'http';
import { app } from './app';
import { createWebSocketServer } from './ws';
import { port } from './config';

const server = createServer(app);
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
