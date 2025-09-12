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
import { BonusSystem, defaultBonus, StreakIdentifier } from "/types/single/playerScore";
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
			this.board.register(p.getId(), p.getName(), p.getMonster()?.getId())
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
		const winners = this.board.showBoard().map((player) => player.name)
		console.log("[SCORING WINNERS:] ", winners)

		if (winner){
			this.board.setScore(winner.getId(), {
				bonuses: this.bonus.win
			})

			//finished with hp above a certain percentage
			const currentHp = winner.getHealth()
			const maxHp = winner.getMonster()?.getMaxHealth()
			const percHp = Math.round((currentHp / maxHp) * 100)
			if (percHp > this.bonus.finishedWithHpAbove.percentage){
				this.board.setScore(winner.getId(), {
				bonuses: this.bonus.finishedWithHpAbove.bonus
			})
			}
		}

		//Calculate score for the previous battle
		let playersInBattle = battle.getPlayers();

		playersInBattle.forEach((player) => {
			if (winner === null){
				this.board.setScore(player.getId(), {
					bonuses: this.bonus.inStreak,
					currentStreak: StreakIdentifier.DRAW
				})
			} else if (player.getId() === winner.getId()){
					this.board.setScore(player.getId(), {
					bonuses: this.bonus.inStreak,
					currentStreak: StreakIdentifier.WIN
				})
			} else {
					this.board.setScore(player.getId(), {
					bonuses: this.bonus.inStreak,
					currentStreak: StreakIdentifier.LOSE
				})
	}})




		if (this.isSessionConcluded(session)){
			if (session.areBattlesConcluded()){
				const playersInSession = session.getPlayers().getItems()
				playersInSession.forEach((player) => {
					const playerName = player.getName()
					console.log("[POST MATCH (SCORING)]: ", playerName)
					if (winners.includes(playerName)){
						if (!player.isBotPlayer()){
							io.sockets.sockets.get(player.getId())?.emit("battle_end", {
							result: "concluded",
							winners: [playerName] })
						}
					} else {
						if (!player.isBotPlayer()){
							console.log("[POST MATCH LOSING]: ", playerName)
							io.sockets.sockets.get(player.getId())?.emit("battle_end", {
							result: "draw",
							winners: [] })
						}
					}
				})
			} else {
				const playersInBattle = battle.getPlayers()
				playersInBattle.forEach((player) => {
					io.to(battle.getId()).emit("client-wait-conclusion")
				})
			}
			return
		}

		console.log("[GAME ENDED] Scoreboard: ", this.board.showBoard())

		io.to(battle.getId()).emit("battle-closed", {gameCode : session.getGameCode().toString()})
		

		if (session.areBattlesConcluded()){
			socket.emit("host-wait-next-round")
		}
		

		io.sockets.sockets.get(battle.getPlayers()[0].getId())?.once("ready_next_battle", (data) => {
			this.board.setPlayerMonster(battle.getPlayers()[0].getId(), data)
			console.log("Server test 1 (Scoring)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
			this.playerFinished += 1
			console.log(this.playerFinished,session.getPlayers().getItems().length)
			if ( this.playerFinished == session.getEffectivePlayer()){
				// socket.emit("host-prepare-next-round")
				this.onBattlesEnded(session, io, socket)
		}
		})

		io.sockets.sockets.get(battle.getPlayers()[1].getId())?.once("ready_next_battle", (data) => {
			this.board.setPlayerMonster(battle.getPlayers()[1].getId(), data)
			console.log("Server test 2 (Scoring)", io.sockets.sockets.get(battle.getPlayers()[0].getId())?.id)
			this.playerFinished += 1
			console.log(this.playerFinished,session.getPlayers().getItems().length)
			if (this.playerFinished == session.getEffectivePlayer()){
				// socket.emit("host-prepare-next-round")
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
		socket.emit("host-prepare-next-round")

		const handleNextBattle = () => {
		this.playerFinished = 0;
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

		socket.off("start-next-battle", handleNextBattle);
		};

		socket.on("start-next-battle", handleNextBattle);

		// setTimeout(() => {

		// }, 10000)

			
		}

	//Provide metadata of scoring tournament
	getMetadata(): GameSessionStateMetaData {
		return {
			round: this.round,
			playerScore: this.board.showBoard2(),
			top3Score: this.board.showBoard()
		}
	}
	

	//Check whether the game session has ended
	isSessionConcluded(session: GameSession): boolean {
		return this.round == this.config.rounds
	}

	
	
}