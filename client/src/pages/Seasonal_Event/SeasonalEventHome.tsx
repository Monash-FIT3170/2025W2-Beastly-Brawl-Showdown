import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { IconButton } from "../../components/buttons/IconButton";
import { MonsterIdentifier } from "../../../../types/single/monsterState";
import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";
import { motion, AnimatePresence } from "framer-motion";
import { BaseCard } from "../../components/cards/BaseCard";
import { eventMeta } from "../../data/eventMeta";
import { monsterMeta } from "../../data/monsterMeta";

interface SeasonalEventHomeProps {}

const SeasonalEventHome: React.FC<SeasonalEventHomeProps> = () => {
const [observedEvent, setObservedEvent] = useState<number>(10);

  // Seasonal Event → Monster mapping
  const eventMap: Record<number, SeasonalEventIdentifier> = {
    10: SeasonalEventIdentifier.SPOOK_GARDEN
  };
  const monsterMap: Record<number, MonsterIdentifier> = {
    10: MonsterIdentifier.JACKEDOLANTERN
  };

  // Resolve event and monster data
  const event = eventMap[observedEvent] ?? SeasonalEventIdentifier.SPOOK_GARDEN;
  const monster = monsterMap[observedEvent] ?? MonsterIdentifier.JACKEDOLANTERN;

  const { name: eventName, description: eventDescription } =
    eventMeta[event];

  const { name: monsterName, description: monsterDescription } =
    monsterMeta[monster];


  // Monster image (coloured or silhouette if locked)
  const monsterImage = `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/${monster}.png`

  // Background image
  const backgroundString = `url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/${getBiomeString(
    monster
  )}.jpg')`;

  return (
    <div className="relative flex flex-col items-center justify-center h-[100dvh] w-full px-4 overflow-hidden">
      {/* AnimatePresence handles background transitions */}
      <AnimatePresence>
        <motion.div
          key={observedEvent} // ensures re-render on level change
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: backgroundString,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {/* Foreground content (your existing code) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Fixed top header */}
        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3">
          {/* Back arrow button */}
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/")}
          />

          {/* “CLASSIC” header */}
          <BaseCard color="peach" width={40} height={8}>
            <OutlineText size="extraLarge">CLASSIC</OutlineText>
          </BaseCard>

          <div className="w-[3rem]" />
        </div>

        {/* Content (centered vertically) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full max-w-6xl">
          <img
            src={monsterImage}
            className="
              w-[22rem] h-[22rem] sm:w-[24rem] sm:h-[24rem] lg:w-[20rem] lg:h-[20rem]
              drop-shadow-[0_0_4px_white] drop-shadow-[0_0_8px_white]
            "
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />

          <div className="border-4 border-blackCurrant rounded-2xl bg-white/70 p-8 w-[70%] sm:w-[90%] lg:w-[90%] max-w-2xl text-center">
            <OutlineText size="large">{eventName}</OutlineText>
            <BlackText size="medium">{eventDescription}</BlackText>
            <OutlineText size="large">{monsterName}</OutlineText>
            <BlackText size="medium">{monsterDescription}</BlackText>
          </div>
        </div>
      </div>
    </div>
  );
};

const biomeMap = new Map([
  [MonsterIdentifier.JACKEDOLANTERN, () => "MARSH"]
]);

export function getBiomeString(monsterID: MonsterIdentifier) {
  //default return is forest :)
  const biomeName = biomeMap.get(monsterID);
  return biomeName ? biomeName() : "FOREST";
}

export default SeasonalEventHome;