import { Vector2 } from 'three';
import { Board, GameConfig, Player, SetPositionPayload } from './game.types';
import { DEFAULT_BALL_POSITION, DEFAULT_BOARD } from './game.constants';
import { GameState } from '@pong/shared';

export class Game {
  players: Player[];
  playersPositions: Record<string, number>;
  ballPosition: Vector2 = DEFAULT_BALL_POSITION;
  board: Board = DEFAULT_BOARD;

  constructor({ board }: GameConfig) {
    if (board) {
      this.board = board;
    }
  }

  setPosition({ id, x }: SetPositionPayload) {
    this.playersPositions[id] = x;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer({ id }: Player) {
    this.players = this.players.filter((player) => player.id === id);
  }

  onUpdate(cb: (state: GameState) => void) {
    cb({
      playersPositions: this.playersPositions,
      ball: {
        position: this.ballPosition,
        isColliding: false,
      },
      obstacles: [],
    });
  }
}
