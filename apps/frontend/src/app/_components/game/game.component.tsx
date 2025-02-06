'use client';

import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://localhost:8080';

export const Game = () => {
  const { sendMessage } = useWebSocket(WS_URL);

  const handleSendMessage = () => {
    sendMessage('hello from game frontend');
  };

  return <button onClick={handleSendMessage}>SEND MESSAGE</button>;
};
