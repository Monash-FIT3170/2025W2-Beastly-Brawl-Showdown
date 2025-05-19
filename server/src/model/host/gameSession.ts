import Player from "../game/player";
import Queue from "../../utils/queue";

export default class GameSession{
    //need to confirm what attributes
    hostUID: string;
    players: Queue<Player>;
    private gameCode : Number;
  
    constructor(hostID: string, presetGameCode?: number) {
        this.hostUID = hostID;
        this.players = new Queue<Player>(8);
    
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

    public canStartGame(): boolean {
        //theoretically when trying to start game call this function
        if(this.players.size() < 2){
            return false;
        }
        return true;
    }
  
    public canSocketJoin(socketId: string): boolean{
        for (const p of this.players.getItems()) {
            if (p.userID === socketId) {
              return false;
            }
        }
        return true;
    }

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
}