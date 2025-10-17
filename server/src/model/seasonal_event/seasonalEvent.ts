import { Monster } from "../game/monster/monster";
import { Player } from "../game/player";

export abstract class SeasonalEvent {
    private id: string;
    private name: string;
    private monster: Monster;
    private description: string;
    private player: Player | undefined;

    constructor (
        id: string,
        name: string,
        monster: Monster,
        description: string,
        player: Player
    ) {
        this.id = id;
        this.name = name;
        this.monster = monster;
        this.description = description;
        this.player = player;
    }

    public getPlayer(): Player | undefined {
        return this.player;
    }

}