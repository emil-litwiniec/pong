import { WsMessage } from '@pong/shared';
import { ExtendedWebSocket } from './types';
import { RoomsMenager } from './roomsMenager';

type HandleMessagePayload = {
  ws: ExtendedWebSocket;
  message: WsMessage;
  roomsManager: RoomsMenager;
};

export const handleWsMessage = ({
  ws,
  roomsManager,
  message,
}: HandleMessagePayload) => {
  switch (message.type) {
    case 'join': {
      const roomId = roomsManager.join(ws.sessionId);
      ws.roomId = roomId;

      ws.send(
        JSON.stringify({
          roomId,
        })
      );
      break;
    }

    case 'leave': {
      roomsManager.leave(ws.sessionId);
      ws.roomId = undefined;

      ws.send(
        JSON.stringify({
          roomId: undefined,
        })
      );
      break;
    }

    case 'input': {
      // TODO: Update game state
      break;
    }
  }
};
