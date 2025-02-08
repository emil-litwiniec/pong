import { createServer } from 'http';
import { app } from './app';
import { createWebSocketServer } from './ws';
import config from './config';
import { ticker } from './libs/ticker';

const server = createServer(app);
createWebSocketServer(server);

ticker.start();

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
