import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { RoyalePlacements } from "./royalePlacements";
import { GameModeIdentifier } from "/types/single/gameMode";

export class BattleRoyale implements IGameMode {
	public name = GameModeIdentifier.BATTLE_ROYALE as const;
	private placements = new RoyalePlacements();
  private nextPlacement = 0;
  private playerFinished = 0;
  private nextWinPlacement = 1;  // TODO: This is temporary for now so that we get nice rankings for single-round mode

  // Register each existing player into the RoyalePlacements instance
	public init(session: GameSession, io: Server, socket: Socket): void {
    for (const p of session.getPlayers().getItems()) {
			this.placements.register(p.getId(), p.getName());
      this.nextPlacement += 1;
		}
		console.log("[INIT]: ", this.placements.getPlayerRoyalePlacements());
    console.log("[INIT]: ", this.nextPlacement);
  }

	public onActionExecuted(sesion: GameSession): void { }

  // TODO: Is this the correct way to handle draws?
	public onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket) {
    // Case 1: There is a winner
    if (winner) {
      let loser = battle.getPlayers().filter((player) => player.getId() != winner.getId())[0];
      this.placements.setPlayerPlacement(loser.getId(), this.nextPlacement);
      this.nextPlacement -= 1;

      // TODO: Temp setting winner placement (remove later when multi-round is implemented)
      this.placements.setPlayerPlacement(winner.getId(), this.nextWinPlacement);
      this.nextWinPlacement += 1;
    }

    // Case 2: It is a draw - there are no winners
    else {
      let player1 = battle.getPlayers()[0];
      this.placements.setPlayerPlacement(player1.getId(), this.nextPlacement);
      let player2 = battle.getPlayers()[1];
      this.placements.setPlayerPlacement(player2.getId(), this.nextPlacement);
      this.nextPlacement -= 2;
    }
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

	public isSessionConcluded(session: GameSession): boolean {
    return session.areBattlesConcluded();
	}

  public addPlayer(playerId: string, name: string): void {
    let prevNumPlayers = this.placements.getPlayerRoyalePlacements().size;
    this.placements.register(playerId, name);
    let currNumPlayers = this.placements.getPlayerRoyalePlacements().size;
    if (currNumPlayers > prevNumPlayers) {
      this.placements.numPlayersChanged(1);
    }
  }

  // TODO: Thought - should a player that leaves mid-session just be treated
  //                 as an instant loss instead, and we simply keep them in
  //                 the final placement standings?
  public removePlayer(playerId: string): void {
    if (this.placements.removePlayer(playerId)) {
      this.placements.numPlayersChanged(-1);
    }
  }
}
