import { MonsterState } from '../single/monsterState';

export interface MostChosenMonsterResult {
  monster: MonsterState | null;
  percentagePick: string;
}

export interface GameSessionData {
  mostChosenMonster: MostChosenMonsterResult;
}