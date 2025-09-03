import React from "react";
import { OutlineText } from "../texts/OutlineText";
import { PlayerState } from "/types/single/playerState";

interface RankingBarProps {
  player: PlayerState;
  rank: number;
}

export const RankingBar = ({ player, rank }: RankingBarProps) => {
  const rankingBarStyleSets: Record<number, [string, string]> = {
    1: ["1st", "bg-schoolBusYellow"],
    2: ["2nd", "bg-brightsilver"],
    3: ["3rd", "bg-terracotta"]
  };

  const rankToDisplay = rankingBarStyleSets[rank][0];
  const colourToDisplay = rankingBarStyleSets[rank][1];
  const imagePath = "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" + player.monster?.id + ".png";
  const altText = "Image of " + player.monster?.name;

  const rankingBarProperties = `
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
    ${colourToDisplay}
  `;

  return (
    <div className="flex flex-row h-full w-full items-center justify-between">
      <div className="relative w-full h-12">
        <div className={`${rankingBarProperties}`}>
          <div className="flex justify-between items-center w-full px-3">
            <div className="flex flex-col leading-none pt-[0.25rem]">
              <OutlineText size="large">
                {player.name.toUpperCase()}
              </OutlineText>
            </div>

            <div className="flex items-center leading-none max-w-[5rem] text-center justify-end break-words">
              <OutlineText size="small">
                {player.monster?.name}
              </OutlineText>

              <img
                src={imagePath}
                alt={altText}
                className="w-[80%] h-[80%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-[0.5rem]">
        <OutlineText size="large">
          {rankToDisplay}
        </OutlineText>
      </div>
    </div>
  );
};
