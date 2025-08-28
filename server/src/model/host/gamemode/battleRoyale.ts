import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameModeIdentifier } from "/types/single/gameMode";

export class BattleRoyale implements IGameMode {
	public name = GameModeIdentifier.BATTLE_ROYALE as const;
  private eliminatedPlayers: Player[] = [];  // Earlier eliminated players are closer to the front of the array
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
      this.eliminatePlayer(loser);
    }

    // Case 2: It is a draw - there are no winners
    else {
      let player1 = battle.getPlayers()[0];
      this.eliminatePlayer(player1);
      let player2 = battle.getPlayers()[1];
      this.eliminatePlayer(player2);
    }

    console.log("[ELIMINATED PLAYERS]: ", this.eliminatedPlayers.map(player => player.getName()));
    console.log("[REMAINING PLAYERS]: ", this.remainingPlayers.map(player => player.getName()));

    this.onBattlesEnded(session);
  }

	public onBattlesEnded(session: GameSession): void {
    if (this.isSessionConcluded(session)) {
      let firstPlace = this.remainingPlayers[0];
      let secondPlace = this.eliminatedPlayers[this.eliminatedPlayers.length-1];
      let thirdPlace: Player | null = null;
      if (this.eliminatePlayer.length > 1) {
        thirdPlace = this.eliminatedPlayers[this.eliminatedPlayers.length-2];
      }
      this.socket?.emit("top-3-battle-royale", {
        gameCode: session.getGameCode(),
        top3: [firstPlace, secondPlace, thirdPlace]
      });
      console.log(
        "[FINAL RESULTS]: 1st: ", firstPlace.getName(),
        ", 2nd: ", secondPlace.getName(),
        ", 3rd: ", thirdPlace?.getName()
      );
		}
  }

	public isSessionConcluded(session: GameSession): boolean {
    return this.remainingPlayers.length <= 1;
  }

  private eliminatePlayer(player: Player): void {
    let playerIndex = this.remainingPlayers.findIndex(p => p.getId() == player.getId());
    if (playerIndex != -1) {
      this.eliminatedPlayers.push(player);
      this.remainingPlayers.splice(playerIndex, 1);
    } else {
      console.log(`[ERROR]: Could not find player with name '${player.getName()}' in array.`);
    }
  }

  // This is if a player gets added to the lobby/game in the middle of a session,
  // such as a bot player.
  public addPlayer(player: Player): void {
    this.remainingPlayers.push(player);

    console.log("[ELIMINATED PLAYERS]: ", this.eliminatedPlayers.map(player => player.getName()));
    console.log("[REMAINING PLAYERS]: ", this.remainingPlayers.map(player => player.getName()));
  }

  // If a player leaves the lobby/game in the middle of a session for whatever reason,
  // this will be treated as an instant elimination.
  public removePlayer(player: Player): void {
    this.eliminatePlayer(player);

    console.log("[ELIMINATED PLAYERS]: ", this.eliminatedPlayers.map(player => player.getName()));
    console.log("[REMAINING PLAYERS]: ", this.remainingPlayers.map(player => player.getName()));
  }
}
