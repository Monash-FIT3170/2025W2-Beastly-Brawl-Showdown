import { Equipment } from "../../game/equipment/equipment";
import { Sword } from "../../game/consumables/sword";

const equipmentFactory: Record<string, () => Equipment> = {
  sword: () => new Sword(30),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
