import {Server, Socket} from "socket.io"
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { GameModeIdentifier } from "/types/single/gameMode";
import { ActionResult } from "/types/single/actionState";
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";

export interface IGameMode {
	name: GameModeIdentifier
	init(session: GameSession, io: Server, socket: Socket): void; //prepare anything necessary for the mode
	onActionExecuted(sesion: GameSession, player1: Player, player1Result: ActionResult, player2: Player, player2Result: ActionResult): void //handle logic after a turn ends
	onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void //handle logic after a (single) battle ends
	onBattlesEnded(session: GameSession, io: Server, socket: Socket):void //handle logic after all the battle instances end
	isSessionConcluded(session: GameSession): boolean; //check the end condition for the game mode
	getMetadata(): GameSessionStateMetaData; //any meta data that is specifically passed on certain game mode
	isGameModeFinished(): boolean;  // Returns true if the entire game mode is finished, or false otherwise
}