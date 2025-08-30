import React, { ReactNode, useEffect, useState } from "react";
import { PopupClean } from "./PopupClean";
import { ChoicePopup } from "./ChoicePopup";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { DialogueChoiceButton } from "../buttons/DialogueChoiceButton";
import { PlayerState } from "/types/single/playerState";
import { Status } from "/server/src/model/game/status/status";
import { IconButton } from "../buttons/IconButton";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";
import { PopupAdventure } from "./PopupAdventure";
import {
  ActionIdentifier,
  ActionState,
  AttackState,
} from "/types/single/actionState";
import { BlackText } from "../texts/BlackText";
import { StatInfoIcon } from "../cards/StatInfoIcon";
import { AdventureStatBar } from "../bars/AdventureStatBar";

export interface AdventureInfoPopupProp {
  playerState: PlayerState | null | undefined;
  attackState: AttackState | null | undefined;
  onClose?: () => void;
}

export const AdventureInfoPopup = ({
  playerState,
  attackState,
  onClose,
}: AdventureInfoPopupProp) => {
  const [viewingTab, setViewingTab] = useState<number>(0);
  const [currentAbilities, setCurrentAbilities] = useState<ActionState[]>([]);
  const currentlyViewing = ["MONSTER STATS", "CURRENT STATUSES"];

  useEffect(() => {
    setCurrentAbilities([]);
    for (const action of playerState?.monster?.possibleActions!) {
      if (
        action.id !== ActionIdentifier.ATTACK &&
        action.id !== ActionIdentifier.DEFEND
      ) {
        setCurrentAbilities((prevAbilities) => [...prevAbilities, action]);
      }
    }
  }, [playerState?.monster?.possibleActions]);
  const monsterImgPath =
    "/assets/characters/" + playerState?.monster?.id + ".png";

  return (
    <PopupAdventure colour="goldenRod">
      <div className=" flex items-center flex-col outline-offset-0 relative gap-2 w-full h-full">
        <div className="bg-pictonBlue outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col items-center justify-center">
          <OutlineTextResizable size="large" max1={3}>
            {`${playerState?.name}'s ${playerState?.monster?.name}`}
          </OutlineTextResizable>
        </div>
        <img className="sm:size-[30vw] lg:size-[20vh]" src={monsterImgPath} />
        <div
          className={`flex  
            border-[4px] 
            border-blackCurrant rounded-xl
            grow
            sm:min-h-[20vh]
            sm:w-[90%]
            lg:min-h-[20vh]
            lg:w-[80%]
            border-[3px]
            border-[#403245]
            rounded-[20px]
            box-border
            bg-[#FFE8B1]
            flex-col
            gap-[1%]
            items-center
            py-1`}
        >
          <div className="bg-[#EDAF55] border-blackCurrant lg:border-[0.25rem] sm:border-[0.75rem] rounded-2xl flex flex-col items-center justify-center">
            <OutlineText size="choice-text">
              {currentlyViewing[viewingTab]}
            </OutlineText>
          </div>
          {viewingTab === 0 && (
            <>
              <div className="flex flex-row w-full">
                <StatInfoIcon
                  stat="ac"
                  statVal={playerState?.currentArmourClassStat!}
                ></StatInfoIcon>
                <StatInfoIcon
                  stat="hp"
                  statVal={playerState?.currentHealth!}
                ></StatInfoIcon>
                <StatInfoIcon
                  stat="atk+"
                  statVal={playerState?.currentAttackStat!}
                ></StatInfoIcon>
              </div>

              <div className="flex flex-col w-full">
                <AdventureStatBar
                  stat="Attack Damage"
                  statVal={attackState?.attackDamage!}
                ></AdventureStatBar>
                <AdventureStatBar
                  stat="Critical Hit Rate"
                  statVal={attackState?.critRate!}
                ></AdventureStatBar>
                <AdventureStatBar
                  stat="Dice Roll Range"
                  statVal={attackState?.diceRange!}
                ></AdventureStatBar>
              </div>

              <div className="bg-[#EDAF55] border-blackCurrant lg:border-[0.25rem] sm:border-[0.75rem] rounded-2xl flex flex-col items-center justify-center">
                <OutlineText size="choice-text">ABILITIES</OutlineText>
              </div>
              <div className="sm:w-[95%] lg:w-full flex sm:flex-col lg:flex-row justify-evenly">
                {currentAbilities.map((ability, idx) => (
                  <div
                    key={ability.id || idx}
                    className="flex flex-row items-center gap-[2%] lg:w-[45%]"
                  >
                    <img
                      src={"/assets/actions/" + ability.id + ".png"}
                      alt="ability icon"
                      className="w-[5rem] h-[5rem]"
                    />
                    <div className="flex flex-col items-start text-justify">
                      <OutlineTextResizable size="medium">
                        {ability.name}
                      </OutlineTextResizable>
                      {/**<BlackText size="medium">{ability.description}</BlackText>*/}
                      <BlackText size="tiny">{ability.description}</BlackText>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-3 justify-items-center">
          <div className="flex justify-center items-center">
            {viewingTab !== 0 && (
              <IconButton
                style="arrowleft"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => setViewingTab(viewingTab - 1)}
              />
            )}
          </div>

          <div className="w-min">
            <ButtonGeneric color="red" size="battle" onClick={onClose}>
              <OutlineText size="choice-text">Back</OutlineText>
            </ButtonGeneric>
          </div>

          <div className="flex justify-center items-center">
            {viewingTab !== 1 && (
              <IconButton
                style="arrowright"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => setViewingTab(viewingTab + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </PopupAdventure>
  );
};
