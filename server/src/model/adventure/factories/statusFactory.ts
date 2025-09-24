import { Status } from "../../game/status/status";
import { Poison } from "../../game/status/poison";
import { Stun } from "../../game/status/stun";
import { LakeCurse } from "../../game/status/lakeCurse";
import { LakeBlessing } from "../../game/status/lakeBlessing";
import { SlimeBoost } from "../../game/status/slimeBoost";
import { Burn } from "../../game/status/burn";

const statusFactory: Record<string, () => Status> = {
  stunned: () => new Stun(2),
  poisoned: () => new Poison(5),
  lake_curse_mini: () => new LakeCurse(3),
  lake_curse: () => new LakeCurse(10),
  lake_blessing: () => new LakeBlessing(30),
  lake_blessing_mini: () => new LakeBlessing(10),
  grandma_blessing: () => new SlimeBoost(10),
  burn: () => new Burn(3),
};

export function createStatus(id: string): Status {
  const creator = statusFactory[id];
  if (!creator) {
    throw new Error(`Unknown status ID: ${id}`);
  }
  return creator();
}
