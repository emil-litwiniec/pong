'use client';

import { useEffect, useRef } from 'react';
import { Scene } from '../../_lib/three';
import { useGameState } from '../../_hooks';

const ws_url = process.env.NEXT_PUBLIC_WS_URL;

export const GameWrapper = () => {
  const sceneTargetRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  useGameState(sceneRef.current?.setState);

  useEffect(() => {
    sceneRef.current = new Scene(sceneTargetRef);

    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  return <div ref={sceneTargetRef} />;
};
