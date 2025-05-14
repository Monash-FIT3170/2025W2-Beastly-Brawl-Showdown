import { Player } from "./player"; // Adjust the path based on the actual location of the Player definition
import { UUID } from "crypto";
import { BattleState } from "/types/composite/battleState"; // Adjust the path based on the actual location of the BattleState definition

export class Battle {
  private id: UUID;
  private players: Map<string, Player> = new Map();
  private turn: number = 0;

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

  public getTurn(): number {
    return this.turn;
  }

  public incTurn(): void {
    this.turn++;
  }

  public clearBattleLogs(): void {
    this.players.forEach((player) => {
      player.clearLogs();
    });
  }

  // Battle state is different for each player
  public getBattleState(currentPlayerId: string): BattleState {
    const currentPlayer = this.getPlayer(currentPlayerId);

    const opponentPlayer = this.getPlayers().find(
      (player) => player.getId() !== currentPlayerId
    );

    // Since there is no way for a player to be "removed" from the battle, it is same to assume that they must exist - so we can use !
    return {
      id: this.id,
      turn: this.turn,
      yourPlayer: currentPlayer!.getPlayerState(),
      yourPlayerMonster: currentPlayer!.getMonster().getMonsterState(),

      opponentPlayer: opponentPlayer!.getPlayerState(),
      opponentPlayerMonster: opponentPlayer!.getMonster().getMonsterState(),
    };
  }
  public isBattleOver(): boolean {
    return Array.from(this.players.values()).some(
      (player) => player.getHealth() == 0 
    )
  }
  public getWinner(): string| null {
    const alive_players = Array.from(this.players.values()).filter((player) => player.getHealth() > 0)
    return alive_players.length === 1? alive_players[0].getName(): null;
  }
}
