import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import { battles } from "../../../../main";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameModeIdentifier } from "/types/single/gameMode";
import { PlayerState } from "/types/single/playerState";
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";

export class BattleRoyale implements IGameMode {
  public name = GameModeIdentifier.BATTLE_ROYALE as const;
  private eliminatedPlayers: Player[] = [];  // Earlier eliminated players are closer to the front of the array
  private remainingPlayers: Player[] = [];
  private io: Server | null = null;
  private playerFinished = 0;

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.io = io;
    for (let player of session.getPlayers().getItems()) {
      this.remainingPlayers.push(player);
    }
    console.log("[INIT]: ", this.remainingPlayers.map(player => player.getName()));
  }

  public onActionExecuted(session: GameSession): void { }

  public isPlayerInWaitingQueue(session: GameSession, playerFinding: Player): boolean {
    for (let i = 0; i < session.getWaitQueue().size(); i++) {
      const playerChecking = session.getWaitQueue().dequeue();
      if (playerChecking != undefined) {
        session.getWaitQueue().enqueue(playerChecking);
        if (playerChecking == playerFinding) {
          return true;
        }
      }
    }
    return false;
  }

  public onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void {
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

    this.onBattlesEnded(session, io, socket);

    if (winner != null && !this.isSessionConcluded(session)) {
      io.sockets.sockets.get(winner.getId())?.emit("battle-closed", {gameCode : session.getGameCode().toString()})
    }
    // const p1 = io.sockets.sockets.get(battle.getPlayers()[0].getId());
    // console.log("After battle p1: ", p1);

    io.sockets.sockets.get(battle.getPlayers()[0].getId())?.once("ready_next_battle", () => {
      console.log("Server test 1 (Royale)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id);
      if (winner != null && !this.isPlayerInWaitingQueue(session, winner)) {
        session.getWaitQueue().enqueue(winner);
        console.log(`Add player ${winner} to waitQueue`);
        console.log("Queue Currently has the following players:")
        for (let i = 0; i < session.getWaitQueue().size(); i++) {
          const checkingPlayer = session.getWaitQueue().dequeue();
          if (checkingPlayer != undefined) {
            session.getWaitQueue().enqueue(checkingPlayer);
            console.log(`${checkingPlayer.getName()}`)
          } else {
            console.log("Undefined")
          }
        }
        if (session.getWaitQueue().size() % 2 == 0) {
          console.log("waitQueue Size large enough");

          const player1Indexed = session.getWaitQueue().dequeue();
          const player2Indexed = session.getWaitQueue().dequeue();

          if (player1Indexed != undefined && player2Indexed != undefined) {
          
            let battleId = crypto.randomUUID();

            const battle = new Battle(
              battleId,
              player1Indexed,
              player2Indexed,
              session.getHost()
            );
            battles.set(battleId, battle);
            session.getBattles().enqueuefront(battle);

            console.log(`Connecting to ${socket.id}`);
            for (const player of battle.getPlayers()) {
              io.sockets.sockets.get(player.getId())?.join(battle.getId());
            }
            console.log(`Check to start battle ${battle.getId()}`)
            io.sockets.sockets.get(player1Indexed.getId())?.emit("battle-found", {gameCode : session.getGameCode().toString()})
            io.sockets.sockets.get(player2Indexed.getId())?.emit("battle-found", {gameCode : session.getGameCode().toString()})
          }
        }
      }
      this.playerFinished += 1;
      console.log(this.playerFinished,session.getPlayers().getItems().length);
      if (this.playerFinished == session.getPlayers().getItems().length) {
        this.onBattlesEnded(session, io, socket);
      }
    });

    io.sockets.sockets.get(battle.getPlayers()[1].getId())?.once("ready_next_battle", () => {
      console.log("Server test 2 (Royale)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id);
      if (winner != null  && !this.isPlayerInWaitingQueue(session, winner)) {
        session.getWaitQueue().enqueue(winner);
        console.log(`Add player ${winner} to waitQueue`);
        console.log("Queue Currently has the following players:")
        for (let i = 0; i < session.getWaitQueue().size(); i++) {
          const checkingPlayer = session.getWaitQueue().dequeue();
          if (checkingPlayer != undefined) {
            session.getWaitQueue().enqueue(checkingPlayer);
            console.log(`${checkingPlayer.getName()}`)
          } else {
            console.log("Undefined")
          }
        }
        if (session.getWaitQueue().size() % 2 == 0) {
          console.log("waitQueue Size large enough");

          const player1Indexed = session.getWaitQueue().dequeue();
          const player2Indexed = session.getWaitQueue().dequeue();

          if (player1Indexed != undefined && player2Indexed != undefined) {
          
            let battleId = crypto.randomUUID();

            const battle = new Battle(
              battleId,
              player1Indexed,
              player2Indexed,
              session.getHost()
            );
            battles.set(battleId, battle);
            session.getBattles().enqueuefront(battle);

            console.log(`Connecting to ${socket.id}`);
            for (const player of battle.getPlayers()) {
              io.sockets.sockets.get(player.getId())?.join(battle.getId());
            }
            console.log(`Check to start battle ${battle.getId()}`)
            io.sockets.sockets.get(player1Indexed.getId())?.emit("battle-found", {gameCode : session.getGameCode().toString()})
            io.sockets.sockets.get(player2Indexed.getId())?.emit("battle-found", {gameCode : session.getGameCode().toString()})

          }
        }
      }
      this.playerFinished += 1;
      console.log(this.playerFinished,session.getPlayers().getItems().length);
      if (this.playerFinished == session.getPlayers().getItems().length) {
        this.onBattlesEnded(session, io, socket);
      }
    });
  }

	public onBattlesEnded(session: GameSession, io: Server, socket: Socket): void {
    if (this.isSessionConcluded(session)) {
      let finalWinner: PlayerState | null;

      // There is a clear winner (i.e., 1 player remaining)
      if (this.remainingPlayers.length != 0) {
        finalWinner = this.remainingPlayers[0].getPlayerState();
        console.log(`[FINAL RESULTS]: Winner: ${finalWinner.name}`);
      }

      // There is no clear winner (i.e., 0 players remaining, everyone got eliminated at the same time)
      else {
        finalWinner = null;
        console.log("[FINAL RESULTS]: There are no winners, everyone got eliminated");
      }

      const gameCode = session.getGameCode();
      this.io?.to(`game-${gameCode}`).emit("final-winner-response", { finalWinner });
      session.setFinalWinner(finalWinner);
    }
  }

	public isSessionConcluded(session: GameSession): boolean {
    return this.remainingPlayers.length <= 1;
  }

	public getMetadata(): GameSessionStateMetaData {
    return {};
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
