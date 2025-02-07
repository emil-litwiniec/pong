'use client';

import { useEffect, useRef } from 'react';
import { Scene } from '../../_lib/three/scene';

export const GameWrapper = () => {
  const sceneTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new Scene(sceneTargetRef);

    return () => {
      scene.dispose();
    };
  }, []);

  return <div ref={sceneTargetRef} />;
};
