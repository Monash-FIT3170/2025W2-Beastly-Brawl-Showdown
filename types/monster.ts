import { Mongo } from 'meteor/mongo';

export class Monster {
    name: String;
    image: String;

    constructor(name: String, image: String){
        this.name = name;
        this.image = image
    }
}

export const MonstersCollection = new Mongo.Collection<Monster>('monsters')