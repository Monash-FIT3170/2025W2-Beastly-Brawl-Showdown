import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";
import socket from "../../socket";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getBiomeString } from "./AdventureBattle";

interface LevelSelectProps {}

const LevelSelect: React.FC<LevelSelectProps> = () => {
  const [observedLevel, setObservedLevel] = useState<number>(0);
  const UNLOCKED_LEVELS = [0];

  //a levelMap exists in back end too - so update both appropriately
  const levelMap: Record<number, MonsterIdentifier> = {
    0: MonsterIdentifier.POUNCING_BANDIT,
    1: MonsterIdentifier.CINDER_TAIL,
    2: MonsterIdentifier.FURIOUS_FLIPPER,
    3: MonsterIdentifier.POISON_POGO,
    4: MonsterIdentifier.CHARMER_COBRA,
  };

  const alterLevel = (val: number) => {
    setObservedLevel(observedLevel + val);
  };

  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: observedLevel + 1 });
    FlowRouter.go("/adventure/monster-select");
  };

  const monster = levelMap[observedLevel] ?? "None";

  // TODO: PUT SILHOUETTES AND
  const monsterImage = UNLOCKED_LEVELS.includes(observedLevel)
    ? "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
      monster +
      ".png"
    : "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/silhouettes/" +
      monster +
      "_SILHOUETTE.png";

  const backgroundString =
    "url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    getBiomeString(monster) +
    ".jpg')";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100dvh] gap-8">
        <GenericHeader color="lightYellow">
          <OutlineText size="extraLarge">START YOUR JOURNEY</OutlineText>
        </GenericHeader>
        <div
          className={`border-[4px] 
            border-blackCurrant w-min h-min rounded-xl
            bg-peach
            sm:h-min
            sm:w-[80dvw]
            lg:h-min
            lg:w-[40dvw]
            border-[3px]
            border-blackCurrant
            rounded-[20px]
            w-[60%]
            box-border
            flex flex-col  justify-evenly items-center gap-y-10 py-10`}
          style={{
            backgroundImage: backgroundString,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/*Add the monster image from the chapter and make the proceed button's colour and text conditional on the user's eligbility*/}
          <img
            src={monsterImage}
            className="sm:w-[20rem] sm:h-[20rem] lg:w-[15rem] lg:h-[15rem]"
          />
          <ButtonGeneric
            color={UNLOCKED_LEVELS.includes(observedLevel) ? `ronchi` : `alto`}
            size="battle"
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
                size="medium"
                onClick={() => alterLevel(-1)}
              />
            )}
          </div>

          <div className="w-min">
            <ButtonGeneric
              color="red"
              size="battle"
              onClick={() => FlowRouter.go("/")}
            >
              BACK
            </ButtonGeneric>
          </div>

          <div className="flex justify-center items-center">
            {observedLevel != 4 && (
              <IconButton
                style="arrowright"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => alterLevel(1)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelSelect;
