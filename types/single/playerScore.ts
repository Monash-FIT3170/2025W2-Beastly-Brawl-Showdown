// Interface for player score
// Score does not belong to Player as attribute as it is only relavant to Scoring Mode 
export interface PlayerScore{
	playerId: string;
	name: string;
	points: number
	bonuses: number;
}

//Bonus system interface
export interface BonusSystem{
	finishedWithHpAbove: {percentage: number; bonus: number};
	inStreak: number;
	debuff: number;
}