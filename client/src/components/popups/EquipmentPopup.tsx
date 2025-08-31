import React, { ReactNode, useState } from "react";
import { EquipmentState } from "/types/single/itemState";
import { PopupAdventure } from "./PopupAdventure";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

export interface EquipmentProp {
  equipment: EquipmentState;
  onClose?: () => void;
}

export const EquipmentPopup = ({ equipment, onClose }: EquipmentProp) => {
  const popupLayout = `z-100  items-center
        justify-center
        box-border
        bg-white/30
        fixed
        left-0
        right-0
        bottom-0
        top-0
        flex
        flex-col
        backdrop-blur-md
          `;
  const popup = `border-[3px]
          bg-[#FBD474]
        border-[#403245]
        rounded-[20px]
        flex
        flex-col
        text-center
        items-stretch
        box-border 
        break-words
        z-50  
        top-[20%]
        py-[1rem]
        px-[1rem]
        lg:w-[45%]
        sm:w-[85%]
        lg:h-[85%]
        sm:h-[75%]`;

  return (
    <>
      <div className={`${popupLayout}`}>
        <div className={`${popup}`}>
          <OutlineText size="large">{equipment.name.toUpperCase()}</OutlineText>
          <div
            className="h-[4rem] aspect-square bg-[#BD55ED] outline-blackCurrant 
                      lg:outline-[0.25rem] sm:outline-[0.75rem] 
                      rounded-2xl flex justify-center items-center p-2"
          >
            <img
              className="w-full h-full object-contain"
              src={`/assets/items/item.png`}
            />
          </div>
          <BlackText size="medium">{equipment.description}</BlackText>
          <div className="w-[90%] bg-[#EDAF55] outline-blackCurrant outline-[0.25rem] rounded-full flex flex-col items-center justify-center">
            <OutlineText size="medium">{equipment.statDescription}</OutlineText>
          </div>
          <div className="w-min">
            <ButtonGeneric color="red" size="battle" onClick={onClose}>
              <OutlineText size="choice-text">Back</OutlineText>
            </ButtonGeneric>
          </div>
        </div>
      </div>
    </>
  );
};
