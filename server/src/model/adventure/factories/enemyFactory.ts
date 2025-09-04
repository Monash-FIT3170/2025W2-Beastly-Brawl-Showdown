import { PouncingBandit } from "../../game/monster/pouncingBandit";
import { Slime } from "/server/src/model/game/monster/slime";
import { MonsterIdentifier } from "/types/single/monsterState";

// Should type these instead of 'any' but we don't know if an enemy is a monster or player yet.
const enemyFactory: Record<string, () => any> = {
  slime_1: () => new Slime("PAPA SLIME"),
  slime_2: () => new Slime("MAMA SLIME"),
  slime_3: () => new Slime("BABY SLIME"),
  slime_4: () => new Slime("GRANDMA SLIME"),
  pouncing_bandit: () => new PouncingBandit("Bandito"),
};

export function createEnemy(id: string) {
  const creator = enemyFactory[id];
  if (!creator) {
    throw new Error(`Unknown enemy ID: ${id}`);
  }
  return creator();
}
