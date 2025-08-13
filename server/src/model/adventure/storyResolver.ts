import { EncounterType, subOutcome } from "/types/composite/storyTypes";
import { createEnemy } from "./factories/enemyFactory";
import { createItem } from "./factories/itemFactory";

export function resolveSubOutcome(raw: subOutcome): subOutcome {
  switch (raw.type) {
    case EncounterType.FIGHT:
      return { ...raw, enemy: createEnemy(raw.enemyId!) };

    case EncounterType.REWARD:
      return { ...raw, item: createItem(raw.itemId!) };

    case EncounterType.STAT_CHANGE:
      return raw;

    default:
      return raw; // purely descriptive outcome
  }
}
