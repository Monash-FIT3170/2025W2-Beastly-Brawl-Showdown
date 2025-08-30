import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import { battles } from "../../../../main";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameModeIdentifier } from "/types/single/gameMode";
import proceedBattleTurn from "/server/src/socket/battle/startBattleHandler";

export class BattleRoyale implements IGameMode {
  public name = GameModeIdentifier.BATTLE_ROYALE as const;
  private eliminatedPlayers: Player[] = [];  // Earlier eliminated players are closer to the front of the array
  private remainingPlayers: Player[] = [];
  private io: Server | null = null;
  private socket: Socket | null = null;
  private playerFinished = 0;

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.io = io;
    for (let player of session.getPlayers().getItems()) {
      this.remainingPlayers.push(player);
    }
    console.log("[INIT]: ", this.remainingPlayers.map(player => player.getName()));
  }

  public onActionExecuted(session: GameSession): void { }

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
  
    if (winner != null && !this.isSessionConcluded(session)) {
      io.sockets.sockets.get(winner.getId())?.emit("battle-closed", {gameCode : session.getGameCode().toString()})
    }
    const p1 = io.sockets.sockets.get(battle.getPlayers()[0].getId())
    console.log("After battle p1: ", p1)

    if (this.isSessionConcluded(session)) {
      // Handle if it is a draw or not
      let top2;
      if (this.remainingPlayers.length != 0) {  // Is not a draw (i.e., 1 remaining payer - the winner)
        let winner = this.remainingPlayers[0];
        let runnerUp = this.eliminatedPlayers[this.eliminatedPlayers.length-1];
        top2 = [  // Top 2 are the winner and runner up
          winner.getPlayerState(),
          runnerUp.getPlayerState()
        ];
        console.log(`[FINAL RESULTS]: Winner: ${winner.getName()}, Runner up: ${runnerUp.getName()}`);
      } else {  // Is a draw
        console.log(this.eliminatedPlayers.map(p => p.getName()))
        let player1 = battle.getPlayers()[0].getPlayerState();
        let player2 = battle.getPlayers()[1].getPlayerState();
        top2 = [player1, player2];
        console.log(`[FINAL RESULTS]: Draw between: ${top2[0].name} and ${top2[1].name}`);
      }
      const gameCode = session.getGameCode();
      this.io?.to(`game-${gameCode}`).emit("final-results-response", { playersToDisplay: top2 });
      session.setFinalResults(top2);
    }

    io.sockets.sockets.get(battle.getPlayers()[0].getId())?.once("ready_next_battle", () => {
      console.log("Server test 1 (Royale)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
      if (winner != null) {
        session.getWaitQueue().enqueue(winner);
        console.log(`Add player ${winner} to waitQueue`)
        if (session.getWaitQueue().size() > 1) {
          console.log("waitQueue Size large enough")

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

            const gameCodeN = session.getGameCode();

            console.log(`Connecting to ${socket.id}`)
            for (const player of battle.getPlayers()) {
              io.sockets.sockets.get(player.getId())?.join(battle.getId());
            }
            console.log(`Check to start battle ${battle.getId()}`)
            io.to(battle.getId()).emit("battle_started", battle.getId());
            proceedBattleTurn(io, socket, session, battle);
          }

        }
      }
      this.playerFinished += 1
      console.log(this.playerFinished,session.getPlayers().getItems().length)
      if ( this.playerFinished == session.getPlayers().getItems().length){
        this.onBattlesEnded(session, io, socket)
      }
    })

    io.sockets.sockets.get(battle.getPlayers()[1].getId())?.once("ready_next_battle", () => {
      console.log("Server test 2 (Royale)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
      if (winner != null) {
        session.getWaitQueue().enqueue(winner);
        console.log(`Add player ${winner} to waitQueue`)
        if (session.getWaitQueue().size() > 1) {
          console.log("waitQueue Size large enough")

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

            const gameCodeN = session.getGameCode();

            console.log(`Connecting to ${socket.id}`)
            for (const player of battle.getPlayers()) {
              io.sockets.sockets.get(player.getId())?.join(battle.getId());
            }
            console.log(`Check to start battle ${battle.getId()}`)
            io.to(battle.getId()).emit("battle_started", battle.getId());
            proceedBattleTurn(io, socket, session, battle);

          }
        }
      }
      this.playerFinished += 1
      console.log(this.playerFinished,session.getPlayers().getItems().length)
      if (this.playerFinished == session.getPlayers().getItems().length){
      this.onBattlesEnded(session, io, socket)
      }
    })
  }

	public onBattlesEnded(session: GameSession): void {
    if (this.isSessionConcluded(session)) {
      let winner = this.remainingPlayers[0];
      let runnerUp = this.eliminatedPlayers[this.eliminatedPlayers.length-1];
      const top2 = [  // Top 2 are the winner and runner up
        winner.getPlayerState(),
        runnerUp.getPlayerState()
      ];
      const gameCode = session.getGameCode();
      this.io?.to(`game-${gameCode}`).emit("final-results-response", { playersToDisplay: top2 });
      session.setFinalResults(top2);

      console.log(`[FINAL RESULTS]: Winner: ${winner.getName()}, Runner up: ${runnerUp.getName()}`);
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
