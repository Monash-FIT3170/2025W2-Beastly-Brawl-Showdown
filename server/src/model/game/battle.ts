import Player from "./player";
import { UUID } from "crypto";

export default class Battle {
  private players: Map<string, Player> = new Map();

  constructor(player1: Player, player2: Player) {
    this.players.set(player1.userID, player1);
    this.players.set(player2.userID, player2);
  }
}
