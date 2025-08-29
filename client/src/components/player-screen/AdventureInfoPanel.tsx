import React from "react";
import { PlayerState } from "/types/single/playerState";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";

interface AdventureInfoPanelProps {
  playerState: PlayerState;
  level: number;
  stage: number;
}

export const AdventureInfoPanel: React.FC<AdventureInfoPanelProps> = ({
  playerState,
  level,
  stage,
}) => {
  //TODO: get proper level/stage
  //TODO: figure out why this disappears on occasion....
  //TODO: FIGURE OUT WHY MOBILE LOOKS COOKED..

  /*
      bg-[#ffe9af]
      border
      border-4
      border-[#3d2f4f]
      rounded-bl-[20px]
      rounded-br-[20px]
      flex
      justify-between
      px-[20px]
      py-[12px]
      w-auto
      box-border
      mx-[8px]
      mt-[-8px]


      className="
  bg-[#ffe9af]
  box-border
  border border-2 sm:border-4 border-[#3d2f4f]
  rounded-bl-[16px] sm:rounded-bl-[20px]
  rounded-br-[16px] sm:rounded-br-[20px]
  mx-2 sm:mx-[8px]
  -mt-1 sm:-mt-2
  px-4 sm:px-[10px]
  py-2 sm:py-[40px]
  flex flex-col gap-2
"
  */

  return (
    <>
      <div
        className="
      bg-[#ffe9af]
      border
      border-4
      border-[#3d2f4f]
      rounded-bl-[20px]
      rounded-br-[20px]
      flex flex-col gap-2
      px-[20px]
      py-[12px]
      w-auto
      box-border
      mx-[8px]
      mt-[-8px]
    "
      >
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
            {playerState.name.toUpperCase()}
          </OutlineText>
        </div>
        <div>
          <BattleHealthBar
            currentHealth={playerState.currentHealth}
            maxHealth={playerState.monster?.maxHealth ?? 10000}
          />
          <div className="flex flex-row">
            <div className="size-[30px]" />
            {playerState.statuses.map((status) => (
              <img
                className=" size-[30px] object-contain rounded-md block"
                src={`/assets/statuses/${status.name.toUpperCase()}.png`}
                alt={`${status.name.toUpperCase()} image`}
              />
            ))}
          </div>
        </div>
        <div class="flex justify-between text-sm">
          <span>
            <OutlineText size="small">LEVEL: {level}</OutlineText>
          </span>
          <span>
            {" "}
            <OutlineText size="small">STAGE: {stage}</OutlineText>
          </span>
        </div>
      </div>
    </>
  );
};
