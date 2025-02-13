'use client';

import useWebSocket from 'react-use-websocket';
import { GameWrapper } from './_components/gameWrapper';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    fetch('http://localhost:3001/api');
  }, []);

  const { sendJsonMessage, lastMessage } = useWebSocket('ws://localhost:3001');
  const handleSendMessage = () => {
    sendJsonMessage({
      type: 'join',
    });
  };

  useEffect(() => {
    console.warn('DEBUG[68]: page.tsx:21: lastMessage=', lastMessage);
  }, [lastMessage]);
  return (
    <div>
      <button onClick={handleSendMessage}>Send message</button>
      <GameWrapper />
    </div>
  );
}
