import {Server, Socket} from "socket.io"
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import GameSession from "../gameSession";
import { GameModeIdentifier } from "/types/single/gameMode";

export interface IGameMode {
	name: GameModeIdentifier
	init(session: GameSession, io: Server, socket: Socket): void; //prepare anything necessary for the mode
	onActionExecuted(sesion: GameSession): void //handle logic after a turn ends
	onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void //handle logic after a (single) battle ends
	onBattlesEnded(session: GameSession, io: Server, socket: Socket):void //handle logic after all the battle instances end
	isSessionConcluded(session: GameSession): boolean; //check the end condition for the game mode
	registerSocketHandler(io: Server, socket: Socket, session: GameSession): void //socket handler depending on the mode
}