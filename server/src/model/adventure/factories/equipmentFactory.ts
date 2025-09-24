import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { CoolingPendant } from "../../game/equipment/coolingPendant";
import { Equipment } from "../../game/equipment/equipment";
import { LifeFang } from "../../game/equipment/lifeFang";
import { MagicShield } from "../../game/equipment/magicShield";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { SharpenedClaws } from "../../game/equipment/sharpenedClaws";

const equipmentFactory: Record<string, () => Equipment> = {
  oozingBlade: () => new OozingBlade(),
  lifeFang: () => new LifeFang(),
  magicShield: () => new MagicShield(),
  pufferPrickle: () => new PufferPrickle(),
  sharpenedClaws: () => new SharpenedClaws(),
  blazingGauntlets: () => new BlazingGauntlets(),
  coolingPendant: () => new CoolingPendant(),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
