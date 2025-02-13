import { WebSocket } from 'ws';

export interface ExtendedWebSocket extends WebSocket {
  sessionId?: string;
  roomId?: string;
}
