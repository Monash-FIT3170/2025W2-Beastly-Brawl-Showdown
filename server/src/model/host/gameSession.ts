import Player from "../game/player";
import Queue from "../../utils/queue";
import Battle from "../game/battle";

export default class GameSession{
    //game session attributes:
    //need to confirm what attributes
    hostUID: string;
    players: Queue<Player>;
    battles: Queue<Battle>;
    private gameCode : Number;
    
    //constructor
    constructor(hostID: string, presetGameCode?: number) {
        this.hostUID = hostID;
        this.players = new Queue<Player>(8);
        this.battles = new Queue<Battle>(4);

        // Constructor that generates six digit gameCode upon startup or uses preset code
        if (presetGameCode !== undefined) {
            // Use preset game code if provided
            this.gameCode = presetGameCode;
        } else {
            // Generate random six digit code if no preset code is provided
            const generateSixDigitCode = (): number => parseInt(Math.floor(Math.random() * 1000000).toString().padStart(6, '0'), 10);
            this.gameCode = generateSixDigitCode();
        }
    }
    
    //add player to game session queue
    public addPlayer(player: Player){
        //need to add if statements regarding duplicate names etc.
        if (
            this.canSocketJoin(player.userID) &&
            this.isPlayerNameFree(player.name)
          ) {
        this.players.enqueue(player)
          }
    }

    /*
    Function takes a player object as an argument, and then the queue is run through by serving each item until it has looped through the entire queue. If a served item is not the same as the player given in the argument, then it is pushed back into the queue, but if it is the same, then it is not pushed back into the queue  
    */
    public removePlayer(removingPlayerID: String) {
        // Loop to check through each item in the queue
        for (let i = 0; i < this.players.size(); i++) {
            const playerIndexed = this.players.dequeue(); // Serves the current player at the front
            if (playerIndexed != undefined && playerIndexed.userID != removingPlayerID) {
                this.players.enqueue(playerIndexed); // If the player is not the argument one, then put them back in the queue
            }
        }
    }
  
    //check if all requirements are met before starting game
    public canStartGame(): boolean {
        //theoretically when trying to start game call this function
        if(this.players.size() < 2){
            return false;
        }
        //need to add that all monsters have been picked
        return true;
    }
    
    //check if id already exists
    public canSocketJoin(socketId: string): boolean{
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
  
    public getGameCode(){
        return this.gameCode;
    }

    public checkGameCode(inputCode: Number){
        if(inputCode == this.gameCode){
            return true;
        }
        return false;
    }

    public createMatches() {
        // Prepare the battles with the players in them
        const cyclesCount = Math.floor(this.players.size()/2); 

        // Randomising the players into a temporary player queue
        const tempPlayerQueue = new Queue<Player>(this.players.size());
        const previousPosition = 1;
        for (let i = 0; i < this.players.size(); i++) {
            const playerIndexed = this.players.dequeue();

            const currentPosition = Math.random();

            if (playerIndexed != undefined && previousPosition < currentPosition) {
                tempPlayerQueue.enqueuefront(playerIndexed);
                const previousPosition = currentPosition;
            } else if (playerIndexed != undefined) {
                tempPlayerQueue.enqueue(playerIndexed);
                const previousPosition = currentPosition;
            }

        }

        for (let i = 0; i < cyclesCount; i++) {
            // Get the two people that will be battling in the current match by taking them from the queue that randomised their order
            const player1Indexed = tempPlayerQueue.dequeue();
            const player2Indexed = tempPlayerQueue.dequeue();

            // Create a battle and add it to the queue of battles
            const battle = new Battle(player1Indexed,player2Indexed);
            this.battles.enqueue(battle);

            // IDEA TO CONSIDER: Putting the players back into the queue of players after they have been added to their battle
            // if (player1Indexed != undefined && player2Indexed != undefined) {
            //     this.players.enqueue(player1Indexed);
            //     this.players.enqueue(player2Indexed);
            // }
            }

        // Taking into account the case where there's an odd number of players. The odd one out automatically wins and is added back to the queue, as they cannot be put into a battle
        if (tempPlayerQueue.size() != 0) {
            const autoWinPlayer = tempPlayerQueue.dequeue();
            if (autoWinPlayer != undefined) {
                this.players.enqueue(autoWinPlayer);
            }
        }
    }

}