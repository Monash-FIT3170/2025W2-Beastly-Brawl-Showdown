import { PlayerScore } from "/types/single/playerScore";

//Scoreboard for storing Player's point in Scoring Tournament mode
//Score is separated from Player class as it is not tied with such reponsibility 
export class ScoreBoard {
	private playerScores = new Map<string,PlayerScore>();

	register(playerId: string, name: string): void{
		this.playerScores.set(playerId, {
			playerId: playerId, 
			name: name,
			points: 0,
			bonuses: 0
		})
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
	
	showBoard(){
		return [...this.playerScores.values()].sort((a,b) => b.points - a.points)
	}
}