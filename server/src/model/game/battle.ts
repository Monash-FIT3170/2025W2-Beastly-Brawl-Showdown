import { Player } from "./player"; // Adjust the path based on the actual location of the Player definition
import { UUID } from "crypto";
import { BattleState } from "/types/composite/battleState"; // Adjust the path based on the actual location of the BattleState definition

export class Battle {
  private id: UUID;
  private players: Map<string, Player> = new Map();

  private gameSessionId: string;

  private turn: number = 0;

  constructor(
    id: UUID,
    player1: Player,
    player2: Player,
    gameSessionId: string
  ) {
    this.id = id;
    this.players.set(player1.getId(), player1);
    this.players.set(player2.getId(), player2);
    this.gameSessionId = gameSessionId;
  }

  public getGameSessionId(): string | undefined {
    return this.gameSessionId;
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
      player.clearBattleLogs();
    });
  }

  // Reduce all the player's health to 0 
  public eliminateAllPlayers(): void {
    this.players.forEach((player) => {
      player.setHealth(0)
    })
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
      isOver: this.isBattleOver();
    };
  }
  public isBattleOver(): boolean {
    return Array.from(this.players.values()).some(
      (player) => player.getHealth() <= 0 //Make sure to handle case where player's health could be negative
    );
  }
  public getWinners(): Player[] | null {
    const alivePlayers = Array.from(this.players.values()).filter(
      (player) => player.getHealth() > 0
    );
  
    if (this.isBattleOver()) {
      // If no players are alive, it's a draw
      return alivePlayers.length === 0
        ? [] // draw: no survivors
        : alivePlayers; 
    }
  
    return null;
  }
}
