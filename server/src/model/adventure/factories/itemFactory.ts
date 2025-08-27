import { HealthPotion } from "../../game/consumables/healthPotion";

export type Item = HealthPotion; // add more items

const itemFactory: Record<string, () => Item> = {
  potion_basic: () => new HealthPotion(),
};

export function createItem(id: string): Item {
  const creator = itemFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
