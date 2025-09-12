import React, { ReactNode, useState } from "react";
import { DialogueChoiceButton } from "../buttons/DialogueChoiceButton";
import { option } from "/types/composite/storyTypes";
import { OutlineText } from "../texts/OutlineText";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

export interface ChoicePopupProp {
  question: string;
  choices: option[];
  onClick: (choiceId: string) => void;
}

export const ChoicePopup = ({
  question,
  choices,
  onClick,
}: ChoicePopupProp) => {
  const Layout = `
        items-center
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
        z-50  
        `;

  const Popup = `
        bg-peach
        outline-blackCurrant
        inline-flex
        flex-col
		items-center
		justify-around
		text-merino
        outline-[0.3rem]
        inline-block
        items-center
        font-[Jua]
        rounded-[1rem]
        outline-offset-0
        pt-[3rem]
        pl-[1rem]
        pr-[1rem]
        w-[80%]
        xl:w-[60%]
        pb-[3rem]
        
        `;

  const goNext = (next: string) => {
    FlowRouter.go(next);
  };

  return (
    <div className={`${Layout}`}>
      <div className={`${Popup}`}>
        <div className="w-full flex flex-col items-center justify-center gap-y-6 flex-wrap text-center">
          <OutlineText size="choice-text"> {question} </OutlineText>

          {choices.map((choice, idx) => (
            <DialogueChoiceButton
              key={idx}
              onClick={() => onClick(choice.next)}
            >
              <OutlineText size="medium"> {choice.text} </OutlineText>
            </DialogueChoiceButton>
          ))}
        </div>
      </div>
    </div>
  );
};
