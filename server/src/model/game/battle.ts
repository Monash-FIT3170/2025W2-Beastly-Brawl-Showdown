import { Player } from "./player"; // Adjust the path based on the actual location of the Player definition
import { UUID } from "crypto";

export class Battle {
  private id: UUID;
  private players: Map<string, Player> = new Map();

  constructor(id: UUID, player1: Player, player2: Player) {
    this.id = id;
    this.players.set(player1.getId(), player1);
    this.players.set(player2.getId(), player2);
  }

  public getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  public getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  public getId(): UUID {
    return this.id;
  }
}
