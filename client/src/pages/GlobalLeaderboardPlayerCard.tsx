import React from "react";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../components/texts/BlackText";


interface GlobalLeaderboardPlayerCardProps {
    username: string;
    score: number;
    rank: number;
  }

export const GlobalLeaderboardPlayerCard = ({
    username,
    score,
    rank,
}: GlobalLeaderboardPlayerCardProps) => {

    const getRankColor = () => {
        switch (rank) {
          case 1:
            return "bg-yellow-400"; 
          case 2:
            return "bg-quillGray"; 
          case 3:
            return "bg-orange-400";
          default:
            return "bg-gray-400";
        }
      };

      return (
        <div
          className={`${getRankColor()} 
                    border border-[4px] border-blackCurrant 
                    rounded-xl
                    w-full
                    flex flex-row items-center
                    min-h-[8rem]
                    px-8
                    transition-transform
                    duration-200
                    ease-in-out 
                    hover:scale-101 
                    hover:shadow-md`}
        >
          {/* Rank Number */}
          <div className="flex shrink-0 justify-center items-center w-[4rem]">
            <p className="text-outline text-[3rem] font-[Jua]">
              {rank}
            </p>
          </div>
    
          {/* Player Name */}
          <div className="flex flex-col text-left grow px-4">
            <BlackText size="large">{username}</BlackText>
          </div>
    
          {/* Score */}
          <div className="flex shrink-0 justify-center items-center">
            <p className="text-outline text-[2.5rem] font-[Jua]">
              {score}
            </p>
          </div>
        </div>
      );
}