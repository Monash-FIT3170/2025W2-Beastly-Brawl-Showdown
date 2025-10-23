import { CharmerCobra } from "./charmerCobra";
import { CinderTail } from "./cinderTail";
import { FuriousFlipper } from "./furiousFlipper";
import { PoisonPogo } from "./poisonPogo";
import { PouncingBandit } from "./pouncingBandit";
import { RockyRhino } from "./rockyRhino";
import { JackedOLantern } from "./jackedOLantern";
import { MonsterIdentifier } from "/types/single/monsterState";
import { SeasonalEventIdentifier } from "../../../../../types/single/seasonalEventState";

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

export const eventMonsterMap = new Map([
  [SeasonalEventIdentifier.SPOOK_GARDEN, () => new JackedOLantern()]
]);

export function getEventMonster(eventID: SeasonalEventIdentifier) {
  const createMonster = eventMonsterMap.get(eventID);
  return createMonster ? createMonster() : null;
}

export const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "BASALT"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_POGO, () => "MARSH"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
]);

//NOTE: levelMap exists in front end so update both accordingly
export const levelMap: Record<number, MonsterIdentifier> = {
  0: MonsterIdentifier.ENDLESS,
  1: MonsterIdentifier.POUNCING_BANDIT,
  2: MonsterIdentifier.CINDER_TAIL,
  3: MonsterIdentifier.FURIOUS_FLIPPER,
  4: MonsterIdentifier.POISON_POGO,
  5: MonsterIdentifier.CHARMER_COBRA,
  1009: MonsterIdentifier.JACKEDOLANTERN,
};
