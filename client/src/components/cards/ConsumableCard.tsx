import React from "react";
import { ConsumableState } from "/types/single/itemState";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

interface ConsumableProps {
  consumable: ConsumableState;
  onClick: () => void;
}

export const ConsumableCard = ({ consumable, onClick }: ConsumableProps) => {
  const imageName = "item"; //TO-DO: set up
  return (
    <button
      onClick={onClick}
      className="
    bg-[#FB7EAB]
    border border-[4px] border-blackCurrant
    rounded-2xl
    w-[40rem]
    p-[1rem]
    justify-center
    items-center
    lg:h-[8rem]
    "
    >
      <div className="grid grid-cols-[1fr_4fr] gap-4 w-full p-2 justify-center items-center">
        {/* Left column (always square) */}
        <div
          className="lg:h-[5rem] aspect-square bg-[#FBD474] outline-blackCurrant 
                  lg:outline-[0.25rem] sm:outline-[0.25rem] 
                  rounded-2xl flex justify-center items-center p-2"
        >
          <img
            className="w-full h-full object-contain"
            src={`/assets/items/${imageName}.png`}
          />
        </div>

        {/* Right column */}
        <div
          className="flex flex-col justify-center items-center 
                  rounded-2xl p-2 h-full"
        >
          <OutlineText size="inventory">
            {consumable.name.toUpperCase()}
          </OutlineText>
          <BlackText size="tiny">{consumable.statDescription}</BlackText>
        </div>
      </div>
    </button>
  );
};
