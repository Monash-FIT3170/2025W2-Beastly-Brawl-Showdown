import Player from "../game/player";
import Queue from "../../utils/queue";
import Battle from "../game/battle";

export default class GameSession{
    //need to confirm what attributes
    hostUID: string;
    players: Queue<Player>; //need to setup queue
    battles: Queue<Battle>;


    constructor(hostID: string){
        this.hostUID = hostID;
        this.players = new Queue<Player>(8);
        this.battles = new Queue<Battle>(4);
    }

    public createMatches() {
        // Prepare the battles with the players in them
        const cyclesCount = Math.floor(this.players.size()/2); 
        for (let i = 0; i < cyclesCount; i++) {
            // Get the two people that will be battling in the current match
            const player1Indexed = this.players.dequeue();
            const player2Indexed = this.players.dequeue();

            // Create a battle and add it to the queue of battles
            const battle = new Battle(player1Indexed,player2Indexed);
            this.battles.enqueue(battle);

            // IDEA TO CONSIDER: Putting the players back into the queue of players
            // if (player1Indexed != undefined && player2Indexed != undefined) {
            //     this.players.enqueue(player1Indexed);
            //     this.players.enqueue(player2Indexed);
            // }

            }
    }

}