import { PercentageHealthPotion } from "../../game/consumables/healthPotion";
import { Consumable } from "../../game/consumables/consumable";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { SlimeSubstance } from "../../game/consumables/slimeSubstance";

const ConsumableFactory: Record<string, () => Consumable> = {
  mini_health_potion: () =>
    new PercentageHealthPotion("Mini Health Potion", 0.25),
  large_health_potion: () =>
    new PercentageHealthPotion("Large Health Potion", 0.5),
  super_health_potion: () =>
    new PercentageHealthPotion("Super Health Potion", 1.0),
  slime_substance: () => new SlimeSubstance(),
};

export function createConsumable(id: string): Consumable {
  const creator = ConsumableFactory[id];
  if (!creator) {
    throw new Error(`Unknown Consumable ID: ${id}`);
  }
  return creator();
}
