import { EncounterType, storyOutcomes } from "/types/composite/storyTypes";
import { createEnemy } from "./factories/enemyFactory";
import { createItem } from "./factories/itemFactory";
import { createEquipment } from "./factories/equipmentFactory";

export function resolveOutcome(raw: storyOutcomes): storyOutcomes {
  switch (raw.type) {
    case EncounterType.FIGHT:
      return { ...raw, enemy: createEnemy(raw.enemyId!) };

    case EncounterType.ITEM:
      return { ...raw, item: createItem(raw.itemId!) };

    case EncounterType.STAT_CHANGE:
      return raw;

    case EncounterType.DIALOGUE:
      // If enemyId is present, attach the enemy object
      if (raw.enemyId) {
        return { ...raw, enemy: createEnemy(raw.enemyId) };
      }
      return raw;

    case EncounterType.EQUIPMENT:
      return { ...raw, equipment: createEquipment(raw.equipmentId!) };

    default:
      return raw; // purely descriptive outcome
  }
}
