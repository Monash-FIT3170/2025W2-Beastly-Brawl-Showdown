import { PouncingBandit } from "../../game/monster/pouncingBandit";
import { Slime } from "/server/src/model/game/monster/slime";
import { MonsterIdentifier } from "/types/single/monsterState";

// Should type these instead of 'any' but we don't know if an enemy is a monster or player yet.
const enemyFactory: Record<string, () => any> = {
  slime_1: () => new Slime("PAPA SLIME", 1),
  pouncing_bandit: () => new PouncingBandit(),
};

export function createEnemy(id: string) {
  const creator = enemyFactory[id];
  if (!creator) {
    throw new Error(`Unknown enemy ID: ${id}`);
  }
  return creator();
}
