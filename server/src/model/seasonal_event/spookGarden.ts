import { JackedOLantern } from "../game/monster/jackedOLantern";
import { SeasonalEvent } from "./seasonalEvent";
import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";

export class SpookGarden extends SeasonalEvent {
    constructor() {
        super(
            SeasonalEventIdentifier.SPOOK_GARDEN,
            "Spook Garden",
            // Temporarily RockyRhino, but will be a new monster called Jacked o' Lantern
            new JackedOLantern(),
            "Fight a buff pumpkin monster in the yearly Halloween event."
        )
    }
}