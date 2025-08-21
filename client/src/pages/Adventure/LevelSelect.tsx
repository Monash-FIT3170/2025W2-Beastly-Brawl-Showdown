import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";
import socket from "../../socket";

interface LevelSelectProps {}

const LevelSelect: React.FC<LevelSelectProps> = () => {
  const [observedLevel, setObservedLevel] = useState<number>(0);
  const UNLOCKED_LEVELS = [0, 1];

  const alterLevel = (val: number) => {
    setObservedLevel(observedLevel + val);
  };

  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: observedLevel + 1 });
    FlowRouter.go("/adventure/monster-select");
  };
  const monster = "None";
  const monsterImage = "/assets/characters/" + monster + ".png";

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] gap-8">
      <GenericHeader color="lightYellow">
        <OutlineText size="extraLarge">START YOUR JOURNEY</OutlineText>
      </GenericHeader>

      <div
        className={`border-[4px] 
            border-blackCurrant w-min h-min rounded-xl
            bg-[#FFE8B1]
            sm:h-min
            sm:w-[95dvw]
            lg:h-min
            lg:w-[40dvw]
            border-[3px]
            border-[#403245]
            rounded-[20px]
            w-[60%]
            box-border
            flex flex-col items-center`}
      >
        {/*Add the monster image from the chapter and make the proceed button's colour and text conditional on the user's eligbility*/}
        <OutlineText size="extraLarge">NEXT CHAPTER</OutlineText>
        <img src={monsterImage} />
        <ButtonGeneric
          color={UNLOCKED_LEVELS.includes(observedLevel) ? `ronchi` : `alto`}
          size="large"
          onClick={
            UNLOCKED_LEVELS.includes(observedLevel)
              ? renderAdventureMonsterSelect
              : undefined
          }
        >
          {UNLOCKED_LEVELS.includes(observedLevel) ? `PROCEED` : `LOCKED`}
        </ButtonGeneric>
      </div>
      <div className="grid grid-cols-3 justify-items-center">
        <div className="flex justify-center items-center">
          {observedLevel != 0 && (
            <IconButton
              style="arrowleft"
              buttonColour="blue"
              iconColour="black"
              size="large"
              onClick={() => alterLevel(-1)}
            />
          )}
        </div>

        <div className="w-min">
          <ButtonGeneric
            color="red"
            size="large"
            onClick={() => FlowRouter.go("/")}
          >
            BACK
          </ButtonGeneric>
        </div>

        <div className="flex justify-center items-center">
          {observedLevel != 5 && (
            <IconButton
              style="arrowright"
              buttonColour="blue"
              iconColour="black"
              size="large"
              onClick={() => alterLevel(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
