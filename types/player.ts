import { Monster } from "./monster";
import { Mongo } from "meteor/mongo";


export class Player{
    _id?: string;
    monster?: Monster;

    constructor(){
        
    }

    public setMonster(monster: Monster){
        this.monster = monster
    };
}

export const PlayersCollection = new Mongo.Collection<Player>('players')