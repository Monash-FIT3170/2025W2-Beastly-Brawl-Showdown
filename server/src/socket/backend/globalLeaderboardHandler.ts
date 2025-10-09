// responsible for handling global leaderboard requests

import { Server, Socket } from "socket.io";
import { getTopPlayersByWins } from "../../database/dbManager";

export const globalLeaderboardHandler = (io: Server, socket: Socket) => {
  socket.on("fetchGlobalLeaderboard", async () => {
    try {
      const topPlayers = await getTopPlayersByWins(10);
      socket.emit("globalLeaderboardData", { success: true, data: topPlayers });
    } catch (error) {
      console.error("Error fetching global leaderboard:", error);
      socket.emit("globalLeaderboardData", {
        success: false,
        message: "Failed to fetch leaderboard",
      });
    }
  });
};