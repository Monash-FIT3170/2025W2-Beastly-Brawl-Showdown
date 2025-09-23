import { Equipment } from "../../server/src/model/game/equipment/equipment";
import { Monster } from "/server/src/model/game/monster/monster";
import { Status } from "/server/src/model/game/status/status";

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
  statusId?: string;
  status: Status; // populated at runtime
  enemyId?: string; // <-- NEW
  enemy?: Monster; // populated at runtime
  consumableId?: string; // <-- NEW
  consumable?: any; // populated at runtime
  equipmentId?: string;
  equipment?: any; //populated at runtime
  storyItemId?: string;
  storyItem?: any;
  next?: string;
}

export interface option {
  id: string;
  chance?: number;
  text?: string;
  prerequisite?: string[];
  next: string;
}

export enum EncounterType {
  FIGHT = "FIGHT",
  CONSUMABLE = "CONSUMABLE",
  EQUIPMENT = "EQUIPMENT",
  STORY_ITEM = "STORY_ITEM",
  STAT_CHANGE = "STAT_CHANGE",
  DIALOGUE = "DIALOGUE",
  RANDOM = "RANDOM",
  CHOICE = "CHOICE",
  PREREQUISITE = "PREREQUISITE",
  STATUS = "STATUS",
}
