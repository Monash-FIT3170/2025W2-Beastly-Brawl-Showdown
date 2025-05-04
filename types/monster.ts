import { Mongo } from 'meteor/mongo';

export class Monster {
    name: string;
    image: string;
    health: number;
    attack: number;
    armourClass: number;

    constructor(name: string, image: string, health: number, attack: number, armourClass: number){
        this.name = name;
        this.image = image
        this.health = health;
        this.attack = attack;
        this.armourClass = armourClass;
    }
}

export const MonstersCollection = new Mongo.Collection<Monster>('monsters')