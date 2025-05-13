//need to reference: https://github.com/Monash-FIT3170/Shazam-3-Scrum-Unleashed/blob/dev/server/src/model/player.ts

export default class Player {

    //not sure what attributes exist

    public userID: string;
    public name: string;
    public score: number;

    constructor(userID: string, name: string){
        this.userID = userID;
        this.name = name;
        this.score = 0;
    }
}