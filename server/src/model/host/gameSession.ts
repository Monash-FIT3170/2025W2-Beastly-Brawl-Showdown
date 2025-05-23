import { Player } from "../game/player";
import Queue from "../../utils/queue";
import { Battle } from "../game/battle";
import { battles } from "../../../main";
import { BattleState } from "/types/composite/battleState";

export default class GameSession {
  hostUID: string;
  players: Queue<Player>;
  battles: Queue<Battle>;
  private gameCode: number;
  private player_max: number = 8; // Max 8 players
  private battle_max: number = 4; // Max 4 battles

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

  // Getters and setters
  public getHost(): string {
    return this.hostUID;
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

  // Add player to Game Session queue
  public addPlayer(player: Player): boolean {
    // UPDATE: popup error messages for each of these
    if (!this.canSocketJoin(player.getId())) {
      console.log("Player already in game session");
      return false; // Player rejected
    }
    if (!this.isPlayerNameFree(player.getName())) {
      console.log("Player name already taken");
      return false; // Player rejected
    }
    if (this.players.size() >= this.player_max) {
      console.log("Game session is full");
      return false; // Player rejected
    }
    this.players.enqueue(player); // Add player to the queue
    return true; // Player accepted
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
    // UPDATE: need to add that all monsters have been picked
    return true;
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
      if (p.getId().toLocaleLowerCase() === name.toLocaleLowerCase()) {
        // UPDATE: pop-up, need to return an error
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

        const battle = new Battle(battleId, player1Indexed, player2Indexed, this.hostUID);

        battles.set(battleId, battle)

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
    // UPDATE: handle odd player
    return oddPlayer;
  }

  public getGameSessionState(): BattleState[] {

    const allBattles = [];

    for (const battle of this.battles.getItems()) {
      var firstPlayer = battle.getPlayers()[0];
      allBattles.push(battle.getBattleState(firstPlayer.getId()));
    }

    return allBattles;

  }

}
