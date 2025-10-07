import { create } from "node:domain";
import { AchievementSchema, AchievementStatus } from  "./dbManager"
import { NullAction } from "../model/game/action/null";


export function createAchievementSchema(
  name: string,
  description: string,
  objectives?: Record<string, boolean | number>,
  progress: number = 0,
  goal: number = 0,
  status: AchievementStatus = 'locked',
  hidden: boolean = false
): AchievementSchema {
  return {
    name,
    description,
    status,
    progress,
    goal,
    objectives,
    hidden
  };
}
// Create acheivements Here

// undefined is too skip the optional parameters 
const ach1 = createAchievementSchema("Can't stop winning", "Get 100 wins in any gamemode", undefined,undefined,100);




//Add all created Achievements into this
export const Achievements: AchievementSchema[] = [
    ach1,
  
];