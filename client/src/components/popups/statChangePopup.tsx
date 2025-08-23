import React, { useEffect, useState } from "react";
import { DialogueChoiceButton } from "../buttons/DialogueChoiceButton";
import { option } from "/types/composite/storyTypes";
import { OutlineText } from "../texts/OutlineText";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { IconButton } from "../buttons/IconButton";
import { PopupClean } from "./PopupClean";
import { ButtonGeneric } from "../buttons/ButtonGeneric";

export interface StatChangePopupProps {
  messages: string[];
  onClose: () => void;
  buttonText?: string;
}

export const StatChangePopup = ({
  messages,
  onClose,
  buttonText = "OK",
}: StatChangePopupProps) => {
  const [i, setI] = useState(0);
  const atEnd = messages.length === 0 || i >= messages.length - 1;

  useEffect(() => setI(0), [messages]);

  const nextOrEnd = () => {
    if (messages.length === 0) return onClose();
    if (!atEnd) {
      setI(i + 1);
    } else {
      onClose();
    }
  };

  // const Layout = `
  //       items-center
  //       justify-center
  //       box-border
  //       bg-white/30
  //       fixed
  //       left-0
  //       right-0
  //       bottom-0
  //       top-0
  //       flex
  //       flex-col
  //       backdrop-blur-md
  //       z-50  
  //       `;

  // const Popup = `
  //       bg-[#FFE8B1]
  //       outline-blackCurrant
  //       inline-flex
  //       flex-col
  //       items-center
  //       justify-around
  //       text-merino
  //       outline-[0.3rem]
  //       inline-block
  //       items-center
  //       font-[Jua]
  //       rounded-[1rem]
  //       outline-offset-0
  //       pt-[3rem]
  //       pl-[1rem]
  //       pr-[1rem]
  //       w-[80%]
  //       xl:w-[60%]
  //       pb-[3rem]
        
  //       `;

  return (
    <PopupClean>
        {/* <div className=" flex flex-col items-center justify-center gap-y-6 flex-wrap text-center"> */}
        <div className = "items-center flex-col inline-block inline-flex outline-offset-0 relative gap-y-6">
          {/* <OutlineText size="choice-text">{messages[i] ?? ""}</OutlineText>
          <div className=" flex mt-6  pl-[35rem]">
            <IconButton
              buttonColour="blue"
              style="arrowright"
              iconColour="black"
              size="small"
              onClick={nextOrEnd}
            /> */}
            <OutlineText size="choice-text">{messages[i] ?? ""}</OutlineText>
            <div className="flex mt-4 ">
              <ButtonGeneric color="blue" size="adventure" onClick={nextOrEnd}><OutlineText size="choice-text">NEXT</OutlineText></ButtonGeneric>
            </div>

          </div>
        
    </PopupClean>

    // <div className={Layout}>
    //   <div className={Popup}>
    //     <div className="w-full flex flex-col items-center justify-center gap-y-6 flex-wrap text-center">
          
    //       <OutlineText size="choice-text">{messages[i] ?? ""}</OutlineText>
    //       <div className="mt-6 pb-[3rem] pr-[3rem] relevant">
    //         <IconButton
    //           buttonColour="blue"
    //           style="arrowright"
    //           iconColour="black"
    //           size="small"
    //           onClick={nextOrEnd}
    //         />

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
