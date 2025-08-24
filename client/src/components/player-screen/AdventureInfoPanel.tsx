import React from "react";
import { PlayerState } from "/types/single/playerState";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";

interface AdventureInfoPanelProps {
  playerState: PlayerState;
}

export const AdventureInfoPanel: React.FC<AdventureInfoPanelProps> = ({
  playerState,
}) => {
  //TODO: actually add everything...
  //TODO: figure out why this disappears on occasion....
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
      flex
      justify-between
      px-[20px]
      py-[12px]
      w-auto
      box-border
      mx-[8px]
      mt-[-8px]
    "
      >
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
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
            {playerState.monster?.name.toUpperCase()}
          </OutlineText>
        </div>
        <div className="leading-none pb-[2%]">
          <OutlineText size="medium">
            {playerState.name.toUpperCase()}
          </OutlineText>
        </div>
      </div>
    </>
  );
};
