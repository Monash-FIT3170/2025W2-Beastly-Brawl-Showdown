import Player from "../game/player";
import Queue from "../../utils/queue";
import Battle from "../game/battle";

export default class GameSession {
  //game session attributes:
  //need to confirm what attributes
  hostUID: string;
  players: Queue<Player>;
  battles: Queue<Battle>;
  private gameCode: number;

  //constructor
  constructor(hostID: string, presetGameCode?: number) {
    this.hostUID = hostID;
    this.players = new Queue<Player>(8);
    this.battles = new Queue<Battle>(4);

    if (presetGameCode !== undefined) {
      // Use preset game code if provided
      this.gameCode = presetGameCode;
    } else {
      // Generate a new game code
      this.gameCode = this.generateGameCode();
    }
  }

  //generate game code
  public generateGameCode(): number {
    // Generate random six digit code if no preset code is provided
    const generateSixDigitCode = (): number =>
      Math.floor(100000 + Math.random() * 900000);
    this.gameCode = generateSixDigitCode();

    return this.gameCode;
  }

  //
  public getHost(): string {
    return this.hostUID;
  }

  //
  public updateHost(hostID: string) {
    this.hostUID = hostID;
  }

  //add player to game session queue
  public addPlayer(player: Player): boolean {
    //need to add if statements regarding duplicate names etc.
    if (!this.canSocketJoin(player.userID)) {
      console.log("Player already in game session");
      return false; // Player rejected
    }
    if (!this.isPlayerNameFree(player.name)) {
      console.log("Player name already taken");
      return false; // Player rejected
    }
    if (this.players.size() >= 8) {
      console.log("Game session is full");
      return false; // Player rejected
    }
    this.players.enqueue(player); // Add player to the queue
    return true; // Player accepted
  }

  /*
    Function takes a player object as an argument, and then the queue is run through by serving each item until it has looped through the entire queue. If a served item is not the same as the player given in the argument, then it is pushed back into the queue, but if it is the same, then it is not pushed back into the queue  
    */
  public removePlayer(removingPlayerID: String) {
    // Loop to check through each item in the queue
    const playersSize = this.players.size();
    for (let i = 0; i < playersSize; i++) {
      const playerIndexed = this.players.dequeue(); // Serves the current player at the front
      if (
        playerIndexed != undefined &&
        playerIndexed.userID != removingPlayerID
      ) {
        this.players.enqueue(playerIndexed); // If the player is not the argument one, then put them back in the queue
      }
    }
  }

  //check if all requirements are met before starting game
  public canStartGame(): boolean {
    //theoretically when trying to start game call this function
    if (this.players.size() < 2) {
      return false;
    }
    // UPDATE: need to add that all monsters have been picked
    return true;
  }

  //check if id already exists
  public canSocketJoin(socketId: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.userID === socketId) {
        return false;
      }
    }
    return true;
  }

  //check name is not taken - need to return an error
  public isPlayerNameFree(name: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        return false;
      }
    }
    return true;
  }

  public getGameCode() {
    return this.gameCode;
  }

  public checkGameCode(inputCode: Number) {
    if (inputCode == this.gameCode) {
      return true;
    }
    return false;
  }

  public getBattles() {
    return this.battles;
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
        const battle = new Battle(this.hostUID, player1Indexed, player2Indexed);
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
    return oddPlayer;
  }
}
