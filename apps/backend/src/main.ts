import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const port = process.env.PORT || 3001;
const wsPort = process.env.WS_PORT || 8080;

const ws = new WebSocketServer({ port: +wsPort });

ws.on('listening', () => {
  console.log(`WebSocketServer on port ${wsPort} ${JSON.stringify(ws)}`);
});

ws.on('connection', (ws) => {
  ws.on('error', (error) => {
    console.error(error);
  });

  ws.on('message', (data) => {
    console.warn('DEBUGPRINT[43]: main.ts:20: data=', data);
  });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to PONG server!' });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
