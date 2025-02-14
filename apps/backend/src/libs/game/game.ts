import { Vector2 } from 'three';
import { Board, GameConfig, Player, SetPositionPayload } from './game.types';
import { DEFAULT_BALL_POSITION, DEFAULT_BOARD } from './game.constants';
import { GameState } from '@pong/shared';
import { v4 } from 'uuid';
import { ticker } from '../ticker';

export class Game {
  players: Player[];
  playersPositions: Record<string, number>;

  ballPosition: Vector2 = DEFAULT_BALL_POSITION;

  board: Board = DEFAULT_BOARD;

  roomId: string;
  id: string;

  updateCb: ((state: GameState) => void) | null = null;

  constructor({ board, roomId }: GameConfig) {
    this.roomId = roomId;

    if (board) {
      this.board = board;
    }

    this.id = v4();
  }

  private setPosition({ id, x }: SetPositionPayload) {
    this.playersPositions[id] = x;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public deletePlayer({ id }: Player) {
    this.players = this.players.filter((player) => player.id === id);
  }

  public run() {
    ticker.subscribe(this.update.bind(this));
  }

  private update(td: number, time: number) {
    const frequency = 0.1;
    const amplitude = 10;

    this.ballPosition.x =
      amplitude * Math.sin((2 * Math.PI * frequency * time) / 1000);

    this.updateCb?.({
      playersPositions: this.playersPositions,
      ball: {
        position: this.ballPosition,
        isColliding: false,
      },
      obstacles: [],
    });
  }

  public addUpdateListener(cb: (state: GameState) => void) {
    this.updateCb = cb;
  }

  public removeUpdateListener() {
    this.updateCb = null;
  }
}
