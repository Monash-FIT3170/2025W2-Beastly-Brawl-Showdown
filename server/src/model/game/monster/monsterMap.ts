import { CharmerCobra } from "./charmerCobra";
import { CinderTail } from "./cinderTail";
import { FuriousFlipper } from "./furiousFlipper";
import { PoisonPogo } from "./poisonPogo";
import { PouncingBandit } from "./pouncingBandit";
import { RockyRhino } from "./rockyRhino";
import { MonsterIdentifier } from "/types/single/monsterState";

export const monsterMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => new RockyRhino()],
  [MonsterIdentifier.POUNCING_BANDIT, () => new PouncingBandit()],
  [MonsterIdentifier.CINDER_TAIL, () => new CinderTail()],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => new FuriousFlipper()],
  [MonsterIdentifier.POISON_POGO, () => new PoisonPogo()],
  [MonsterIdentifier.CHARMER_COBRA, () => new CharmerCobra()],
]);

export function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}

export const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "ASHLANDS"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_POGO, () => "WETLAND"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
]);

//NOTE: levelMap exists in front end so update both accordingly
export const levelMap: Record<number, MonsterIdentifier> = {
  0: MonsterIdentifier.POUNCING_BANDIT,
  1: MonsterIdentifier.CINDER_TAIL,
  2: MonsterIdentifier.FURIOUS_FLIPPER,
  3: MonsterIdentifier.POISON_POGO,
  4: MonsterIdentifier.CHARMER_COBRA,
};
