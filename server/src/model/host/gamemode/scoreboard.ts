import { MonsterIdentifier } from "../../../../../types/single/monsterState";
import { PlayerScore } from "/types/single/playerScore";

//Scoreboard for storing Player's point in Scoring Tournament mode
//Score is separated from Player class as it is not tied with such reponsibility 
export class ScoreBoard {
    public playerScores = new Map<string, PlayerScore>();

    register(playerId: string, name: string, playerMonster: MonsterIdentifier): void {
        if (this.playerScores.has(playerId)) return; // Avoid duplicate registration
        this.playerScores.set(playerId, {
            playerId,
            name,
            playerMonster,
            points: 0,
            bonuses: 0,
            currentStreak: null
        });
    }

	setScore(playerId: string, value: Partial<Omit<PlayerScore, "playerId" | "name">>):void {
		const playerScore = this.playerScores.get(playerId)
		if (!playerScore){
			return
		}

        if (value.currentStreak){
            if (playerScore.currentStreak === null){
                playerScore.currentStreak = value.currentStreak
            } else {
                console.log("[INSTREAK]: INCREASE")
                if (playerScore.currentStreak === value.currentStreak){
                    playerScore.points += value.bonuses 
                    playerScore.bonuses = value.bonuses
                }
            }
            return
        }

		if (value.bonuses) {
			playerScore.points += value.bonuses // Update player's point
			playerScore.bonuses = value.bonuses // Record bonus point value for the last round
		}


	}

    setStreak(playerId: string, value: boolean):void{
        const playerScore = this.playerScores.get(playerId)
		if (!playerScore){
			return
		}
        playerScore.currentStreak = value
    }

    setPlayerMonster(playerId: string, monster: MonsterIdentifier): void{
        const playerScore = this.playerScores.get(playerId)
        playerScore.playerMonster = monster
    }
	
    //Get top 3 score from the scoreboard
    showBoard(): PlayerScore[] {
        const top3Score = [...this.playerScores.values()]
        .sort((a, b) => b.points - a.points)
        .slice(0, 3);
    return top3Score;
    }


    showBoard2(): Record<string, PlayerScore>{
        const out: Record<string, PlayerScore> = {};
        for (const score of this.playerScores.values()){
            out[score.playerId] = { ...score };
        }
        return out
    }

}