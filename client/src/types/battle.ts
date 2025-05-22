import Player from "./player";
import { UUID } from "crypto";
import Queue from "/server/src/utils/queue";

export default class Battle {
  public id: UUID;
  public players: Queue<Player>;
  public player1Name: string;
  public player2Name: string;
  public turn: number = 0;

  constructor(id: UUID, player1: Player, player2: Player) {
    this.id = id;
    this.players = new Queue<Player>(2);
    this.players.enqueue(player1);
    this.players.enqueue(player2);
    this.player1Name = player1.name;
    this.player2Name = player2.name;
  }
}
