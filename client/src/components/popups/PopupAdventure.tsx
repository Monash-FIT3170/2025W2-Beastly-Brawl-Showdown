import React, { ReactNode, useState } from "react";
import { IconButton } from "../buttons/IconButton";

interface PopupAdventureProp {
  colour?: string;
  children?: ReactNode;
}

export const PopupAdventure = ({ colour, children }: PopupAdventureProp) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const colourLoader: Record<string, string> = {
    goldenRod: "bg-goldenRod",
  };
  let bgcolour;
  if (!colour) {
    bgcolour = "bg-[#FFE8B1]";
  } else {
    bgcolour = colourLoader[colour] ?? "bg-[#FFE8B1]";
  }

  const popupLayout = `
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

  const popup = `
        
        ${bgcolour}
        border-[3px]
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
        lg:w-[50%]
        sm:w-[90%]
        lg:h-[90%]
        sm:h-[80%]
        `;

  return (
    <div className={`${popupLayout}`}>
      <div className={`${popup}`}>{children}</div>
    </div>
  );
};
