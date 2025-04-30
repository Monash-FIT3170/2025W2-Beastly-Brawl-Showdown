
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

    public addPlayer(player: Player){
        //need to add if statements regarding duplicate names etc.
       this.players.enqueue(player)
    }

    public canStartGame(): boolean {
        //theoretically when trying to start game call this function
        if(this.players.size() < 2){
            return false;
        }
        return true;
    }

}