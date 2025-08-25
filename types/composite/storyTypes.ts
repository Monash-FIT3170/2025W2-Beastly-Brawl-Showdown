import { Equipment } from "/server/src/model/game/item/equipment";
import { Monster } from "/server/src/model/game/monster/monster";

export interface storyStruct {
  id: string | null;
  level: number[] | null;
  description: string;
  outcomes: storyOutcomes[];
}

export interface storyOutcomes {
  id: string;
  type: string;
  result?: string[];
  options?: option[]; // UPDATE
  statChange?: [string, number];
  enemyId?: string; // <-- NEW
  enemy?: Monster; // populated at runtime
  itemId?: string; // <-- NEW
  item?: any; // populated at runtime
  equipmentId?: string;
  equipment?: any; //populated at runtime
  next?: string;
}

export interface option {
  id: string;
  chance?: number;
  text?: string;
  next: string;
}

export enum EncounterType {
  FIGHT = "FIGHT",
  ITEM = "ITEM",
  EQUIPMENT = "EQUIPMENT",
  STAT_CHANGE = "STAT_CHANGE",
  DIALOGUE = "DIALOGUE",
  RANDOM = "RANDOM",
  CHOICE = "CHOICE",
}
