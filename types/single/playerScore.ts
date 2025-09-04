// Interface for player score

import { MonsterIdentifier } from "./monsterState";

// Score does not belong to Player as attribute as it is only relavant to Scoring Mode 
export interface PlayerScore{
	playerId: string;
	name: string;
	playerMonster: MonsterIdentifier;
	points: number
	bonuses: number;
	currentStreak: StreakIdentifier|null
}

//Bonus system interface
export interface BonusSystem{
	finishedWithHpAbove: {percentage: number; bonus: number};
	inStreak: number;
	debuff: number;
	win: number
}

export const defaultBonus: BonusSystem = {
	finishedWithHpAbove: {percentage: 40, bonus: 1},
	inStreak: 1,
	debuff: 1,
	win: 1
}

export enum StreakIdentifier {
	WIN = "WIN_STREAK",
	LOSE = "LOSE_STREAK",
	DRAW = "DRAW_STREAK" // I think this is possible...
}