import { Status } from "../../game/status/status";
import { Poison } from "../../game/status/poison";
import { Stun } from "../../game/status/stun";
import { LakeCurse } from "../../game/status/lakeCurse";
import { LakeBlessing } from "../../game/status/lakeBlessing";
import { SlimeBoost } from "../../game/status/slimeBoost";

export interface StatusInfo {
  statusId: string;
  duration: number;
}
/**
const statusFactory: Record<string, (duration) => Status> = {
  stunned: () => new Stun(2),
  poisoned: () => new Poison(5),
  lake_curse_mini: () => new LakeCurse(3),
  lake_curse: () => new LakeCurse(10),
  lake_blessing: () => new LakeBlessing(30),
  lake_blessing_mini: () => new LakeBlessing(10),
  grandma_blessing: () => new SlimeBoost(10),
};
 */

const statusFactory: Record<string, (d: number) => Status> = {
  stunned: (d) => new Stun(d),
  poisoned: (d) => new Poison(d),
  lake_curse: (d) => new LakeCurse(d),
  lake_blessing: (d) => new LakeBlessing(d),
  slime_boost: (d) => new SlimeBoost(d),
};

export function createStatus(id: string, duration: number): Status {
  const creator = statusFactory[id];
  if (!creator) {
    throw new Error(`Unknown status ID: ${id}`);
  }
  return creator(duration);
}
