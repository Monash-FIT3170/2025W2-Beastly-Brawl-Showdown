import { Status } from "../../game/status/status";
import { Poison } from "../../game/status/poison";
import { Stun } from "../../game/status/stun";

const statusFactory: Record<string, () => Status> = {
  stunned: () => new Stun(2),
};

export function createStatus(id: string): Status {
  const creator = statusFactory[id];
  if (!creator) {
    throw new Error(`Unknown status ID: ${id}`);
  }
  return creator();
}
