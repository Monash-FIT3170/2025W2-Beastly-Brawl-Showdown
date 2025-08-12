import { MonsterIdentifier } from "./monsterState";
import { Monster } from "/server/src/model/game/monster/monster";
import { Slime } from "/server/src/model/game/monster/slime";
import { Player } from "/server/src/model/game/player";

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
  //TODO: IMPLEMENT ITEMS
  // item?: Item;
  statChange?: [string, number];
  enemy?: Monster;
}

export enum EncounterType {
  FIGHT = "FIGHT",
  REWARD = "REWARD",
  STAT_CHANGE = "STAT_CHANGE",
  OTHER = "OTHER",
}

//Hey lets fight -> switch case(Fight) battle    switch case(Reward) -> add item to inven etc...       if nothing display string in outcome??????

/**
[
  {
    id: null,
    level: [1,2,3,4,5,6,7],
    stage: 4,
    description: "You stumble across a lake...",
    outcomes: [
      {
        choice: "walk around",
        subOutcomes: [{ range: [1, 100], result: "Nothing happens..." }],
      },
      {
        choice: "go fishing",
        subOutcomes: [
          {
            range: [1, 50],
            result: "You get a potion",
            type: EncounterType.REWARD,
            item: new Potion(),
          },
          {
            range: [51, 75],
            result: "You lose 2 HP",
            type: EncounterType.STAT_CHANGE,
            statChange: ["HP", -2],
          },
          {
            range: [76, 100],
            result: "You come across a slime",
            type: EncounterType.FIGHT,
            enemy: new Player("null", "slime"),
          },
        ],
      },
    ],
  },
  {
    id: null,
    level: [1,2,3,4,5,6,7],
    stage: 1,
    description: "mr slime",
    outcomes: [
      {
        subOutcomes: [
          {
            range: [1, 100],
            type: EncounterType.FIGHT,
            enemy: new Slime("mr slim", 1, MonsterIdentifier.SLIME),
          },
        ],
      },
    ],
  },
  {
    id: null,
    level: [1,2,3,4,5,6,7],
    stage: 2,
    description: "mrs slime",
    outcomes: [
      {
        subOutcomes: [
          {
            range: [1, 100],
            type: EncounterType.FIGHT,
            enemy: new Slime("mr slim", 2, MonsterIdentifier.SLIME),
          },
        ],
      },
    ],
  },
];
*/
