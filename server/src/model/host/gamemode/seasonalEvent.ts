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
    private playerFinished: number = 0;
    private score: Number = 0;
    private remainingPlayers: Player[] = [];
    private gameModeFinished = false;

  public init(session: GameSession, io: Server, socket: Socket): void {
    this.io = io;
    this.score = 0;
  }

  public getPlayers(): Player[] {
    return this.remainingPlayers;
  }

  public addPlayer(player: Player): void {
    this.remainingPlayers.push(player);
  }

  public isGameModeFinished(): boolean {
    return this.gameModeFinished;
  }

  onActionExecuted(
    sesion: GameSession,
    player1: Player,
    player1Result: ActionResult,
    player2: Player,
    player2Result: ActionResult
  ): void {
    if (player1Result.damageDealt != null) {
      if (player1Result.damageDealt.damage > player1.getMostDamageDealt()) {
        player1.setMostDamageDelt(player1Result.damageDealt.damage);
      }
    }

    if (player2Result.damageDealt != null) {
      if (player2Result.damageDealt.damage > player2.getMostDamageDealt()) {
        player2.setMostDamageDelt(player2Result.damageDealt.damage);
      }
    }

    console.log("[ACTION RESULT]:", player1Result);
    console.log("[ACTION RESULT]:", player2Result);

    if (
      player1Result.usedAbility != null &&
      player1Result.usedAbility.isAbility == true
    ) {
      player1.incAbilitiesUsed(1);
    }

    if (
      player2Result.usedAbility != null &&
      player2Result.usedAbility.isAbility == true
    ) {
      player2.incAbilitiesUsed(1);
    }
  }
  
    //Update the scoreboard
    //TODO: Add Player to waiting room 
    onBattleEnded(session: GameSession, battle: Battle, winner: Player | null, io: Server, socket: Socket): void {
        console.log(`Battle Ended`)
  
            //finished with hp above a certain percentage
            const currentHp = winner.getHealth()
            const maxHp = winner.getMonster()?.getMaxHealth()
  
        console.log("[GAME ENDED]")

        // Case 1: There is a winner
    if (winner) {

      winner.incBattleWon(1);
      let loser = battle
        .getPlayers()
        .filter((player) => player.getId() != winner.getId())[0];
      this.eliminatePlayer(loser);

      io.to(battle.getId()).emit("battle_end", {
        result: "concluded",
        winners: [winner.getName()],
      });
      
    }

    // Case 2: It is a draw - there are no winners
    else {
      io.to(battle.getId()).emit("battle_end", {
        result: "draw",
        winners: [],
      });
    }
        io.to(battle.getId()).emit("battle-closed", {gameCode : session.getGameCode().toString()})
    }

  private eliminatePlayer(player: Player): void {
    let playerIndex = this.remainingPlayers.findIndex(
      (p) => p.getId() == player.getId()
    );
    if (playerIndex != -1) {
      this.remainingPlayers.splice(playerIndex, 1);
    } else {
      console.log(
        `[ERROR]: Could not find player with name '${player.getName()}' in array.`
      );
    }
  }
  
    //All battles have been concluded, redo the pairing for the next round
    onBattlesEnded(session: GameSession, io: Server, socket: Socket): void {
        if (this.isSessionConcluded(session)){
            //TODO: end session logic here
            return
        }
        }
  
    public isSessionConcluded(session: GameSession): boolean {
      return false;
    }

    //Provide metadata of scoring tournament
    getMetadata(): GameSessionStateMetaData {
        return {
            
        }
    }
    
}
