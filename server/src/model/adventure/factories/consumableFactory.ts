import { PercentageHealthPotion } from "../../game/item/healthPotion";
import { Consumable } from "../../game/item/consumable";

const ConsumableFactory: Record<string, () => Consumable> = {
  mini_health_potion: () =>
    new PercentageHealthPotion("Mini Health Potion", 0.25),
  large_health_potion: () =>
    new PercentageHealthPotion("Large Health Potion", 0.5),
  super_health_potion: () =>
    new PercentageHealthPotion("Super Health Potion", 1.0),
};

export function createConsumable(id: string): Consumable {
  const creator = ConsumableFactory[id];
  if (!creator) {
    throw new Error(`Unknown Consumable ID: ${id}`);
  }
  return creator();
}
