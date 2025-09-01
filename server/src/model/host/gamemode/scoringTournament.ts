import { Server,Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { ScoreBoard } from "./scoreboard";
import { battles } from "/server/main";
import { GameModeIdentifier } from "/types/single/gameMode";
import { ScoringConfig } from "/types/single/scoringConfig";
import proceedBattleTurn from "/server/src/socket/battle/startBattleHandler";
import { ActionResult } from "/types/single/actionState";
import { BonusSystem, defaultBonus } from "/types/single/playerScore";
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";

export class ScoringTournament implements IGameMode{
	name = GameModeIdentifier.SCORING as const;
	private board = new ScoreBoard()
	private config: ScoringConfig;
	private round = 1;
	private playerFinished: number = 0;
	private bonus: BonusSystem = defaultBonus ;

	constructor(cfg: ScoringConfig){
		this.config = cfg
	}

	//Register each existing player into the ScoreBoard instance
	init(session: GameSession, io: Server, socket: Socket){
		for (const p of session.getPlayers().getItems()){
			this.board.register(p.getId(), p.getName())
		}

	}

	//TODO: calculate bonus points for the previous turn
	onActionExecuted(sesion: GameSession, player1Id: string, player1Result: ActionResult, player2Id: string, player2Result: ActionResult): void {
		if (player1Result.appliedStatus.success){
			this.board.setScore(player1Id, {
				bonuses: this.bonus.debuff
			})
		}

		if (player2Result.appliedStatus.success){
			this.board.setScore(player2Id, {
				bonuses: this.bonus.debuff
			})
		}
		console.log("Scoreboard: ", this.board.showBoard())
	}

	

	//Update the scoreboard
	//TODO: Add Player to waiting room 
	onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void {
		if (winner){
			this.board.setScore(winner.getId(), {
				bonuses: this.bonus.win
			})
		}

		console.log("[GAME ENDED] Scoreboard: ", this.board.showBoard())

		io.to(battle.getId()).emit("battle-closed", {gameCode : session.getGameCode().toString()})


		io.sockets.sockets.get(battle.getPlayers()[0].getId())?.once("ready_next_battle", () => {
			console.log("Server test 1", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
			this.playerFinished += 1
			console.log(this.playerFinished,session.getPlayers().getItems().length)
			if ( this.playerFinished == session.getEffectivePlayer()){
				this.onBattlesEnded(session, io, socket)
		}
		})

		io.sockets.sockets.get(battle.getPlayers()[1].getId())?.once("ready_next_battle", () => {
			console.log("Server test 2", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
			this.playerFinished += 1
			console.log(this.playerFinished,session.getPlayers().getItems().length)
			if (this.playerFinished == session.getEffectivePlayer()){
			this.onBattlesEnded(session, io, socket)
		}
		})




		
	}

	//All battles have been concluded, redo the pairing for the next round
	onBattlesEnded(session: GameSession, io: Server, socket: Socket): void {
		if (this.isSessionConcluded(session)){
			//TODO: end session logic here
			return
		}

		console.log("proceed to bext battle")

		setTimeout(() => {
			this.playerFinished = 0
			session.clearBattles();
			this.round += 1;
			session.createMatches();

			for (const battle of session.getBattles().getItems()) {

				for (const player of battle.getPlayers()) {
					player.prepareForNextBattle();
					const playerSocket = io.sockets.sockets.get(player.getId());
					playerSocket?.join(battle.getId());
				}

				io.to(battle.getId()).emit("battle_started", battle.getId());
				proceedBattleTurn(io, socket, session, battle);
			}
		}, 10000)

			
		}

	//Provide metadata of scoring tournament
	getMetadata(): GameSessionStateMetaData {
		return {
			round: this.round,
			playerScore: this.board.showBoard2()
		}
	}
	

	//Check whether the game session has ended
	isSessionConcluded(session: GameSession): boolean {
		return this.round > this.config.rounds
	}

	
	
}