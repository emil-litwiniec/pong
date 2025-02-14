import { GameState } from '@pong/shared';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export const useGameState = (setState?: (state: GameState) => void) => {
  const { lastMessage } = useWebSocket(process.env.NEXT_PUBILC_WS_URL || '');

  useEffect(() => {
    let messageData;
    try {
      messageData = JSON.parse(lastMessage?.data);
    } catch (e) {
      console.error(e);
    }

    if (messageData?.type !== 'state') return;

    setState?.(messageData.data);
  }, [lastMessage, setState]);
};
