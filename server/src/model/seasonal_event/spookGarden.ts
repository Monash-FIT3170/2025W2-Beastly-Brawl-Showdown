import { RockyRhino } from "../game/monster/rockyRhino";
import { SeasonalEvent } from "./seasonalEvent";

export class SpookGarden extends SeasonalEvent {
    constructor() {
        super(
            "placeHolderID",
            "Spook Garden",
            // Temporarily RockyRhino, but will be a new monster called Jacked o' Lantern
            new RockyRhino(),
            "Fight a buff pumpkin monster in the yearly Halloween event."
        )
    }
}