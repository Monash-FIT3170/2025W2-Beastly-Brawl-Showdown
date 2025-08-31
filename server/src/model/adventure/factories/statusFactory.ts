import { Status } from "../../game/status/status";
import { Poison } from "../../game/status/poison";
import { Stun } from "../../game/status/stun";
import { LakeCurse } from "../../game/status/lakeCurse";

const statusFactory: Record<string, () => Status> = {
  stunned: () => new Stun(2),
  lake_curse: () => new LakeCurse(10),
};

export function createStatus(id: string): Status {
  const creator = statusFactory[id];
  if (!creator) {
    throw new Error(`Unknown status ID: ${id}`);
  }
  return creator();
}
