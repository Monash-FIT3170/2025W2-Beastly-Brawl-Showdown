
import Player from "../game/player";
import Queue from "../../utils/queue";
export default class GameSession{
    //need to confirm what attributes
    hostUID: string;
    players: Queue<Player>; //need to setup queue
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
       this.players.enqueue(player)
    }

    public canStartGame(): boolean {
        //theoretically when trying to start game call this function
        if(this.players.size() < 2){
            return false;
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