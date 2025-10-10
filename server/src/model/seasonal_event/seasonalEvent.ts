import { Monster } from "../game/monster/monster";

export abstract class SeasonalEvent {
    private id: string;
    private name: string;
    private monster: Monster;
    private description: string;

    constructor (
        id: string,
        name: string,
        monster: Monster,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.monster = monster;
        this.description = description;
    }

}