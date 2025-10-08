import { BasaltShield } from "../../game/equipment/basaltShield";
import { BlackBelt } from "../../game/equipment/blackBelt";
import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { CoolingPendant } from "../../game/equipment/coolingPendant";
import { Equipment } from "../../game/equipment/equipment";
import { FightersBandana } from "../../game/equipment/fightersBandana";
import { LifeFang } from "../../game/equipment/lifeFang";
import { MagicShield } from "../../game/equipment/magicShield";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { SharpenedClaws } from "../../game/equipment/sharpenedClaws";
import { SlimyHeart } from "../../game/equipment/slimyHeart";
import { WitherbindBracelet } from "../../game/equipment/witherbindBracelet";
import { RedCrystal } from "../../game/equipment/redCrystal";
import { PurpleCrystal } from "../../game/equipment/purpleCrystal";

const equipmentFactory: Record<string, () => Equipment> = {
  oozingBlade: () => new OozingBlade(),
  lifeFang: () => new LifeFang(),
  magicShield: () => new MagicShield(),
  pufferPrickle: () => new PufferPrickle(),
  sharpenedClaws: () => new SharpenedClaws(),
  blazingGauntlets: () => new BlazingGauntlets(),
  fightersBandana: () => new FightersBandana(),
  blackBelt: () => new BlackBelt(),
  coolingPendant: () => new CoolingPendant(),
  basaltShield: () => new BasaltShield(),
  slimyHeart: () => new SlimyHeart(),
  witherbindBracelet: () => new WitherbindBracelet(),
  redCrystal: () => new RedCrystal(),
  purpleCrystal: () => new PurpleCrystal(),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
