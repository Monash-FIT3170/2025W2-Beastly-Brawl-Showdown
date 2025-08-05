import { Mongo } from 'meteor/mongo';
import Monster from '/imports/server/src/model/game/monster/monster';

// Player Collection Model
export interface Player {
  username: string;
  email: string;
  score: number;
}

// Working on a schema for player - Might not need some of these fields, but I'll keep them for now
// Concerns - When customizing monster stats, will the player's preference be saved to db?
export interface PlayerSchema {
  email: string;
  username: string;
  level: number;
  stats: {
    numGamesPlayed: number;
    numGamesWon: number;
  }
  achievments: string[];
  monsters: Monster[]; // In anticipation that players might want to save their customized monster stats
}


// 
export const PlayersCollection = new Mongo.Collection<Player>('players');

// Inserts a player 
export async function insertPlayer(player: Player): Promise<void> {
    try {
      // If email exist, do not add
      const existingPlayer = await PlayersCollection.findOneAsync({ email: player.email });
      if (existingPlayer) {
        console.error(`Player with email ${player.email} already exists.`);
        return; 
      }
  
      // New player account
      await PlayersCollection.insertAsync(player);
      console.log(`Player ${player.username} inserted successfully.`);
    } catch (error) {
      console.error(`Error inserting player: ${error}`);
    }
  }


