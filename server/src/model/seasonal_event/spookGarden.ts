import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";
import { Player } from "../game/player";
import { MonsterIdentifier } from "../../../../types/single/monsterState";

export class SpookGarden {

    private id: SeasonalEventIdentifier;
    private name: String;
    private description: String;
    private monster: MonsterIdentifier;


    constructor() {

            this.id = SeasonalEventIdentifier.SPOOK_GARDEN,
            this.name = "Spook Garden",
            this.description = "Fight a buff pumpkin monster in the yearly Halloween event.",
            this.monster = MonsterIdentifier.JACKEDOLANTERN;
    }


    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getDescription() {
        return this.description
    }

    public getMonster() {
        return this.monster
    }

}