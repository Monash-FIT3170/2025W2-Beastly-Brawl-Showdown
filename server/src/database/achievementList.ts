import { AchievementSchema } from "./dbManager";
import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";

export function createAchievementSchema(
  name: string,
  description: string,
  objectives: Record<string, boolean | number> = {},
  progress: number = 0,
  goal: number = 0,
  status: boolean = false,
  hidden: boolean = false
): AchievementSchema {
  return {
    name,
    description,
    status,
    progress,
    goal,
    objectives,
    hidden,
  };
}
// Create acheivements Here

// undefined is too skip the optional parameters
const ach1 = createAchievementSchema(
  "Can't stop winning",
  "Get 100 wins in any gamemode",
  undefined,
  undefined,
  100
);

const ach4 = createAchievementSchema(
  "First Achievement",
  "Find the Achievement's Page",
  undefined,
  1,
  1,
  true
);
const ach2 = createAchievementSchema(
  "Defeat the wolf",
  "Defeat the wolf",
  undefined,
  undefined,
  100,
  undefined,
  true
);

// Example - using objective, would be to follow the above pattern and have an objectives list which maps a enum colour to a boolean
//What this lets you do is when you call updateAchievement you putin the secondary input which is for updating the object this lets
//you create achievements like see all slime varients etc

const list = {
  [MonsterIdentifier.SLIME]: false,
  [MonsterIdentifier.ROCKY_RHINO]: false,
};

const ach3 = createAchievementSchema(
  "Defeat All Monster Types",
  "Defeat All Monster Types",
  list,
  undefined,
  Object.keys(list).length,
  undefined,
  true
);
//Add all created Achievements into this
export const Achievements: AchievementSchema[] = [ach1, ach2, ach3, ach4];
