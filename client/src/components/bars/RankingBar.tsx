import React from "react";
import { OutlineText } from "../texts/OutlineText";

interface RankingBarProps {
	playerName: string;
  monsterName: string;
  rank: number;
}

export const RankingBar = ({ playerName, monsterName, rank }: RankingBarProps) => {
  const colourToDisplay: Record<number, string> = {
    1: "bg-schoolBusYellow",
    2: "bg-brightsilver",
    3: "bg-terracotta"
  };

  const rankToDisplay: Record<number, string> = {
    1: "1st",
    2: "2nd",
    3: "3rd"
  };

  const baseFrontBarProperties = `
    absolute
    top-0
    left-0
    w-full
    h-full
    border-3
    flex
    items-center
    justify-center
    transition-[width]
    duration-300
    ease-in-out
    rounded-e-[0.5rem]
    justify-start pl-[3%]
    ${colourToDisplay[rank]}
  `;

  const altText = "Image of " + monsterName

	return (
    <div className="flex flex-row h-full w-full items-center justify-between">
      <div className="relative w-full h-12">
        <div className={`${baseFrontBarProperties}`}>
          <div className="flex justify-between items-center w-full px-3">
            <div className="flex flex-col leading-none">
              <OutlineText size="large">
                {playerName.toUpperCase()}
              </OutlineText>
            </div>

            <div className="flex items-center leading-none max-w-[5rem] text-center justify-end break-words">
              <OutlineText size="small">
                {monsterName}
              </OutlineText>

              <img
                src="/assets/characters/ROCKY_RHINO.png"
                alt={altText}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-[0.5rem]">
        <OutlineText size="large">
          {rankToDisplay[rank]}
        </OutlineText>
      </div>
    </div>
	);
};
