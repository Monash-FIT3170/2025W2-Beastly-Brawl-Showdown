import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";
import { SlimeFriend } from "../../game/consumables/storyItem/slimeFriend";
import { Equipment } from "../../game/equipment/equipment";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { Coal } from "../../game/consumables/coal";
import { BasaltShield } from "../../game/equipment/basaltShield";
import { ScorchPowder } from "../../game/consumables/scorchPowder";
import { CharredRoot } from "../../game/consumables/charredRoot";
import { MoltenHeart } from "../../game/storyItem/moltenHeart";
import { StoryItem } from "../../game/storyItem/storyItem";
import { DragonScale } from "../../game/storyItem/dragonScale";

interface LootEntry {
  loot: (() => Consumable) | (() => Equipment) | (() => StoryItem);
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
      id: "oozing_blade",
    },
  ],
  fire_pool: [
    {
      loot: () => new Coal(),
      chance: 5,
      id: "coal",
    },
    {
      loot: () => new BasaltShield(),
      chance: 30,
      id: "basalt_shield",
    },
    {
      loot: () => new ScorchPowder(),
      chance: 30,
      id: "scorch_powder",
    },
    {
      loot: () => new CharredRoot(),
      chance: 30,
      id: "charred_root",
    },
    {
      loot: () => new MoltenHeart(),
      chance: 5,
      id: "molten_heart",
    },
  ],
  cinder_pool: [
    {
      loot: () => new Coal(),
      chance: 5,
      id: "coal",
    },
    {
      loot: () => new BasaltShield(),
      chance: 30,
      id: "basalt_shield",
    },
    {
      loot: () => new ScorchPowder(),
      chance: 30,
      id: "scorch_powder",
    },
    {
      loot: () => new CharredRoot(),
      chance: 30,
      id: "charred_root",
    },
    {
      loot: () => new DragonScale(),
      chance: 5,
      id: "dragon_scale",
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
      console.log(`ADV: Loot Pool (${id}) Selected Item: ${option.id}`);
      return option;
    }
  }

  if (!creator) {
    throw new Error(`Unknown Loot Pool ID: ${id}`);
  }
  return null;
}
