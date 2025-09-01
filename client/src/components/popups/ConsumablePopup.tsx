import React, { ReactNode, useState } from "react";
import { ConsumableState } from "/types/single/itemState";
import { PopupAdventure } from "./PopupAdventure";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

export interface ConsumableProp {
  consumable: ConsumableState;
  onClose: () => void;
  onConsume: () => void;
  isDisabled: boolean;
}

export const ConsumablePopup = ({
  consumable,
  onClose,
  onConsume,
  isDisabled,
}: ConsumableProp) => {
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

  const consume = () => {
    console.log("CONSUME CLICKED");
    onClose();
    onConsume();
  };

  //TODO: centre the rest of this poop
  //TODO: can't click
  return (
    <>
      <div className={`${popupLayout}`}>
        <div className={`${popup}`}>
          <div
            className=" flex-row items-center flex-col outline-offset-0 relative gap-2 w-[100%] h-full
          bg-blue-200  justify-center xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem]  pointer-events-auto"
          >
            {/* Name */}
            <OutlineText size="large">
              {consumable.name.toUpperCase()}
            </OutlineText>
            {/* Image */}
            <div className="bg-green-200 justify-center items-center">
              <div
                className="h-[10rem] lg:outline-[0.25rem] sm:outline-[0.75rem] 
                  rounded-2xl  bg-[#FB7EAB] outline-blackCurrant aspect-square mx-auto"
              >
                <img
                  className="w-full h-full object-contain"
                  src={`/assets/items/${consumable.imageString}.png`}
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-purple-200">
              <BlackText size="medium">{consumable.description}</BlackText>
              <div className="w-[90%] bg-[#EDAF55] outline-blackCurrant outline-[0.25rem] rounded-full flex flex-col items-center justify-center">
                <OutlineText size="medium">
                  {consumable.statDescription}
                </OutlineText>
              </div>
              <BlackText size="medium">
                Are you sure you want to consume this?
              </BlackText>
            </div>

            {/* Buttons */}
            <div className="bg-yellow-200 justify-center items-center flex lg:gap-5 sm:gap-10">
              <ButtonGeneric color="red" size="battle" onClick={onClose}>
                <div className="items-center">
                  <OutlineText size="choice-text">BACK</OutlineText>
                </div>
              </ButtonGeneric>
              <ButtonGeneric
                color="blue"
                size="battle"
                isDisabled={isDisabled}
                onClick={consume}
              >
                <div className="items-center">
                  <OutlineText size="choice-text">CONSUME</OutlineText>
                </div>
              </ButtonGeneric>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
