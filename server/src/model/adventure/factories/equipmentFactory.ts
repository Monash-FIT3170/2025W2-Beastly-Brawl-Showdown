import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { Equipment } from "../../game/equipment/equipment";
import { LifeFang } from "../../game/equipment/lifeFang";
import { MagicShield } from "../../game/equipment/magicShield";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { SharpenedClaws } from "../../game/equipment/sharpenedClaws";

const equipmentFactory: Record<string, () => Equipment> = {
  oozingBlade: () => new OozingBlade(),
  lifeFang: () => new LifeFang(),
  magicShield: () => new MagicShield(1),
  pufferPrickle: () => new PufferPrickle(1),
  sharpenedClaws: () => new SharpenedClaws(1),
  blazingGauntlets: () => new BlazingGauntlets(),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
