import React from "react";
import { PlayerState } from "/types/single/playerState";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";
import { Status } from "/server/src/model/game/status/status";
import { BlackText } from "../texts/BlackText";
import { MonsterIdentifier } from "/types/single/monsterState";

interface AdventureInfoPanelProps {
  playerState: PlayerState;
  level: MonsterIdentifier;
  stage: number;
}

export const AdventureInfoPanel: React.FC<AdventureInfoPanelProps> = ({
  playerState,
  level,
  stage,
}) => {
  //TODO: get proper level/stage
  //TODO: figure out why this disappears on occasion....
  //todo: make status icons bigger for mobile

  var testingMap = ["STUN", "STUN", "POISON"];
  // testingMap = [];

  return (
    <>
      <div
        className="
      bg-[#ffe9af]
      flex flex-col gap-2
      box-border
      border
      border-4
      border-[#3d2f4f]
      rounded-bl-[20px]
      rounded-br-[20px]
      sm:outline-[0.25rem]
      md:outline-[0.1rem]
      w-auto
      sm:h-[20rem]
      lg:h-auto
      mx-[8px]
      lg:mt-[-8px]
      sm:mt-[-2rem]
      px-[20px]
      py-[1rem]
      lg:pt-[1rem]  
      sm:pt-[3rem]
    "
      >
        {/* Player Name */}
        <div className="flex leading-none pt-[2%]">
          <OutlineText size="medium">
            {`${playerState.name.toUpperCase()}'S ${playerState.monster?.name.toUpperCase()}`}
          </OutlineText>
        </div>

        <div>
          {/* Health Bar */}
          <BattleHealthBar
            currentHealth={playerState.currentHealth}
            maxHealth={playerState.monster?.maxHealth ?? 10000}
          />
          {/* Status Map */}
          <div className="flex flex-row pt-[10px]">
            {playerState.statuses.length === 0 && (
              <div className="lg:size-[1rem] sm:size-[3rem]" />
            )}{" "}
            {playerState.statuses.map((status) => (
              <img
                className=" size-[30px] object-contain rounded-md inline-block"
                src={`/assets/statuses/${status.name.toUpperCase()}.png`}
                alt={`${status.name.toUpperCase()} image`}
              />
            ))}
            {/* {testingMap.map((status) => (
              <img
                className=" lg:size-[30px] sm:size-[50px] object-contain rounded-md inline-block"
                src={`/assets/statuses/${status.toUpperCase()}.png`}
                alt={`${status.toUpperCase()} image`}
              />
            ))} */}
          </div>
        </div>
        {/* Adventure Level/Stage */}
        <div className="flex justify-between">
          <OutlineText size="medium">LEVEL: {level}</OutlineText>{" "}
          <OutlineText size="medium">STAGE: {stage}</OutlineText>
        </div>
      </div>
    </>
  );
};
