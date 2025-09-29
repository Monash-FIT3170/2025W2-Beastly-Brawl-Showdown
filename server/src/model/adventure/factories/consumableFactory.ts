import { SlimeBaby } from "./../../game/storyItem/slimeBaby";
import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";
import { SparklingFriend } from "../../game/consumables/sparklingFriend";
import { AbilityAntidote } from "../../game/consumables/abilityAntidote";
import { ScorchPowder } from "../../game/consumables/scorchPowder";
import { Coal } from "../../game/consumables/coal";
import { CharredRoot } from "../../game/consumables/charredRoot";
import { EverbloomingLotus } from "../../game/storyItem/everbloomingLotus";
import { MagicStew } from "../../game/consumables/magicStew";

const ConsumableFactory: Record<string, () => Consumable> = {
  mini_health_potion: () =>
    new PercentageHealthPotion("Mini Health Potion", 0.25),
  large_health_potion: () =>
    new PercentageHealthPotion("Large Health Potion", 0.5),
  super_health_potion: () =>
    new PercentageHealthPotion("Super Health Potion", 1.0),
  slime_substance: () => new SlimeSubstance(),
  sparkling_friend: () => new SparklingFriend(),
  ability_antidote: () => new AbilityAntidote(),
  coal: () => new Coal(),
  scorch_powder: () => new ScorchPowder(),
  charred_root: () => new CharredRoot(),
  magic_stew: () => new MagicStew(),
};

export function createConsumable(id: string): Consumable {
  const creator = ConsumableFactory[id];
  if (!creator) {
    throw new Error(`Unknown Consumable ID: ${id}`);
  }
  return creator();
}
