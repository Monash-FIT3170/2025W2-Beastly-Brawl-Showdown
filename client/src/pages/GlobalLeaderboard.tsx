import React, { useState, useEffect } from "react";
import socket from "../socket"



export const GlobalLeaderboard = () => {

    // Use the GlobalLeaderboardHandler to fetch and display the leaderboard
    useEffect(() => {
        socket.emit("fetchGlobalLeaderboard");
    
        const leaderboardListener = (data: { success: boolean; data?: any[]; message?: string }) => {
        //   if (data.success && data.data) {
        //     console.log("Leaderboard Data:", data.data);
        //     // Here you would typically set state to display the data
        //   } else {
        //     console.error("Failed to fetch leaderboard:", data.message);
        //   }
        };
    
        socket.on("globalLeaderboardData", leaderboardListener);
    
        return () => {
          socket.off("globalLeaderboardData", leaderboardListener);
        };
      }, []);
    

   return (
    <div>hi, page in progress</div>
   )
}
