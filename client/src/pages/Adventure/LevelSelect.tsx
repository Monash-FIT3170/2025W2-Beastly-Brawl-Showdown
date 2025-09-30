import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";
import socket from "../../socket";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getBiomeString } from "./AdventureBattle";
import { monsterMeta } from "../../data/monsterMeta";
import { BlackText } from "../../components/texts/BlackText";
import { motion, AnimatePresence } from "framer-motion";

interface LevelSelectProps {}

const LevelSelect: React.FC<LevelSelectProps> = () => {
  const [observedLevel, setObservedLevel] = useState<number>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);

  // Level → Monster mapping
  const levelMap: Record<number, MonsterIdentifier> = {
    1: MonsterIdentifier.POUNCING_BANDIT,
    2: MonsterIdentifier.CINDER_TAIL,
    3: MonsterIdentifier.FURIOUS_FLIPPER,
    4: MonsterIdentifier.POISON_POGO,
    5: MonsterIdentifier.CHARMER_COBRA,
  };

  const alterLevel = (val: number) => {
    setObservedLevel((prev) => prev + val);
  };

  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: observedLevel });
    FlowRouter.go("/adventure/monster-select");
  };

  // Resolve monster and metadata
  const monster = levelMap[observedLevel] ?? MonsterIdentifier.POUNCING_BANDIT;
  const { name: actualMonsterName, description: actualMonsterDescription } =
    monsterMeta[monster];

  // If the level is locked, show placeholders
  const monsterName = unlockedLevels.includes(observedLevel)
    ? actualMonsterName
    : "???";
  const monsterDescription = unlockedLevels.includes(observedLevel)
    ? actualMonsterDescription
    : "You haven't reached this part of your journey yet. Keep adventuring to unlock more levels!";

  useEffect(() => {
    socket.emit("request_unlocked_levels");

    socket.on("unlocked_levels", (levels: number[]) => {
      setUnlockedLevels(levels);
    });

    return () => {
      socket.off("request_unlocked_levels");
    };
  }, []);

  // Monster image (coloured or silhouette if locked)
  const monsterImage = unlockedLevels.includes(observedLevel)
    ? `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/${monster}.png`
    : `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/silhouettes/${monster}_SILHOUETTE.png`;

  // Background image
  const backgroundString = `url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/${getBiomeString(
    monster
  )}.jpg')`;

  return (
    <div className="relative flex flex-col items-center justify-center h-[100dvh] w-full px-4 overflow-hidden">
      {/* AnimatePresence handles background transitions */}
      <AnimatePresence>
        <motion.div
          key={observedLevel} // ensures re-render on level change
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: backgroundString,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Foreground content (your existing code) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/")}
          />
        </div>

        {/* Header */}
        <GenericHeader color="lightYellow">
          <OutlineText size="extraLarge">CLASSIC</OutlineText>
        </GenericHeader>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 w-full max-w-5xl">
          <img
            src={monsterImage}
            className="
              w-[18rem] h-[18rem] sm:w-[20rem] sm:h-[20rem] lg:w-[14rem] lg:h-[14rem]
              drop-shadow-[0_0_4px_white] drop-shadow-[0_0_8px_white]
            "
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />

          <div className="border-4 border-blackCurrant rounded-2xl bg-white/70 p-6 w-[90%] sm:w-[80%] lg:w-[50%] max-w-md text-center">
            <OutlineText size="large">{monsterName}</OutlineText>
            <BlackText size="medium">{monsterDescription}</BlackText>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3 justify-items-center w-full max-w-md mt-6 gap-x-20">
          <div className="flex justify-center items-center">
            {observedLevel > 1 && (
              <IconButton
                style="arrowleft"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => alterLevel(-1)}
              />
            )}
          </div>

          <div>
            <ButtonGeneric
              color={unlockedLevels.includes(observedLevel) ? "ronchi" : "alto"}
              size="battle"
              onClick={
                unlockedLevels.includes(observedLevel)
                  ? renderAdventureMonsterSelect
                  : undefined
              }
            >
              {unlockedLevels.includes(observedLevel) ? "EXPLORE" : "LOCKED"}
            </ButtonGeneric>
          </div>

          <div className="flex justify-center items-center">
            {observedLevel < 5 && (
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
    </div>
  );
};

export default LevelSelect;
