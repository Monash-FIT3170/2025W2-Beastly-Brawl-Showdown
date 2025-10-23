import { CharmerCobra } from "../../game/monster/charmerCobra";
import { CinderTail } from "../../game/monster/cinderTail";
import { FuriousFlipper } from "../../game/monster/furiousFlipper";
import { JackedOLantern } from "../../game/monster/jackedOLantern";
import { PoisonPogo } from "../../game/monster/poisonPogo";
import { PouncingBandit } from "../../game/monster/pouncingBandit";
import { RockyRhino } from "../../game/monster/rockyRhino";
import { Slime } from "/server/src/model/game/monster/slime";
import { MonsterIdentifier } from "/types/single/monsterState";

// Should type these instead of 'any' but we don't know if an enemy is a monster or player yet.
const enemyFactory: Record<string, (n: string) => any> = {
  slime: (n) => new Slime(n),
  pouncing_bandit: (n) => new PouncingBandit(n),
  rocky_rhino: (n) => new RockyRhino(n),
  cinder_tail: (n) => new CinderTail(n),
  poison_pogo: (n) => new PoisonPogo(n),
  charmer_cobra: (n) => new CharmerCobra(n),
  furious_flipper: (n) => new FuriousFlipper(n),
  jacked_o_lantern: (n) => new JackedOLantern(n)
};

export function createEnemy(id: string, name: string) {
  const creator = enemyFactory[id];
  if (!creator) {
    throw new Error(`Unknown enemy ID: ${id}`);
  }
  return creator(name);
}
