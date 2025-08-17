import { PlayerScore } from "/types/single/playerScore";

//Scoreboard for storing Player's point in Scoring Tournament mode
//Score is separated from Player class as it is not tied with such reponsibility 
export class ScoreBoard {
    public playerScores = new Map<string, PlayerScore>();

    register(playerId: string, name: string): void {
        if (this.playerScores.has(playerId)) return; // Avoid duplicate registration
        this.playerScores.set(playerId, {
            playerId,
            name,
            points: 0,
            bonuses: 0,
        });
    }

	setScore(playerId: string, value: Partial<Omit<PlayerScore, "playerId" | "name">>):void {
		const playerScore = this.playerScores.get(playerId)
		if (!playerScore){
			return
		}
		if (value.bonuses) {
			playerScore.points += value.bonuses // Update player's point
			playerScore.bonuses = value.bonuses // Record bonus point value for the last round
		}
	}
	
    showBoard(): PlayerScore[] {
        return [...this.playerScores.values()]
            .map(score => ({ ...score }))
            .sort((a, b) => b.points - a.points);
    }

}