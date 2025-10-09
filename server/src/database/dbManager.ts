import { Mongo } from 'meteor/mongo';
import { RockyRhino } from '../model/game/monster/rockyRhino';
import { CinderTail } from '../model/game/monster/cinderTail';
import { PouncingBandit } from '../model/game/monster/pouncingBandit';
import { CharmerCobra } from '../model/game/monster/charmerCobra';
import { PoisonPogo } from '../model/game/monster/poisonPogo';
import { FuriousFlipper } from '../model/game/monster/furiousFlipper';
import {Achievements} from "./achievementList"

import bcrypt from 'bcrypt';



// Schema for a Player Account 
export interface PlayerAccountSchema {
  _id: string;
  email: string;
  username: string;
  password: string;
  level: number;
  online: boolean;
  stats: {
    numGamesPlayed: number;
    numGamesWon: number;
  }
  achievements: AchievementSchema[];
  monstersStat: PlayerMonsterStatSchema[]; 
  adventureProgression: AdventureProgressionSchema
}

// Schema for the Player's monsters stats customization
export interface PlayerMonsterStatSchema {
  monsterId: string,
  monsterName: string,
  maxHealth: number,
  attackBonus: number,
  armourClass: number
}

// Schema for Adventure mode progression. 
export interface AdventureProgressionSchema {
  unlockedMonsters: Record<string, boolean>, // e.g  {'ROCKY_RHINO': true, 'CINDER_TAIL': false, 'POUNCING_BANDIT': false},
  unlockedLevels: number[], 
  stage: number,
  savedGameState: {} 

}



export interface AchievementSchema {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  progress: number;
  goal: number;
  objectives: Record<string, boolean|number>;
  hidden: boolean
}



// Collections
export const PlayersCollection = new Mongo.Collection('players');

/**
 * Helper functions for encrypting/decrypting passwords
 */

// Returns a hashed password
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 
    console.log(`Password hashed: ${hashedPassword}`);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

// Returns boolean if password matches hashed password
export async function verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    if (typeof inputPassword !== 'string' || typeof hashedPassword !== 'string') {
      throw new Error('Password and hashed password must be strings');
    }

    console.log(` --- Verifying Password --- `);

    const res = await bcrypt.compare(inputPassword, hashedPassword);
    console.log(`Password verification result: ${res}\n`);
    return res
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error; 
  }
}



/** Helper functions that ... 
 * retrieves information/data locally 
 * creates new instances of monsters or players
 * */
const monsterList: <Monster>[] = [new RockyRhino(), new CinderTail(), new PouncingBandit(), new PoisonPogo(), new CharmerCobra(), new FuriousFlipper()];

// Gets default stats of monsters
function getBaseMonsterStats(monsterId: string): { name:string, maxHealth: number, attackBonus: number, armourClass: number } {
  const monster = monsterList.find(m => m.getId() === monsterId);
  if (!monster) {throw new Error(`Monster with id ${monsterId} not found.`);}

  return {
    name: monster.getName(),
    maxHealth: monster.getMaxHealth(),
    attackBonus: monster.getAttackBonus(),
    armourClass: monster.getArmourClass(),
  };
}

// Used for initializing a Player Account PlayerMonsterStatSchema
function createPlayerMonsterStatSchema(monsterId: string,): PlayerMonsterStatSchema {
  const baseStats = getBaseMonsterStats(monsterId);
  return {
    monsterId,
    monsterName: baseStats.name,
    maxHealth: baseStats.maxHealth,
    attackBonus: baseStats.attackBonus,
    armourClass: baseStats.armourClass,
  };
}

// This is used to create a Guest account - Used when a new socket connection is made
export function createDefaultPlayerAccountSchema(): PlayerAccountSchema {
  return {
    email: '',
    username: 'Default',
    password: '',
    level: 1,
    online: false,
    stats: {
      numGamesPlayed: 0,
      numGamesWon: 0,
    },
    achievements: [],
    monstersStat: [
      createPlayerMonsterStatSchema('ROCKY_RHINO'),
      createPlayerMonsterStatSchema('CINDER_TAIL'),
      createPlayerMonsterStatSchema('POUNCING_BANDIT'),
      createPlayerMonsterStatSchema('POISON_POGO'),
      createPlayerMonsterStatSchema('CHARMER_COBRA'),
      createPlayerMonsterStatSchema('FURIOUS_FLIPPER'),
    ],
    adventureProgression: {
      unlockedMonsters: {
        'ROCKY_RHINO': true,
        'CINDER_TAIL': false,
        'POUNCING_BANDIT': false,
        'POISON_POGO': false,
        'CHARMER_COBRA': false,
        'FURIOUS_FLIPPER': false,
      },
      unlockedLevels: [1],
      stage: 1,
      savedGameState: {},
    },
    achievements: Achievements
  };
}




/**
 * Functions to retrieve/update player data in the database
 */


// Inserts a new player account if not existing already
export async function insertNewPlayerAccount(email: string, username: string, password: string): Promise<void> {
  try {
    const existingPlayer = await PlayersCollection.findOneAsync({ email });
    if (existingPlayer) {
      console.error(`Player with email ${email} already exists.`);
      return;
    }

    // If password changes, rehash it
    const hashedPassword = await hashPassword(password);

    // Create a new player object with default values
    const newPlayer: PlayerAccountSchema = {
      email,
      username,
      password: hashedPassword,
      level: 1, 
      online: false,
      stats: {
        numGamesPlayed: 0, 
        numGamesWon: 0,
      },
      achievements: [], 
      monstersStat: [
        createPlayerMonsterStatSchema('ROCKY_RHINO'), 
        createPlayerMonsterStatSchema('CINDER_TAIL'), 
        createPlayerMonsterStatSchema('POUNCING_BANDIT'),
        createPlayerMonsterStatSchema('POISON_POGO'),
        createPlayerMonsterStatSchema('CHARMER_COBRA'),
        createPlayerMonsterStatSchema('FURIOUS_FLIPPER'),
      ], 
      adventureProgression: {
        unlockedMonsters: {
          'ROCKY_RHINO': true,
          'CINDER_TAIL': false,
          'POUNCING_BANDIT': false,
          'POISON_POGO': false,
          'CHARMER_COBRA': false,
          'FURIOUS_FLIPPER': false,
        },
        unlockedLevels: [1],
        stage: 1,
        savedGameState: {},
      },
      achievements: Achievements
    };

    // Insert the new player into the collection
    await PlayersCollection.insertAsync(newPlayer);
    console.log(`Player ${username} added successfully.`);
  } catch (error) {
    console.error(`Error adding player: ${error.message}`);
  }
}

// Gets player data by their email
export async function getPlayerData(email: string): Promise<PlayerAccountSchema | null> {
  try {
    const player = await PlayersCollection.findOneAsync({ email });
    if (!player) {
      console.error(`No player found with email: ${email}`);
      return null;
    }
    // Return the player data as JSON
    return {
      _id: player._id?.toString(),
      email: player.email,
      username: player.username,
      password: player.password,
      level: player.level,
      online: player.online,
      stats: {
        numGamesPlayed: player.stats.numGamesPlayed,
        numGamesWon: player.stats.numGamesWon,
      },
      achievements: player.achievements,
      monstersStat: player.monstersStat,
      adventureProgression: player.adventureProgression
    };
  } catch (error) {
    console.error(`Error fetching player data for email ${email}: ${error.message}`);
    return null;
  }
}


// Delete a player account by their email
export async function deletePlayerAccount(email: string): Promise<void> {
  try {
    const result = await PlayersCollection.removeAsync({ email });
    if (result === 0) {
      console.error(`No player found with email: ${email}`);
    } else {
      console.log(`Player with email ${email} deleted successfully.`);
    }
  } catch (error) {
    console.error(`Error deleting player account: ${error.message}`);
  }
}

export async function updatePlayerAccount(
  _id: string,
  updates: Partial<PlayerAccountSchema>
): Promise<void> {
  try {
    // Check if player exists
    const existingPlayer = await PlayersCollection.findOneAsync({ _id });
    if (!existingPlayer) {
      console.error(`No player found with email ${_id}.`);
      return;
    }

    // If a new password is provided, hash it
    if (updates.password) {
  updates.password = await hashPassword(updates.password);
  } else {
    delete updates.password; // make sure no null/undefined overwrites existing password
  }

    // Merge existing player data with updates to ensure all required fields stay filled
    const mergedPlayer: PlayerAccountSchema = {
      ...existingPlayer,
      ...updates,
      stats: {
        ...existingPlayer.stats,
        ...(updates.stats || {})
      },
      monstersStat: updates.monstersStat || existingPlayer.monstersStat,
      achievements: updates.achievements || existingPlayer.achievements, 
      adventureProgression: {
        ...existingPlayer.adventureProgression,
        ...(updates.adventureProgression || {})
      }
    };

    // Perform the update
    await PlayersCollection.updateAsync(
      { _id },
      { $set: mergedPlayer }
    );
  } catch (error) {
    console.error(`Error updating player account: ${error.message}`);
  }
}


// Retrieves the top N players sorted by number of games won

export async function getTopPlayersByWins(_limit: number) {
  try {
    // Get the top players sorted by numGamesWon in descending order
    const topPlayers = await PlayersCollection.find(
      {}, 
      { sort: { 'stats.numGamesWon': -1 }, limit: _limit }
    ).fetch();

    console.log('Top Players:', topPlayers);

    // Filter out documents with missing or invalid stats (just in case)
    const validPlayers = topPlayers.filter(player => player.stats && player.stats.numGamesWon !== undefined);

    // Return player name, numGamesWon, numGamesPlayed
    return validPlayers.map(player => ({
      username: player.username,
      numGamesWon: player.stats.numGamesWon,
      numGamesPlayed: player.stats.numGamesPlayed
    }));

  } catch (error) {
    console.error(`Error fetching top players: ${error.message}`);
    return [];
  }
}
