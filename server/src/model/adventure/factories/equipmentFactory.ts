import { BasaltShield } from "../../game/equipment/basaltShield";
import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { CoolingPendant } from "../../game/equipment/coolingPendant";
import { Equipment } from "../../game/equipment/equipment";
import { LifeFang } from "../../game/equipment/lifeFang";
import { MagicShield } from "../../game/equipment/magicShield";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { SharpenedClaws } from "../../game/equipment/sharpenedClaws";
import { SlimyHeart } from "../../game/equipment/slimyHeart";
import { WitherbindBracelet } from "../../game/equipment/witherbindBracelet";

const equipmentFactory: Record<string, () => Equipment> = {
  oozing_blade: () => new OozingBlade(),
  life_fang: () => new LifeFang(),
  magic_shield: () => new MagicShield(),
  puffer_prickle: () => new PufferPrickle(),
  sharpened_claws: () => new SharpenedClaws(),
  blazing_gauntlets: () => new BlazingGauntlets(),
  cooling_pendant: () => new CoolingPendant(),
  basalt_shield: () => new BasaltShield(),
  slimy_heart: () => new SlimyHeart(),
  witherbind_bracelet: () => new WitherbindBracelet(),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
