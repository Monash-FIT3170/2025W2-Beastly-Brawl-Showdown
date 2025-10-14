import { AchievementSchema } from "./dbManager";

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
const ach2 = createAchievementSchema(
  "Defeat the wolf",
  "Defeat the wolf",
  undefined,
  undefined,
  100,
  undefined,
  true
);

// Example using objective, would be to follow the above pattern and have an objectives list which maps a enum colour to a boolean
//What this lets you do is when you call updateAchievement you putin the secondary input which is for updating the object this lets
//you create achievements like see all slime varients etc

//Add all created Achievements into this
export const Achievements: AchievementSchema[] = [ach1, ach2];
