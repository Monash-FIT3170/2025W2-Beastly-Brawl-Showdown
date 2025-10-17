// responsible for handling global leaderboard requests

import { Server, Socket } from "socket.io";
import { getTopPlayersByWins, getTopPlayersByNumGamesPlayed, getTopPlayersByRaidScore } from "../../database/dbManager";

export const globalLeaderboardHandler = (io: Server, socket: Socket) => {
  socket.on("fetchGlobalLeaderboard", async () => {
    try {
      // Leaderboard will get top 5 for now ... Can increase later
      // Fetch from database the top players 
      const topPlayersByWins = await getTopPlayersByWins(5);
      const topPlayersByNumGamesPlayed = await getTopPlayersByNumGamesPlayed(5);
      const topPlayersByRaidScore = await getTopPlayersByRaidScore(5);

      // Emit to client (GlobalLeaderboard)
      socket.emit("globalLeaderboardData", { success: true, data: [topPlayersByWins, topPlayersByNumGamesPlayed, topPlayersByRaidScore] });

    } catch (error) {
      console.error("Error fetching global leaderboard:", error);
      socket.emit("globalLeaderboardData", {
        success: false,
        message: "Failed to fetch leaderboard",
      });
    }
  });
};