import { EncounterType, storyOutcomes } from "/types/composite/storyTypes";
import { createEnemy } from "./factories/enemyFactory";
import { createConsumable } from "./factories/consumableFactory";
import { createEquipment } from "./factories/equipmentFactory";
import { createStatus } from "./factories/statusFactory";
import { createStoryItem } from "./factories/storyItemFactory";

export function resolveOutcome(raw: storyOutcomes): storyOutcomes {
  switch (raw.type) {
    case EncounterType.FIGHT:
      return { ...raw, enemy: createEnemy(raw.enemyId!) };

    case EncounterType.CONSUMABLE:
      return { ...raw, consumable: createConsumable(raw.consumableId!) };

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

    case EncounterType.STORY_ITEM:
      return { ...raw, storyItem: createStoryItem(raw.storyItemId!) };

    case EncounterType.STATUS:
      return {
        ...raw,
        status: createStatus(raw.statusId![0], raw.statusId![1]),
      };

    default:
      return raw; // purely descriptive outcome
  }
}
