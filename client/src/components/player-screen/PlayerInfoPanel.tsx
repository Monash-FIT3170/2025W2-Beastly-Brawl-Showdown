import React from "react";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { BattleState } from "/types/composite/battleState";
import { OutlineText } from "../texts/OutlineText";

interface PlayerInfoPanelProps {
  battleState: BattleState;
}

export const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({ battleState }) => {
  return (
    <div className="
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
    ">
      <div className="
        flex
        flex-col
        gap-[4px]
        w-[45%]
        items-start
        text-left
      ">
        <BattleHealthBar currentHealth={battleState.yourPlayer.currentHealth} maxHealth={battleState.yourPlayerMonster.maxHealth}/>
        <div className="flex flex-row">
          <div className="size-[30px]"/>
          {battleState.yourPlayer.statuses.map((status) => (
            <img className = " size-[30px] object-contain rounded-md block" src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name.toUpperCase()}.png`} alt={`${status.name.toUpperCase()} image`}/>
          ))}
        </div>
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
              {battleState.yourPlayerMonster.name.toUpperCase()}
          </OutlineText>
        </div>
        <div className="leading-none pb-[2%]">
          <OutlineText size="medium">
              {battleState.yourPlayer.name.toUpperCase()}
          </OutlineText>
        </div>
      </div>
      <div className="
        flex
        flex-col
        gap-[4px]
        w-[45%]
        items-end
        text-right
      ">
        <BattleHealthBar currentHealth={battleState.opponentPlayer.currentHealth} maxHealth={battleState.opponentPlayerMonster.maxHealth}/>
        <div className="flex flex-row">
          <div className="size-[30px]"/>
          {battleState.opponentPlayer.statuses.map((status) => (
            <img className = " size-[30px] object-contain rounded-md block" src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name.toUpperCase()}.png`} alt={`${status.name.toUpperCase()} image`}/>
          ))}
        </div>
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
              {battleState.opponentPlayerMonster.name.toUpperCase()}
          </OutlineText>
        </div>
        <div className="leading-none pb-[2%]">
          <OutlineText size="medium">
            {battleState.opponentPlayer.name.toUpperCase()}
          </OutlineText>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoPanel;