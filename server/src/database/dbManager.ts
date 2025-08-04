import { Mongo } from 'meteor/mongo';

// Player Collection Model
export interface Player {
  username: string;
  email: string;
  score: number;
}

// Define the PlayersCollection using MongoDB
export const PlayersCollection = new Mongo.Collection<Player>('players');

// Inserts a player 
export async function insertPlayerAsync(player: Player): Promise<void> {
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


