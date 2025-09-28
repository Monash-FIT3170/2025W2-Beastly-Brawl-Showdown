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
  const [observedLevel, setObservedLevel] = useState<number>(1);
  // const UNLOCKED_LEVELS = [0];
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);

  //a levelMap exists in back end too - so update both appropriately
  const levelMap: Record<number, MonsterIdentifier> = {
    1: MonsterIdentifier.POUNCING_BANDIT,
    2: MonsterIdentifier.CINDER_TAIL,
    3: MonsterIdentifier.FURIOUS_FLIPPER,
    4: MonsterIdentifier.POISON_POGO,
    5: MonsterIdentifier.CHARMER_COBRA,
  };

  const alterLevel = (val: number) => {
    setObservedLevel(observedLevel + val);
  };

  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: observedLevel });
    FlowRouter.go("/adventure/monster-select");
  };

  const monster = levelMap[observedLevel] ?? "None";

  useEffect(() => {
    socket.emit("request_unlocked_levels");

    socket.on("unlocked_levels", (levels: number[]) => {
      setUnlockedLevels(levels);
    });

    return () => {
      socket.off("request_unlocked_levels");
    };
  }, []);

  // TODO: PUT SILHOUETTES AND
  const monsterImage = unlockedLevels.includes(observedLevel)
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
            color={unlockedLevels.includes(observedLevel) ? `ronchi` : `alto`}
            size="battle"
            onClick={
              unlockedLevels.includes(observedLevel)
                ? renderAdventureMonsterSelect
                : undefined
            }
          >
            {unlockedLevels.includes(observedLevel) ? `PROCEED` : `LOCKED`}
          </ButtonGeneric>
        </div>
        <div className="grid grid-cols-3 justify-items-center">
          <div className="flex justify-center items-center">
            {observedLevel != 1 && (
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
            {observedLevel != 5 && (
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
