import { CharmerCobra } from "../../game/monster/charmerCobra";
import { CinderTail } from "../../game/monster/cinderTail";
import { FuriousFlipper } from "../../game/monster/furiousFlipper";
import { PoisonPogo } from "../../game/monster/poisonPogo";
import { PouncingBandit } from "../../game/monster/pouncingBandit";
import { RockyRhino } from "../../game/monster/rockyRhino";
import { Slime } from "/server/src/model/game/monster/slime";
import { MonsterIdentifier } from "/types/single/monsterState";

// Should type these instead of 'any' but we don't know if an enemy is a monster or player yet.
const enemyFactory: Record<string, () => any> = {
  slime_1: () => new Slime("PAPA SLIME"),
  slime_2: () => new Slime("MAMA SLIME"),
  slime_3: () => new Slime("BABY SLIME"),
  slime_4: () => new Slime("GRANDMA SLIME"),
  ember_1: () => new Slime("EMBER SLIME"),
  ember_2: () => new Slime("MAGMA SLIME"),
  ember_3: () => new Slime("INFERNO SLIME"),
  ember_4: () => new Slime("LITTLE EMBER"),
  swamp_slime_1: () => new Slime("HUNGRY SLIME"),
  swamp_slime_2: () => new Slime("STICKY SLIME"),
  pouncing_bandit: () => new PouncingBandit("Bandito"),
  cinder_tail: () => new CinderTail("Big Red"),
  furious_flipper: () => new FuriousFlipper("Furious Flipper"), // UPDATE NAME
  poison_pogo: () => new PoisonPogo("Poison Pogo"), // UPDATE NAME
  charmer_cobra: () => new CharmerCobra("Cobriña"),
  rocky_rhino: () => new RockyRhino("Stonehide Guardian"),
};

export function createEnemy(id: string) {
  const creator = enemyFactory[id];
  if (!creator) {
    throw new Error(`Unknown enemy ID: ${id}`);
  }
  return creator();
}
