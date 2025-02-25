import { v4 } from 'uuid';
import { gameManager } from '../../libs/gameManager/gameManager';
import { Player } from '../../libs/game/game.types';
import { Game } from '../../libs/game';

export class Room {
  public id: string;
  public players: Player[];
  public game: Game;
  public capacity: number;

  constructor(capacity = 2) {
    this.id = v4();
    this.capacity = capacity;

    this.game = gameManager.create(this.id);
  }

  public join(player: Player) {
    if (this.hasPlayer(player.id)) {
      return;
    }

    this.players.push(player);
  }

  public leave(playerId: string) {
    this.players.filter((player) => player.id !== playerId);
  }

  public hasPlayer(playerId: string) {
    return !!this.players.find((p) => p.id === playerId);
  }

  public get isEmpty() {
    return this.players.length === 0;
  }

  public get canBeJoined() {
    return this.players.length < this.capacity;
  }
}
