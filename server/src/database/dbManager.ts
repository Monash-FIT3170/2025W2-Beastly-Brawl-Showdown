import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Monster } from '../model/game/monster/monster';
// Import the 3 monster types
import { RockyRhino } from '../model/game/monster/rockyRhino';
import { CinderTail } from '../model/game/monster/cinderTail';
import { PouncingBandit } from '../model/game/monster/pouncingBandit';


// Schema for a Player Account 
export interface PlayerAccountSchema {
  email: string;
  username: string;
  password: string;
  level: number;
  stats: {
    numGamesPlayed: number;
    numGamesWon: number;
  }
  achievments: string[];
  monstersStat: PlayerMonsterStatSchema[]; 
}

// Schema for the Player's monsters stats customization
export interface PlayerMonsterStatSchema {
  monsterId: string,
  maxHealth: number,
  attackBonus: number,
  armourClass: number
}

// Collections
export const PlayersCollection = new Mongo.Collection('players');





/** Helper functions that ... 
 * retrieves information/data locally 
 * creates new instances of monsters or players
 * */
const monsterList: <Monster>[] = [new RockyRhino(), new CinderTail(), new PouncingBandit()];

// Gets default stats of monsters
function getBaseMonsterStats(monsterId: string): { maxHealth: number, attackBonus: number, armourClass: number } {
  const monster = monsterList.find(m => m.getId() === monsterId);
  if (!monster) {throw new Error(`Monster with id ${monsterId} not found.`);}

  return {
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
    maxHealth: baseStats.maxHealth,
    attackBonus: baseStats.attackBonus,
    armourClass: baseStats.armourClass,
  };
}

// Used for initializing a Player Account that represents a Guest. Will be overwritten when users register/logins
// NOTE: For now, default/guest accounts have blank fields. May need to refactor this. 
export function createDefaultPlayerAccountSchema(): PlayerAccountSchema {
  return {
    email: '',
    username: '',
    password: '',
    level: 1,
    stats: {
      numGamesPlayed: 0,
      numGamesWon: 0,
    },
    achievments: [],
    monstersStat: [
      createPlayerMonsterStatSchema('ROCKY_RHINO'),
      createPlayerMonsterStatSchema('CINDER_TAIL'),
      createPlayerMonsterStatSchema('POUNCING_BANDIT'),
    ],
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

    // Create a new player object with default values
    const newPlayer: PlayerAccountSchema = {
      email,
      username,
      password,
      level: 1, 
      stats: {
        numGamesPlayed: 0, 
        numGamesWon: 0,
      },
      achievments: [], 
      monstersStat: [
        createPlayerMonsterStatSchema('ROCKY_RHINO'), 
        createPlayerMonsterStatSchema('CINDER_TAIL'), 
        createPlayerMonsterStatSchema('POUNCING_BANDIT'),
      ], 
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
      email: player.email,
      username: player.username,
      password: player.password,
      level: player.level,
      stats: {
        numGamesPlayed: player.stats.numGamesPlayed,
        numGamesWon: player.stats.numGamesWon,
      },
      achievments: player.achievments,
      monstersStat: player.monstersStat
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



