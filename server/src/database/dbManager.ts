import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


// Working on a schema for player - Might not need some of these fields, but I'll keep them for now
// Concerns - When customizing monster stats, will the player's preference be saved to db?
export interface PlayerAccount {
  email: string;
  username: string;
  password: string;
  level: number;
  stats: {
    numGamesPlayed: number;
    numGamesWon: number;
  }
  achievments: string[];
}

// Collections
export const PlayersCollection = new Mongo.Collection('players');


// Inserts a new player account if not existing already
export async function insertNewPlayer(email: string, username: string, password: string): Promise<void> {
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
      password,
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

// Gets player data by their email
export async function getPlayerData(email: string): Promise<PlayerAccount | null> {
  try {
    const player = await PlayersCollection.findOneAsync({ email });
    if (!player) {
      console.error(`No player found with email: ${email}`);
      return null;
    }
    // Return the player data as JSON
    return {
      email: player.email,
      username: player.username,
      password: player.password,
      level: player.level,
      stats: {
        numGamesPlayed: player.stats.numGamesPlayed,
        numGamesWon: player.stats.numGamesWon,
      },
      achievments: player.achievments,
    };
  } catch (error) {
    console.error(`Error fetching player data for email ${email}: ${error.message}`);
    return null;
  }
}



