import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";
import { Equipment } from "../../game/equipment/equipment";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { Coal } from "../../game/consumables/coal";
import { BasaltShield } from "../../game/equipment/basaltShield";
import { ScorchPowder } from "../../game/consumables/scorchPowder";
import { CharredRoot } from "../../game/consumables/charredRoot";
import { MoltenHeart } from "../../game/storyItem/moltenHeart";
import { StoryItem } from "../../game/storyItem/storyItem";
import { DragonScale } from "../../game/storyItem/dragonScale";
import { CinderFlame } from "../../game/consumables/cinderFlame";
import { BlueCrystal } from "../../game/consumables/blueCrystal";
import { RedCrystal } from "../../game/equipment/redCrystal";
import { GreyCrystal } from "../../game/consumables/greyCrystal";
import { PurpleCrystal } from "../../game/equipment/purpleCrystal";
import { BlackCrystal } from "../../game/consumables/blackCrystal";
import { BlackBelt } from "../../game/equipment/blackBelt";
import { FightersBandana } from "../../game/equipment/fightersBracelets";
import { PristineKey } from "../../game/storyItem/pristineKey";
import { AbilityAntidote } from "../../game/consumables/abilityAntidote";
import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { MagicShield } from "../../game/equipment/magicShield";
import { LifeFang } from "../../game/equipment/lifeFang";
import { StickyDie } from "../../game/equipment/stickyDie";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { RegenerationAmulet } from "../../game/equipment/regenerationAmulet";
import { AfflictionGloves } from "../../game/equipment/afflictionGloves";
import { MeekHelmet } from "../../game/equipment/meekHelmet";
import { CoolingPendant } from "../../game/equipment/coolingPendant";
import { CactusNectar } from "../../game/consumables/cactusNectar";
import { SandyEyes } from "../../game/status/sandyEyes";
import { DuneDust } from "../../game/consumables/duneDust";

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
      chance: 15,
      id: "coal",
    },
    {
      loot: () => new ScorchPowder(),
      chance: 45,
      id: "scorch_powder",
    },
    {
      loot: () => new CharredRoot(),
      chance: 40,
      id: "charred_root",
    },
  ],
  cinder_pool: [
    {
      loot: () => new Coal(),
      chance: 5,
      id: "coal",
    },
    {
      loot: () => new CinderFlame(),
      chance: 20,
      id: "cinder_flame",
    },
    {
      loot: () => new PercentageHealthPotion("Super Health Potion", 1.0),
      chance: 20,
      id: "super_health_potion",
    },
    {
      loot: () => new CharredRoot(),
      chance: 50,
      id: "charred_root",
    },
    {
      loot: () => new DragonScale(),
      chance: 5,
      id: "dragon_scale",
    },
  ],
  swamp_slime_pool: [
    {
      loot: () => new BlueCrystal(),
      chance: 10,
      id: "blue_crystal",
    },
    {
      loot: () => new BlackCrystal(),
      chance: 10,
      id: "black_crystal",
    },
    {
      loot: () => new RedCrystal(),
      chance: 20,
      id: "red_crystal",
    },
    {
      loot: () => new PurpleCrystal(),
      chance: 20,
      id: "purple_crystal",
    },
    {
      loot: () => new GreyCrystal(),
      chance: 40,
      id: "grey_crystal",
    },
  ],
  desert_pool: [
    {
      loot: () => new CoolingPendant(),
      chance: 20,
      id: "cooling_pendant",
    },
    {
      loot: () => new PercentageHealthPotion("Large Health Potion", 0.5),
      chance: 20,
      id: "large_health_potion",
    },
    {
      loot: () => new DuneDust(),
      chance: 25,
      id: "dune_dust",
    },
    {
      loot: () => new CactusNectar(),
      chance: 25,
      id: "cactus_nectar",
    },
    {
      loot: () => new AbilityAntidote(),
      chance: 10,
      id: "ability_antidote",
    },
  ],
  scavenger_pool: [
    {
      loot: () => new PercentageHealthPotion("Mini Health Potion", 0.25),
      chance: 40,
      id: "mini_health_potion",
    },
    {
      loot: () => new PercentageHealthPotion("Large Health Potion", 0.5),
      chance: 8,
      id: "large_health_potion",
    },
    {
      loot: () => new PercentageHealthPotion("Super Health Potion", 1),
      chance: 2,
      id: "super_health_potion",
    },
    {
      loot: () => new PristineKey(),
      chance: 40,
      id: "pristine_key",
    },
    {
      loot: () => new AbilityAntidote(),
      chance: 10,
      id: "ability_antidote",
    },
  ],
  pristine_treasure_pool: [
    {
      loot: () => new PercentageHealthPotion("Super Health Potion", 1),
      chance: 20,
      id: "super_health_potion",
    },
    {
      loot: () => new AbilityAntidote(),
      chance: 10,
      id: "ability_antidote",
    },
    {
      loot: () => new BlazingGauntlets(),
      chance: 10,
      id: "blazing_gauntlets",
    },
    {
      loot: () => new MagicShield(),
      chance: 10,
      id: "magic_shield",
    },
    {
      loot: () => new LifeFang(),
      chance: 10,
      id: "life_fang",
    },
    {
      loot: () => new StickyDie(),
      chance: 10,
      id: "sticky_die",
    },
    {
      loot: () => new PufferPrickle(),
      chance: 10,
      id: "puffer_prickle",
    },
    {
      loot: () => new SlimeSubstance(),
      chance: 17,
      id: "slime_substance",
    },
    {
      loot: () => new RegenerationAmulet(),
      chance: 1,
      id: "regeneration_amulet",
    },
    {
      loot: () => new AfflictionGloves(),
      chance: 1,
      id: "affliction_gloves",
    },
    {
      loot: () => new MeekHelmet(),
      chance: 1,
      id: "meek_helmet",
    },
  ],
  martial_artist_pool: [
    {
      loot: () => new BlackBelt(),
      chance: 50,
      id: "blackBelt",
    },
    {
      loot: () => new FightersBandana(),
      chance: 50,
      id: "fightersBandana",
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
