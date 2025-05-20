import Player from './player';
import { UUID } from "crypto";

export default class Battle {
  public id: UUID;
  public players: Map<string, Player> = new Map();
  public turn: number = 0;

  constructor(id: UUID, player1: Player, player2: Player) {
    this.id = id;
    this.players.set(player1.getId(), player1);
    this.players.set(player2.getId(), player2);
  }
}