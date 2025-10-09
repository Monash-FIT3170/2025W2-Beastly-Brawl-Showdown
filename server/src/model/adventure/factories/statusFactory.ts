import { Status } from "../../game/status/status";
import { Poison } from "../../game/status/poison";
import { Stun } from "../../game/status/stun";
import { LakeCurse } from "../../game/status/lakeCurse";
import { LakeBlessing } from "../../game/status/lakeBlessing";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { Burn } from "../../game/status/burn";
import { InfinityAbility } from "../../game/status/infinityAbility";
import { BurningRage } from "../../game/status/burningRage";
import { SwampsCalm } from "../../game/status/swampsCalm";
import { SwampsWhisper } from "../../game/status/swampsWhisper";
import { GlowOfInsightBuff } from "../../game/status/glowOfInsightBuff";
import { HiccupOfDoomBuff } from "../../game/status/hiccupOfDoomBuff";
import { CroakOfStrengthBuff } from "../../game/status/croakOfStrengthBuff";
import { SwampsGuidance } from "../../game/status/swampsGuidance";

export interface StatusInfo {
  statusId: string;
  duration: number;
}

const statusFactory: Record<string, (d: number) => Status> = {
  stunned: (d) => new Stun(d),
  poisoned: (d) => new Poison(d),
  lake_curse: (d) => new LakeCurse(d),
  lake_blessing: (d) => new LakeBlessing(d),
  slime_boost: (d) => new SlimeBoost(d),
  burn: (d) => new Burn(d),
  infinite_ability: (d) => new InfinityAbility(d),
  burning_rage: (d) => new BurningRage(d),
  swamps_calm: (d) => new SwampsCalm(d),
  swamps_whisper: (d)=> new SwampsWhisper(d),
  croak_of_strength_buff: (d)=> new CroakOfStrengthBuff(d),
  hiccup_of_doom_buff: (d) => new HiccupOfDoomBuff(d),
  glow_of_insight_buff: (d) => new GlowOfInsightBuff(d),
  swamps_guidance: (d) => new SwampsGuidance(d),
};

export function createStatus(id: string, duration: number): Status {
  const creator = statusFactory[id];
  if (!creator) {
    throw new Error(`Unknown status ID: ${id}`);
  }
  return creator(duration);
}
