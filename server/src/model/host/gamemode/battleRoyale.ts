import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";
import { GameModeIdentifier } from "/types/single/gameMode";

export class BattleRoyale implements IGameMode{
	name = GameModeIdentifier.BATTLE_ROYALE as const;
	public init(){}
	public onActionExecuted(sesion: GameSession): void {
	}
	public onBattleEnded(session: GameSession, battle: Battle, winner: Player|null){} 
	public onBattlesEnded(session: GameSession): void {
	}
	public isSessionConcluded(session: GameSession): boolean {
		return session.areBattlesConcluded()
	}

	public getMetadata(): GameSessionStateMetaData {
		return {}
	}
}