import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";
import { SlimeFriend } from "../../game/consumables/storyItem/slimeFriend";
import { Equipment } from "../../game/equipment/equipment";
import { OozingBlade } from "../../game/equipment/oozingBlade";

interface LootEntry {
  loot: (() => Consumable) | (() => Equipment);
  chance: number;
  id: string;
}

const LootPoolFactory: Record<string, LootEntry[]> = {
  slime_pool: [
    {
      loot: () => new SlimeSubstance(),
      chance: 50,
      id: "slime_substance",
    },
    {
      loot: () => new OozingBlade(),
      chance: 50,
      id: "oozingBlade",
    },
  ],
};

export function createLoot(id: string): LootEntry | null {
  const creator = LootPoolFactory[id];
  const roll = Math.random() * 100;
  var chanceTotal = 0;
  for (const option of creator) {
    chanceTotal += option.chance!;
    if (roll < chanceTotal) {
      console.log("THIS IS THE CHOSEN OPTION", option);
      return option;
    }
  }

  if (!creator) {
    throw new Error(`Unknown Loot Pool ID: ${id}`);
  }
  return null;
}
