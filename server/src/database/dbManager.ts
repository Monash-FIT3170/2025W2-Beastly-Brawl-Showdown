import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


// Working on a schema for player - Might not need some of these fields, but I'll keep them for now
// Concerns - When customizing monster stats, will the player's preference be saved to db?
export interface PlayerAccount {
  email: string;
  username: string;
  level: number;
  stats: {
    numGamesPlayed: number;
    numGamesWon: number;
  }
  achievments: string[];
}

// Collections
export const PlayersCollection = new Mongo.Collection('players');


export async function insertNewPlayer(email: string, username: string): Promise<void> {
  try {
    const existingPlayer = await PlayersCollection.findOneAsync({ email });
    if (existingPlayer) {
      console.error(`Player with email ${email} already exists.`);
      return;
    }

    // Create a new player object with default values
    const newPlayer: PlayerAccount = {
      email,
      username,
      level: 1, 
      stats: {
        numGamesPlayed: 0, 
        numGamesWon: 0,
      },
      achievments: [], 
    };

    // Insert the new player into the collection
    await PlayersCollection.insertAsync(newPlayer);
    console.log(`Player ${username} added successfully.`);
  } catch (error) {
    console.error(`Error adding player: ${error.message}`);
  }
}

