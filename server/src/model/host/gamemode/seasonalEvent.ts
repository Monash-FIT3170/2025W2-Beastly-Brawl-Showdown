import { Server, Socket } from "socket.io";
import { Battle } from "../../game/battle";
import { Player } from "../../game/player";
import { battles } from "../../../../main";
import GameSession from "../gameSession";
import { IGameMode } from "./gameMode";
import { GameModeIdentifier } from "/types/single/gameMode";
import { PlayerState } from "../../../../../types/single/playerState";
import { GameSessionStateMetaData } from "../../../../../types/composite/gameSessionState";
import { ActionResult } from "../../../../../types/single/actionState";
import proceedBattleTurn from "../../../socket/battle/startBattleHandler";
import Queue from "../../../utils/queue";

export class SeasonalEvent implements IGameMode {
    public name = GameModeIdentifier.SEASONAL_EVENT as const;
    private io: Server | null = null;
    private round = 1;
    private playerFinished: number = 0;
    private score: Number = 0;
    private players: Queue<Player>;
    private battles: Queue<Battle>;

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.io = io;
    this.score = 0;
  }

  public getPlayers(): Queue<Player> {
    return this.players;
  }

  public addPlayer(player: Player): void {
    this.players.enqueue(player);
  }

  onActionExecuted(sesion: GameSession, player1Id: string, player1Result: ActionResult, player2Id: string, player2Result: ActionResult): void {
        if (player1Result.appliedStatus.success){
            this.score = 0;
        }

        console.log("Score: ", this.score)
    }
  
    //Update the scoreboard
    //TODO: Add Player to waiting room 
    onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void {
        console.log(`Battle Ended`)
  
            //finished with hp above a certain percentage
            const currentHp = winner.getHealth()
            const maxHp = winner.getMonster()?.getMaxHealth()
  
        console.log("[GAME ENDED]")
  
        io.to(battle.getId()).emit("battle-closed", {gameCode : session.getGameCode().toString()})

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
            
        }
    }
    
  
    //Check whether the game session has ended
    // isSessionConcluded(session: GameSession): boolean {
    //     return this.round == this.config.rounds
    // }
}

// export abstract class SeasonalEvent {
//     private id: UUID;
//     private name: string;
//     private monster: Monster;
//     private description: string;
//     private player: Player | undefined;
//     private battle: Battle | undefined;

//     constructor (
//         id: UUID,
//         name: string,
//         monster: Monster,
//         description: string,
//         player: Player
//     ) {
//         this.id = id;
//         this.name = name;
//         this.monster = monster;
//         this.description = description;
//         this.player = player;
//     }

//     public getId(): String | undefined {
//         return this.id;
//     }

//     public getPlayer(): Player | undefined {
//         return this.player;
//     }

//     public getMonster(): Monster | undefined {
//         return this.monster;
//     }

//     public getBattle(): Battle | undefined {
//         return this.battle;
//     }

//     public setBattle(battle: Battle): void {
//         this.battle = battle;
//     }

// }