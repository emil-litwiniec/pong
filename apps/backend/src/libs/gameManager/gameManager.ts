import { Game } from '../game';

export class GameManager {
  static instance: GameManager | null = null;

  private games: Map<string, Game> = new Map();

  constructor() {
    if (!GameManager.instance) {
      GameManager.instance = this;
    }

    return GameManager.instance;
  }

  public get(roomId: string) {
    return this.games.get(roomId);
  }

  public create(roomId: string) {
    const game = new Game({ roomId });

    this.games.set(roomId, game);
    return game;
  }

  public delete(roomId: string) {
    this.games.delete(roomId);
  }
}

export const gameManager = new GameManager();
