import React, { useState, useEffect } from "react";
import socket from "../socket"
import { GlobalLeaderboardPlayerCard } from "./GlobalLeaderboardPlayerCard";
import { OutlineText } from "../components/texts/OutlineText";
import { BlankPage } from "../components/pagelayouts/BlankPage";
import { ButtonGeneric } from "../components/buttons/ButtonGeneric";
import { GenericIcon } from "../components/icons/GenericIcon";
import { IconButton } from "../components/buttons/IconButton";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";


function testLog(input) {
    console.log("Test Log:", input);
}

interface LeaderboardEntry {
    username: string;
    score: number;
}

type SortOption = "wins" | "gamesPlayed";
interface SortConfig {
  key: SortOption;
  label: string;
  data: LeaderboardEntry[];
}

export const GlobalLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[][]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const sortLabels = ["Wins", "Games Played"];

  // Use the GlobalLeaderboardHandler to fetch and display the leaderboard
  useEffect(() => {
    socket.emit("fetchGlobalLeaderboard");

    const leaderboardListener = (data: { success: boolean; data?: any[]; message?: string }) => {
      if (data.success && data.data) {
        // Data retrieved and set as a state.
        console.log("Leaderboard Data:", data.data);
        setLeaderboardData(data.data);
        console.log('batch0',data.data[0])
        console.log('batch1', data.data[1])
      } else {
        console.error("Failed to fetch leaderboard:", data.message);
      }
    };

    socket.on("globalLeaderboardData", leaderboardListener);

    return () => {
      socket.off("globalLeaderboardData", leaderboardListener);
    };
  }, []);

  const toggleSortBy = () => {
    setCurrentIndex((prev) => (prev + 1) % sortLabels.length);
  };

  const currentLeaderboardData = leaderboardData[currentIndex] || [];
  const sortLabel = sortLabels[currentIndex] || "Unknown";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pastelYellow to-pastelPink">
      {/* Back button - top left corner */}
      <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6 absolute">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size="medium"
          onClick={() => FlowRouter.go("/")}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-start pt-24 p-8">
        {/* Title */}
        <div className="bg-purple-400 border-4 border-blackCurrant rounded-xl px-12 py-4 mb-8">
          <h1 className="text-outline text-[4rem] font-[Jua]">
            GLOBAL LEADERBOARD
          </h1>
        </div>

        {/* Sort Toggle Button */}
        <div className="mb-6">
          <ButtonGeneric size="large" color="blue" onClick={toggleSortBy}>
            SORTED BY: {sortLabel}
          </ButtonGeneric>
        </div>

        {/* Player Cards */}
        <div className="w-full max-w-4xl flex flex-col gap-4">
          {currentLeaderboardData && currentLeaderboardData.length > 0 ? (
            currentLeaderboardData.map((entry, index) => {
              // testLog(entry);
              return (
                <GlobalLeaderboardPlayerCard
                  key={index}
                  username={entry.username}
                  score={entry.score}
                  rank={index + 1}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">No leaderboard data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};