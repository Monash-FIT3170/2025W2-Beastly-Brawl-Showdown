import Player from "../game/player";
import Queue from "../../utils/queue";

export default class GameSession{
    //need to confirm what attributes
    hostUID: string;
    players: Queue<Player>; //need to setup queue


    constructor(hostID: string){
        this.hostUID = hostID;
        this.players = new Queue<Player>(8);
    }

    /*
    Function takes a player object as an argument, and then the queue is run through by serving each item until it has looped through the entire queue. If a served item is not the same as the player given in the argument, then it is pushed back into the queue, but if it is the same, then it is not pushed back into the queue  
    */
    public removePlayer(player: Player) {
        // Loop to check through each item in the queue
        for (let i = 0; i < this.players.size(); i++) {
            const playerIndexed = this.players.dequeue(); // Serves the current player at the front
            if (playerIndexed != undefined && playerIndexed != player) {
                this.players.enqueue(playerIndexed); // If the player is not the argument one, then put them back in the queue
            }
        }
    }

}