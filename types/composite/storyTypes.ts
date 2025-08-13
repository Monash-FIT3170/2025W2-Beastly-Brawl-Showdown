import { Monster } from "/server/src/model/game/monster/monster";

export interface storyStruct {
  id: string | null;
  level: number[] | null;
  stage: number;
  description: string;
  outcomes: storyOutcomes[];
}

export interface storyOutcomes {
  choice?: string;
  subOutcomes: subOutcome[];
}

export interface subOutcome {
  range: [number, number];
  result?: string;
  type?: EncounterType;
  statChange?: [string, number];
  enemyId?: string; // <-- NEW
  enemy?: Monster;  // populated at runtime
  itemId?: string;  // <-- NEW
  item?: any;       // populated at runtime
}

export enum EncounterType {
  FIGHT = "FIGHT",
  REWARD = "REWARD",
  STAT_CHANGE = "STAT_CHANGE",
  OTHER = "OTHER"
}
