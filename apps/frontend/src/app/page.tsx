'use client';

import useWebSocket from 'react-use-websocket';
import { GameWrapper } from './_components/gameWrapper';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL || '');
  }, []);

  const { sendJsonMessage } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || ''
  );
  const handleSendMessage = () => {
    sendJsonMessage({
      type: 'join',
    });
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send message</button>
      <GameWrapper />
    </div>
  );
}
