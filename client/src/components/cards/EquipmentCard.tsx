import React from "react";
import { EquipmentState } from "/types/single/itemState";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

interface EquipmentProps {
  equipment: EquipmentState;
  onClick: () => void;
}

export const EquipmentCard = ({ equipment, onClick }: EquipmentProps) => {
  return (
    <button
      onClick={onClick}
      className="
    bg-heliotrope
    border border-[4px] border-blackCurrant
    rounded-2xl
    w-[40rem]
    xl:w-[30rem]
    p-[1rem]
    justify-center
    items-center
    lg:h-[8rem]
    
    "
    >
      <div className="grid grid-cols-[1fr_4fr] gap-4 w-full p-2 justify-center items-center">
        {/* Left column (always square) */}
        <div
          className="lg:h-[5rem] aspect-square bg-goldenRod outline-blackCurrant 
                  lg:outline-[0.25rem] sm:outline-[0.25rem] 
                  rounded-2xl flex justify-center items-center p-2"
        >
          <img
            className="w-full h-full object-contain"
            src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/items/${equipment.imageString}.png`}
          />
        </div>

        {/* Right column (fills the height of the square) */}
        <div
          className="flex flex-col justify-center items-center 
                  rounded-2xl p-2"
        >
          <OutlineText size="inventory">
            {equipment.name.toUpperCase()}
          </OutlineText>
          <BlackText size="tiny">{equipment.statDescription}</BlackText>
        </div>
      </div>
    </button>
  );
};
