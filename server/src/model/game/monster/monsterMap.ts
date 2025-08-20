import { CharmerCobra } from "./charmerCobra";
import { CinderTail } from "./cinderTail";
import { FuriousFlipper } from "./furiousFlipper";
import { PoisonFrog } from "./poisonFrog";
import { PouncingBandit } from "./pouncingBandit";
import { RockyRhino } from "./rockyRhino";
import { MonsterIdentifier } from "/types/single/monsterState";

export const monsterMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => new RockyRhino()],
  [MonsterIdentifier.POUNCING_BANDIT, () => new PouncingBandit()],
  [MonsterIdentifier.CINDER_TAIL, () => new CinderTail()],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => new FuriousFlipper()],
  [MonsterIdentifier.POISON_FROG, () => new PoisonFrog()],
  [MonsterIdentifier.CHARMER_COBRA, () => new CharmerCobra()],
]);

export function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}

export const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "BASALT"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_FROG, () => "MARSH"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
]);

export function getBiomeString(monsterID: MonsterIdentifier) {
  const biomeName = biomeMap.get(monsterID);
  return biomeName ? biomeName() : null;
}

export function getSlimeString(monsterID: MonsterIdentifier) {
  const biomeName = biomeMap.get(monsterID);
  if (!biomeName) {
    return null;
  }
  const slimeName = "SLIME_" + biomeName;
  return slimeName;
}
