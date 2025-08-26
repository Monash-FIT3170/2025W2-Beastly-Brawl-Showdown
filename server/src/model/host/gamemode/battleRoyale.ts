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
<<<<<<< HEAD
	private placements = new RoyalePlacements();
  private nextPlacement = 0;
  private playerFinished = 0;
  private nextWinPlacement = 1;  // TODO: This is temporary for now so that we get nice rankings for single-round mode
=======
  private eliminatedPlayers: Player[] = [];  // Earlier eliminated players are closer to the front of the array
  private remainingPlayers: Player[] = [];
  private socket: Socket | null = null;
>>>>>>> 58e1b56f04d1d98d72c2bf8dff90d53bbe2cf88f

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.socket = socket;
    for (let player of session.getPlayers().getItems()) {
		  this.remainingPlayers.push(player);
	  }
	  console.log("[INIT]: ", this.remainingPlayers.map(player => player.getName()));
  }

	public onActionExecuted(session: GameSession): void { }

<<<<<<< HEAD
  // TODO: Is this the correct way to handle draws?
	public onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket) {
=======
	public onBattleEnded(session: GameSession, battle: Battle, winner: Player | null) {
>>>>>>> 58e1b56f04d1d98d72c2bf8dff90d53bbe2cf88f
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
<<<<<<< HEAD
    console.log("[CURRENT STANDINGS]: ", this.placements.getCurrentOrderedRoyalePlacements());

    io.to(battle.getId()).emit("battle-closed", {gameCode : session.getGameCode().toString()})
    const p1 = io.sockets.sockets.get(battle.getPlayers()[0].getId())
    console.log("After battle p1: ", p1)

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

  // TODO: Maybe this needs to be be moved somewhere else...
	public onBattlesEnded(session: GameSession, io: Server, socket: Socket): void {
    // Need to set the first place player's placement
    // This should be the only player without a placement currently
    let firstPlacePlacement = this.placements.getCurrentOrderedRoyalePlacements()[0];
    firstPlacePlacement.placement = this.nextPlacement--;  // This should be 1
    console.log("[FINAL PLACEMENTS]: ", this.placements.getCurrentOrderedRoyalePlacements());
  }
=======

    console.log("[ELIMINATED PLAYERS]: ", this.eliminatedPlayers.map(player => player.getName()));
    console.log("[REMAINING PLAYERS]: ", this.remainingPlayers.map(player => player.getName()));
  }

	public onBattlesEnded(session: GameSession): void { }
>>>>>>> 58e1b56f04d1d98d72c2bf8dff90d53bbe2cf88f

	public isSessionConcluded(session: GameSession): boolean {
    let isSessionConcluded = this.remainingPlayers.length == 1;
    if (isSessionConcluded) {
      let firstPlace = this.remainingPlayers[0];
      let secondPlace = this.eliminatedPlayers[this.eliminatedPlayers.length-1];
      let thirdPlace = this.eliminatedPlayers[this.eliminatedPlayers.length-2];
      this.socket?.emit("top-3-battle-royale", {
        gameCode: session.getGameCode(),
        top3: [firstPlace, secondPlace, thirdPlace]
      });
      console.log(
        "[FINAL RESULTS]: 1st: ", firstPlace.getName(),
        ", 2nd: ", secondPlace.getName(),
        ", 3rd: ", thirdPlace.getName()
      );
    }
    return isSessionConcluded;
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
