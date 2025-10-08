import { BasaltShield } from "../../game/equipment/basaltShield";
import { BlackBelt } from "../../game/equipment/blackBelt";
import { BlazingGauntlets } from "../../game/equipment/blazingGauntlets";
import { CoolingPendant } from "../../game/equipment/coolingPendant";
import { Equipment } from "../../game/equipment/equipment";
import { FightersBandana } from "../../game/equipment/fightersBracelets";
import { LifeFang } from "../../game/equipment/lifeFang";
import { MagicShield } from "../../game/equipment/magicShield";
import { OozingBlade } from "../../game/equipment/oozingBlade";
import { PufferPrickle } from "../../game/equipment/pufferPrickle";
import { SharpenedClaws } from "../../game/equipment/sharpenedClaws";
import { SlimyHeart } from "../../game/equipment/slimyHeart";
import { WitherbindBracelet } from "../../game/equipment/witherbindBracelet";
import { RedCrystal } from "../../game/equipment/redCrystal";
import { PurpleCrystal } from "../../game/equipment/purpleCrystal";
import { AfflictionGloves } from "../../game/equipment/afflictionGloves";
import { RegenerationAmulet } from "../../game/equipment/regenerationAmulet";
import { MeekHelmet } from "../../game/equipment/meekHelmet";
import { ColosseumCrown } from "../../game/equipment/colosseumCrown";

const equipmentFactory: Record<string, () => Equipment> = {
  oozing_blade: () => new OozingBlade(),
  life_fang: () => new LifeFang(),
  magic_shield: () => new MagicShield(),
  puffer_prickle: () => new PufferPrickle(),
  sharpened_claws: () => new SharpenedClaws(),
  blazing_gauntlets: () => new BlazingGauntlets(),
  fighters_bandana: () => new FightersBandana(),
  black_belt: () => new BlackBelt(),
  cooling_pendant: () => new CoolingPendant(),
  basalt_shield: () => new BasaltShield(),
  slimy_heart: () => new SlimyHeart(),
  witherbind_bracelet: () => new WitherbindBracelet(),
  red_crystal: () => new RedCrystal(),
  purple_crystal: () => new PurpleCrystal(),
  affliction_gloves: () => new AfflictionGloves(),
  regeneration_amulet: () => new RegenerationAmulet(),
  meek_helmet: () => new MeekHelmet(),
  colosseum_crown: () => new ColosseumCrown(),
};

export function createEquipment(id: string): Equipment {
  const creator = equipmentFactory[id];
  if (!creator) {
    throw new Error(`Unknown item ID: ${id}`);
  }
  return creator();
}
