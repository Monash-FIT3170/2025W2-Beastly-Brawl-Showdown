import Player from "./player";
import Queue from "../../utils/queue";

// Temporary Battle class for testing purposes
export default class Battle {
  public id: string;
  public players: Queue<Player>;
  public player1Name: string;
  public player2Name: string;
  public turn: number = 0;

  constructor(battleID: string, player1: Player, player2: Player) {
    this.id = battleID;
    this.players = new Queue<Player>(2);
    this.players.enqueue(player1);
    this.players.enqueue(player2);
    this.player1Name = player1.name;
    this.player2Name = player2.name;
  }
}
