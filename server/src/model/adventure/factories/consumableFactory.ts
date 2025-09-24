import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";
import { SlimeFriend } from "../../game/consumables/storyItem/slimeFriend";
import { SparklingFriend } from "../../game/consumables/sparklingFriend";
import { AbilityAntidote } from "../../game/consumables/abilityAntidote";

const ConsumableFactory: Record<string, () => Consumable> = {
  mini_health_potion: () =>
    new PercentageHealthPotion("Mini Health Potion", 0.25),
  large_health_potion: () =>
    new PercentageHealthPotion("Large Health Potion", 0.5),
  super_health_potion: () =>
    new PercentageHealthPotion("Super Health Potion", 1.0),
  slime_substance: () => new SlimeSubstance(),
  slime_friend: () => new SlimeFriend(),
  sparkling_friend: () => new SparklingFriend(),
  ability_antidote: () => new AbilityAntidote(),
};

export function createConsumable(id: string): Consumable {
  const creator = ConsumableFactory[id];
  if (!creator) {
    throw new Error(`Unknown Consumable ID: ${id}`);
  }
  return creator();
}
