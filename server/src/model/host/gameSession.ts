import { Player } from "../game/player";
import Queue from "../../utils/queue";
import { Battle } from "../game/battle";
import { battles } from "../../../main";
import { GameSessionState } from "/types/composite/gameSessionState";
import { Monster } from "../game/monster/monster";
import { GameSessionData } from "/types/other/gameSessionData";
import { BattlePhase } from "../../../../types/composite/battleState";
import { PlayerState } from "/types/single/playerState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { RockyRhino } from "../game/monster/rockyRhino";
import crypto from "crypto";

export default class GameSession {
  private hostUID: string;
  private players: Queue<Player>;
  private battles: Queue<Battle>;
  private gameCode: number;
  private round: number = 1; // Round number
  private player_max: number = 120; // Max 120 players
  private battle_max: number = 60; // Max 60 battles
  private currentPhase: BattlePhase = BattlePhase.CHOOSE_ACTION;

  // Initialise sample data
  private gameSessionData: GameSessionData = {
    mostChosenMonster: { monster: null, percentagePick: "0" },
  };

  constructor(hostID: string, presetGameCode?: number) {
    this.hostUID = hostID;
    // POST-MVP: increase max players and battles
    this.players = new Queue<Player>(this.player_max);
    this.battles = new Queue<Battle>(this.battle_max);

    if (presetGameCode !== undefined) {
      // Use preset game code if provided
      this.gameCode = presetGameCode;
    } else {
      // Generate a new game code
      this.gameCode = this.generateGameCode();
    }
  }

  // Generate game code
  public generateGameCode(): number {
    const generateSixDigitCode = (): number =>
      Math.floor(100000 + Math.random() * 900000);
    this.gameCode = generateSixDigitCode();

    return this.gameCode;
  }

  //Eliminate all the players presented in each battle
  public closeAllBattles(): void {
    this.battles.getItems().forEach((curBattle) => {
      curBattle.eliminateAllPlayers();
    });
  }

  // Getters and setters
  public getHost(): string {
    return this.hostUID;
  }

  public setCurrentPhase(phase: BattlePhase): void {
    this.currentPhase = phase;
  }

  public getCurrentPhase(): BattlePhase {
    return this.currentPhase;
  }

  public getGameCode() {
    return this.gameCode;
  }

  public getBattles() {
    return this.battles;
  }

  public updateHost(hostID: string) {
    this.hostUID = hostID;
  }

  public getPlayers() {
    return this.players;
  }

  // Add player to Game Session queue
  public addPlayer(player: Player): { success: boolean; reason?: string } {
    if (!this.canSocketJoin(player.getId())) {
      return { success: false, reason: "Player already in game session" };
    }
    if (!this.isPlayerNameFree(player.getName())) {
      return { success: false, reason: "Player name is already taken" };
    }
    if (this.players.size() >= this.player_max) {
      return { success: false, reason: "Game is full" };
    }
    this.players.enqueue(player);
    return { success: true };
  }

  // Function takes a player object as an argument, and then the queue is run through by serving each item until it has looped through
  // the entire queue. If a served item is not the same as the player given in the argument, then it is pushed back into the queue, but
  // if it is the same, then it is not pushed back into the queue
  public removePlayer(removingPlayerID: String) {
    // Loop to check through each item in the queue
    const playersSize = this.players.size();
    for (let i = 0; i < playersSize; i++) {
      const playerIndexed = this.players.dequeue(); // Serves the current player at the front
      if (
        playerIndexed != undefined &&
        playerIndexed.getId() != removingPlayerID
      ) {
        this.players.enqueue(playerIndexed); // If the player is not the argument one, then put them back in the queue
      }
    }
  }

  // Check if all requirements are met before starting game
  public canStartGame(): boolean {
    if (this.players.size() < 2) {
      return false;
    }
    // check every player has picked a monster
    for (const p of this.players.getItems()) {
      if (p.getMonster() === null) {
        return false;
      }
    }
    return true;
  }

  public calculateErrors(): string[] {
    var errors: string[] = [];

    if (this.players.size() < 2) {
      errors.push("Not enough players to start the game.");
    }

    for (const p of this.players.getItems()) {
      if (p.getMonster() === null) {
        errors.push(`${p.getName()} has not picked a monster.`);
      }
    }

    return errors;
  }

  // Check if Socket is already in Game Session
  public canSocketJoin(socketId: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.getId() === socketId) {
        return false;
      }
    }
    return true;
  }

  // Check name is not taken
  public isPlayerNameFree(name: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.getName().toLocaleLowerCase() === name.toLocaleLowerCase()) {
        // Name is already taken
        return false;
      }
    }
    return true;
  }

  public createMatches() {
    const playersSize = this.players.size();
    // Prepare the battles with the players in them
    const cyclesCount = Math.floor(playersSize / 2);

    // Randomising the players into a temporary player queue
    const tempPlayerQueue = new Queue<Player>(playersSize);

    let previousPosition = 1;

    for (let i = 0; i < playersSize; i++) {
      const playerIndexed = this.players.dequeue();

      const currentPosition = Math.random();

      if (playerIndexed != undefined && previousPosition < currentPosition) {
        tempPlayerQueue.enqueuefront(playerIndexed);
        previousPosition = currentPosition;
      } else if (playerIndexed != undefined) {
        tempPlayerQueue.enqueue(playerIndexed);
        previousPosition = currentPosition;
      }
    }

    for (let i = 0; i < cyclesCount; i++) {
      // Get the two people that will be battling in the current match by taking them from the queue that randomised their order
      const player1Indexed = tempPlayerQueue.dequeue();
      const player2Indexed = tempPlayerQueue.dequeue();

      // Create a battle and add it to the queue of battles
      if (player1Indexed != undefined && player2Indexed != undefined) {
        let battleId = crypto.randomUUID();

        const battle = new Battle(
          battleId,
          player1Indexed,
          player2Indexed,
          this.hostUID
        );

        battles.set(battleId, battle);

        this.battles.enqueue(battle);

        this.players.enqueue(player1Indexed);
        this.players.enqueue(player2Indexed);
      }

      previousPosition = 1;
    }

    // Taking into account the case where there's an odd number of players. The odd one out automatically wins and is added back to the queue, as they cannot be put into a battle
    if (tempPlayerQueue.size() != 0) {
      const autoWinPlayer = tempPlayerQueue.dequeue();
      if (autoWinPlayer != undefined) {
        this.oddOneOutWinner(autoWinPlayer);
        this.players.enqueue(autoWinPlayer);
      }
    }

    return this.battles;
  }

  public oddOneOutWinner(oddPlayer: Player) {
    let battleId = crypto.randomUUID();
    const placeHolderPlayer = new Player("placeHolder", "Big Bum Loser");
    const placerHolderMonster = new RockyRhino();
    placeHolderPlayer.setMonster(placerHolderMonster);
    placeHolderPlayer.setHealth(0);
    const battle = new Battle(
      battleId,
      oddPlayer,
      placeHolderPlayer,
      this.hostUID
    );
    battles.set(battleId, battle);
    this.battles.enqueue(battle);
    return oddPlayer;
  }

  public calculateMostChosenMonster() {
    // Map from monster name to { monster: Monster, count: number }
    const monsterCount: Record<string, { monster: Monster; count: number }> =
      {};

    //UPDATE: calling error that monster is possibly null.
    this.getPlayers()
      .getItems()
      .forEach((player) => {
        const monster = player.getMonster();
        const monsterId = monster.getId();

        if (monsterCount[monsterId]) {
          monsterCount[monsterId].count++;
        } else {
          monsterCount[monsterId] = { monster, count: 1 };
        }
      });

    let mostPicked: Monster | null = null;
    let maxCount = 0;

    for (const { monster, count } of Object.values(monsterCount)) {
      if (count > maxCount) {
        mostPicked = monster;
        maxCount = count;
      }
    }

    if (mostPicked) {
      this.gameSessionData.mostChosenMonster = {
        monster: mostPicked.getMonsterState(),
        percentagePick:
          this.getPlayers().getItems().length > 0
            ? Math.round(
                (maxCount / this.getPlayers().getItems().length) * 100
              ).toString()
            : "0",
      };
    }
  }

  public areBattlesConcluded(): boolean {
    return this.battles.getItems().every((battle) => battle.isBattleOver());
  }

  public getGameSessionState(): GameSessionState {
    const allBattles = [];
    let remainingPlayers = 0;
    let totalPlayers = this.battles.size() * 2;

    for (const battle of this.battles.getItems()) {
      var firstPlayer = battle.getPlayers()[0];
      allBattles.push(battle.getBattleState(firstPlayer.getId()));
      if (battle.isBattleOver()) {
        remainingPlayers += 1;
      } else {
        remainingPlayers += 2;
      }
    }

    return {
      id: this.gameCode.toString(),
      round: this.round,
      battleStates: allBattles,
      gameSessionData: this.gameSessionData,
      currentPhase: this.currentPhase,
      totalPlayers: totalPlayers,
      remainingPlayers: remainingPlayers,
    };
  }

  public getPlayerStates(): PlayerState[] {
    const playerStates: PlayerState[] = [];
    for (const player of this.players.getItems()) {
      playerStates.push(player.getPlayerState());
    }
    return playerStates;
  }
}
