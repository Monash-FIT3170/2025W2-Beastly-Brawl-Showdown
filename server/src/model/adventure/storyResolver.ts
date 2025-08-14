import { EncounterType, storyOutcomes } from "/types/composite/storyTypes";
import { createEnemy } from "./factories/enemyFactory";
import { createItem } from "./factories/itemFactory";

export function resolveOutcome(raw: storyOutcomes): storyOutcomes {
  switch (raw.type) {
    case EncounterType.FIGHT:
      return { ...raw, enemy: createEnemy(raw.enemyId!) };

    case EncounterType.ITEM:
      return { ...raw, item: createItem(raw.itemId!) };

    case EncounterType.STAT_CHANGE:
      return raw;

    case EncounterType.DIALOGUE:
      return raw;

    default:
      return raw; // purely descriptive outcome
  }
}
