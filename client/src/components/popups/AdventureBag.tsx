import React, { ReactNode, useState } from "react";
import socket from "../../socket";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { PlayerState } from "/types/single/playerState";
import { IconButton } from "../buttons/IconButton";
import { PopupAdventure } from "./PopupAdventure";
import { EquipmentCard } from "../cards/EquipmentCard";
import { EmptyEquipmentCard } from "../cards/EmptyEquipmentCard";
import { BlackText } from "../texts/BlackText";
import { ConsumableCard } from "../cards/ConsumableCard";
import { ConsumablePopup } from "./ConsumablePopup";
import { ConsumableState, EquipmentState } from "/types/single/itemState";
import { EquipmentPopup } from "./EquipmentPopup";
import { ActionIdentifier } from "../../../../types/single/actionState";

export interface AdventureBagProp {
  playerState: PlayerState | null | undefined;
  onClose: () => void;
  inBattle: boolean;
}

export const AdventureBagPopup = ({
  playerState,
  onClose,
  inBattle,
}: AdventureBagProp) => {
  const [viewingTab, setViewingTab] = useState<number>(0);
  const currentlyViewing = ["CONSUMABLES", "EQUIPMENT"];
  const [viewingConsumable, setViewingConsumable] = useState<Boolean>(false);
  const [viewingEquipment, setViewingEquipment] = useState<Boolean>(false);
  const [consumable, setConsumable] = useState<ConsumableState | null>(null);
  const [equipment, setEquipment] = useState<EquipmentState | null>(null);

  const monsterImgPath =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    playerState?.monster?.id +
    ".png";

  console.log(playerState);

  console.log("consumables", playerState?.consumables);
  console.log("equipment", playerState?.equipment);

  const handleCancelSelection = () => {
    setConsumable(null);
    setEquipment(null);
  };

  function handleConsumption(consumable: ConsumableState) {
    socket.emit("adventure_consume", {
      consumable: consumable,
      playerId: socket.id,
    });
    //TODO: INITIATE NEXT TURN...?
    const actionState = {
      name: ActionIdentifier.CONSUME,
    };
    socket.emit("adventure_action", {
      action: actionState,
      playerId: socket.id,
    });
    onClose();
  }

  return (
    <>
      {equipment && (
        <EquipmentPopup
          equipment={equipment}
          onClose={() => handleCancelSelection()}
        ></EquipmentPopup>
      )}
      {consumable && (
        <ConsumablePopup
          consumable={consumable}
          onClose={() => handleCancelSelection()}
          onConsume={() => handleConsumption(consumable)}
          isDisabled={!inBattle}
        ></ConsumablePopup>
      )}
      <PopupAdventure colour="goldenRod">
        <div className=" flex items-center flex-col outline-offset-0 relative gap-2 w-[100%] h-full">
          <OutlineText size="choice-text">BACKPACK</OutlineText>
          {/* SECTION */}
          <div
            className={`flex  
            border-[4px] 
            border-blackCurrant rounded-xl
            grow
            sm:min-h-[20vh]
            sm:w-[90%]
            lg:min-h-[20vh]
            lg:w-[90%]
            border-[3px]
            box-border
            bg-peach
            flex-col
            items-center py-2
            p-[2rem]
            space-y-4
            overflow-y-auto
            overflow-x-hidden 
            min-w-0
            `}
          >
            {/* SECTION HEADING */}
            <div className="w-[90%] bg-ronchi outline-blackCurrant outline-[0.25rem] rounded-full flex flex-col items-center justify-center">
              <OutlineText size="medium">
                {currentlyViewing[viewingTab]}
              </OutlineText>
            </div>

            {/* EQUIPMENT CONTENTS */}
            {viewingTab !== 0 && (
              <>
                <div className="w-full px-[3rem] p-[1rem] flex flex-col items-center gap-6">
                  {/* <div className="grid grid-flow-row h-full w-full auto-rows-auto"> */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-full max-w-[40rem] mx-auto min-w-0 mx-auto">
                      <div className="flex flex-col items-center">
                      <OutlineText size="medium">Slot {i + 1}</OutlineText>
                      </div>
                      {/* <div className="h-[2px] bg-blackCurrant mb-4 w-[70rem] mx-auto px-[10rem] justify-center items-center" /> */}
                      <div className="h-[2px] bg-blackCurrant my-4 w-full" />
                      {/* <div className="mx-auto"> */}
                      {playerState?.equipment[i] ? (
                        <EquipmentCard
                          onClick={() => setEquipment(playerState.equipment[i])}
                          equipment={playerState.equipment[i]}
                        />
                      ) : (
                        <EmptyEquipmentCard />
                      )}
                      {/* </div> */}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CONSUMABLES CONTENTS */}
            {viewingTab !== 1 && (
              <>
                {/* if no consumables */}
                {playerState?.consumables[0] ? (
                  <></>
                ) : (
                  <BlackText size="tiny">
                    Continue adventuring to find consumables!!
                  </BlackText>
                )}
                {/* map of consumables */}
                <div className="w-full p-[1rem] flex flex-wrap gap-4 justify-center">
                  {playerState?.consumables.map((c) => (
                    <>
                      <ConsumableCard
                        onClick={() => setConsumable(c)}
                        consumable={c}
                      ></ConsumableCard>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 justify-items-center p-[1rem]">
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
                <OutlineText size="choice-text">BACK</OutlineText>
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
    </>
  );
};
