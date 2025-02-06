import { Server } from 'http';

import { WebSocketServer } from 'ws';

export const createWebSocketServer = (server: Server) => {
  const ws = new WebSocketServer({ server });

  ws.on('listening', () => {
    console.log(`WebSocketServer ${JSON.stringify(ws)}`);
  });

  ws.on('connection', (wsConnection) => {
    wsConnection.on('error', (error) => {
      console.error(error);
    });

    wsConnection.on('message', () => {
      wsConnection.send('Hello from wsConnection');
    });
  });

  return ws;
};
