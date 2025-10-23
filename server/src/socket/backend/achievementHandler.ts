import { Server, Socket } from "socket.io";
import {
  getPlayerData,
  updatePlayerAccount,
  verifyPassword,
  createDefaultPlayerAccountSchema,
} from "../../database/dbManager";
import { playerAccounts } from "../../../main";
import { Achievements } from "../../database/achievementList";

export const achievementHandler = (io: Server, socket: Socket) => {
  socket.on("updateAchievement", async (achievementId, check?) => {
    const user = playerAccounts.get(socket.id);

    const achievement = user?.achievements.find(
      (a) => a.name === achievementId
    );

    if (!user) {
      console.error(`User Not found`);
      return;
    }

    if (!achievement) {
      console.error(`Achievement Not found`);
      return;
    }

    console.log(`Checking player: ${user.username} achievement status`);

    if (achievement.status) {
      console.log(`Player has already unlocked ${achievementId}`);
      return;
    }

    if (achievement.objectives[check]) {
      console.log(`Player has already unlocked objective ${check}`);
      return;
    }

    //Update values
    console.log(`Updating players achievement stats`);
    achievement.progress += 1;
    if (achievement.objectives[check]) {
      achievement.objectives[check] = true;
    }

    if (achievement.progress >= achievement.goal) {
      achievement.status = true;
      achievement.hidden = false;
      console.log(`Player has completed achievement ${achievementId}`);
    }

    try {
      await updatePlayerAccount(user._id, { achievements: user.achievements });
    } catch (error: any) {
      console.error(`Error updating player ${user.username}: ${error.message}`);
    }
  });

  socket.on("fetchAchievement", async () => {
    const user = playerAccounts.get(socket.id);

    const achievements = user?.achievements;

    console.log(`Emitting player: ${user?.username} achievement data`);

    socket.emit("achievementData", { achievements });
  });

  socket.on("syncAchievements", async () => {
    const user = playerAccounts.get(socket.id);

    const userAchievementIds = new Set(user.achievements.map((a) => a._id));

    for (const masterAch of Achievements) {
      if (!userAchievementIds.has(masterAch._id)) {
        user.achievements.push(masterAch);
        console.log(
          `Added new achievement "${masterAch.name}" for ${user.username}`
        );
      }
    }

    // Persist updated achievements to database
    await updatePlayerAccount(user._id, { achievements: user.achievements });
  });
};
