import React, { ReactNode, useState } from "react";
import { StoryItemState } from "/types/single/itemState";
import { PopupAdventure } from "./PopupAdventure";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";
import { on } from "events";

export interface StoryItemProp {
  storyItem: StoryItemState;
  onClose: () => void;
  onTake?: () => void;
  backText?: string;
  takeText?: string;
}

export const StoryItemPopup = ({
  storyItem,
  onClose,
  onTake,
  backText = "BACK",
  takeText = "TAKE",
}: StoryItemProp) => {
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
        bg-peach
        border-blackCurrant
        rounded-[20px]
        flex
        flex-col
        text-center
        items-center
        justify-center
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

  //TODO: centre the rest of this poop
  //TODO: can't click
  return (
    <>
      <div className={`${popupLayout}`}>
        <div className={`${popup}`}>
          <div
            className="flex flex-col items-center justify-center gap-2 
             outline-offset-0 xl:pt-[2rem] xl:px-[2rem] pt-[3rem] pointer-events-auto"
          >
            {/* Name */}
            <OutlineText size="large">
              {storyItem.name.toUpperCase()}
            </OutlineText>
            {/* Image */}
            <div className="justify-center items-center p-[1rem]">
              <div
                className="lg:h-[10rem] sm:h-[30rem] lg:outline-[0.25rem] sm:outline-[0.75rem] 
                        rounded-2xl  bg-storycolour outline-blackCurrant aspect-square mx-auto"
              >
                <img
                  className="w-full h-full object-contain"
                  src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/items/${storyItem.imageString}.png`}
                />
              </div>
            </div>

            {/* Description */}
            <div className="justify-center flex flex-col items-center p-[1rem] gap-5 ">
              <BlackText size="medium">{storyItem.description}</BlackText>
              <div className="w-[90%] bg-ronchi outline-blackCurrant outline-[0.25rem] rounded-full items-center justify-center">
                <OutlineText size="medium">
                  {storyItem.hintDescription}
                </OutlineText>
              </div>
            </div>

            {/* Buttons */}
            <div className="justify-center items-center flex lg:gap-5 sm:gap-10">
              <ButtonGeneric color="red" size="battle" onClick={onClose}>
                <div className="items-center">
                  <OutlineText size="choice-text">{backText}</OutlineText>
                </div>
              </ButtonGeneric>
              {onTake && (
                <ButtonGeneric color="blue" size="battle" onClick={onTake}>
                  <div className="items-center">
                    <OutlineText size="choice-text">{takeText}</OutlineText>
                  </div>
                </ButtonGeneric>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
