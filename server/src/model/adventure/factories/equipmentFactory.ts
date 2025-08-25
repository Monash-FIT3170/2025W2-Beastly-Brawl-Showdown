import { Equipment } from "../../game/item/equipment";
import { Sword } from "../../game/item/sword";

const equipmentFactory: Record<string, () => Equipment> = {
  sword: () => new Sword(5),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
