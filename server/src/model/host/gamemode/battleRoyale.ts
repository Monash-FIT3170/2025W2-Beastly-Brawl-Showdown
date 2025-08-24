import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameModeIdentifier } from "/types/single/gameMode";

export class BattleRoyale implements IGameMode {
	public name = GameModeIdentifier.BATTLE_ROYALE as const;
  private elimiatedPlayers: Player[] = [];  // Earlier elimiated players are closer to the front of the array
  private remainingPlayers: Player[] = [];
  private socket: Socket | null = null;

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.socket = socket;
    for (let player of session.getPlayers().getItems()) {
		  this.remainingPlayers.push(player);
	  }
	  console.log("[INIT]: ", this.remainingPlayers.map(player => player.getName()));
  }

	public onActionExecuted(session: GameSession): void { }

	public onBattleEnded(session: GameSession, battle: Battle, winner: Player | null) {
    // Case 1: There is a winner
    if (winner) {
      let loser = battle.getPlayers().filter(player => player.getId() != winner.getId())[0];
      this.elimiatedPlayers.push(loser);
      let loserIndex = this.remainingPlayers.findIndex(player => player === loser);
      if (loserIndex != 1) {
        this.elimiatedPlayers.splice(loserIndex, 1);
      }
    }

    // Case 2: It is a draw - there are no winners
    else {
      let player1 = battle.getPlayers()[0];
      this.elimiatedPlayers.push(player1);
      let player1Index = this.remainingPlayers.findIndex(player => player === player1);
      if (player1Index != 1) {
        this.elimiatedPlayers.splice(player1Index, 1);
      }

      let player2 = battle.getPlayers()[1];
      this.elimiatedPlayers.push(player2);
      let player2Index = this.remainingPlayers.findIndex(player => player === player2);
      if (player2Index != 1) {
        this.elimiatedPlayers.splice(player2Index, 1);
      }
    }

    console.log("[ELIMIATED PLAYERS SO FAR]: ", this.elimiatedPlayers.map(player => player.getName()));
  }

	public onBattlesEnded(session: GameSession): void { }

	public isSessionConcluded(session: GameSession): boolean {
    let isSessionConcluded = this.remainingPlayers.length == 1;
    if (isSessionConcluded) {
      this.socket?.emit("top-3-players", {gameCode: session.getGameCode(), top3: [
        this.remainingPlayers[0],                               // 1st place
        this.elimiatedPlayers[this.elimiatedPlayers.length-1],  // 2nd place
        this.elimiatedPlayers[this.elimiatedPlayers.length-2]   // 3rd place
      ]});
    }
    return isSessionConcluded;
  }

  // This is if a player gets added to the lobby/game in the middle of a session,
  // such as a bot player.
  public addPlayer(player: Player): void {
    this.remainingPlayers.push(player);
  }

  // If a player leaves the lobby/game in the middle of a session for whatever reason,
  // this will be treated as an instant elimination.
  public removePlayer(player: Player): void {
    this.elimiatedPlayers.push(player);
  }
}
