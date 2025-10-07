import { AchievementSchema, AchievementStatus } from  "./dbManager"


export function createAchievementSchema(
  name: string,
  description: string,
  objectives?: Record<string, boolean | number>,
  progress?: 0,
  goal?: number,
  status: AchievementStatus = 'locked'
): AchievementSchema {
  return {
    name,
    description,
    status,
    progress,
    goal,
    objectives
  };
}
// Create acheivements Here






//Add all created Achievements into this
export const Achievements: AchievementSchema[] = [
  
];