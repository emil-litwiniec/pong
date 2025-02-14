import { Server } from 'http';
import { WsMessage } from '@pong/shared';

import { WebSocketServer } from 'ws';
import { RoomsMenager } from './roomsMenager';
import * as cookie from 'cookie';
import { ExtendedWebSocket } from './types';
import { handleWsMessage } from './wsMessage';
import { ab2str } from '../libs/parsers';
import { gameManager } from '../libs/gameManager/gameManager';

export const createWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server });
  const roomsManager = new RoomsMenager();

  wss.on('listening', () => {
    console.log(`WebSocketServer ${JSON.stringify(wss)}`);
  });

  wss.on('connection', (originalWs, req) => {
    const ws = originalWs as ExtendedWebSocket;
    if (!req.headers.cookie) return;

    const cookies = cookie.parse(req.headers.cookie);
    const sessionId = cookies['connect.sid'];

    const game = gameManager.create('test');
    game.addUpdateListener((state) =>
      ws.send(JSON.stringify({ type: 'state', data: state }))
    );

    game.run();

    ws.sessionId = sessionId;

    if (!sessionId) throw new Error('No session id found.');

    ws.on('error', (error) => {
      console.error(error);
    });

    ws.on('message', (data) => {
      const parsedArrayBuffer = ab2str(data as ArrayBuffer);
      const parsedMessage = JSON.parse(parsedArrayBuffer) as WsMessage;

      handleWsMessage({
        ws,
        roomsManager,
        message: parsedMessage,
      });
    });
  });

  return wss;
};
