import React, { ReactNode, useState } from "react";
import { ConsumableState } from "/types/single/itemState";
import { PopupAdventure } from "./PopupAdventure";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

export interface ConsumableProp {
  consumable: ConsumableState;
  onClose?: () => void;
}

export const ConsumablePopup = ({ consumable, onClose }: ConsumableProp) => {
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

  //TODO: make confirm actually consume it :o
  //TODO: format
  return (
    <>
      <div className={`${popupLayout}`}>
        <div className={`${popup}`}>
          <OutlineText size="large">
            {consumable.name.toUpperCase()}
          </OutlineText>
          <div
            className="h-[4rem] aspect-square bg-[#FB7EAB] outline-blackCurrant 
                  lg:outline-[0.25rem] sm:outline-[0.75rem] 
                  rounded-2xl flex justify-center items-center p-2"
          >
            <img
              className="w-full h-full object-contain"
              src={`/assets/items/item.png`}
            />
          </div>
          <BlackText size="medium">
            Here is a lengthy description about this beautiful consumable, damn
            you wanna consume it soo bad don't you, ooh i know you want to.
          </BlackText>
          <BlackText size="medium">
            Are you sure you want to consume this?
          </BlackText>

          <div className="w-min">
            <ButtonGeneric color="blue" size="battle">
              <OutlineText size="choice-text">Consume</OutlineText>
            </ButtonGeneric>
            <ButtonGeneric color="red" size="battle" onClick={onClose}>
              <OutlineText size="choice-text">Back</OutlineText>
            </ButtonGeneric>
          </div>
        </div>
      </div>
    </>
  );
};
