import { Vector2 } from 'three';

export type GameState = {
  playersPositions: Record<string, number>;
  ball: {
    position: Vector2;
    isColliding: boolean;
  };
  obstacles: unknown[];
};
