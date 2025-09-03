import React, { ReactNode, useState } from "react";
import { IconButton } from "../buttons/IconButton";

interface PopupProp {
  colour?: string;
  children?: ReactNode;
}

export const PopupClean = ({ colour, children }: PopupProp) => {
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
        z-100
        `;

  const popup = `
        top-[20%]
        py-[1rem]
        px-[1rem]
        ${bgcolour}
        border-[3px]
        border-[#403245]
        rounded-[20px]
        text-center
        xl:w-[60%]
        w-[80%]
        items-stretch
        box-border 
        flex
        flex-col
        break-words
        z-100  
        `;

  const popupText = `
        py-[5rem]
        px-[3rem]
      `;

  return (
    <div className={`${popupLayout}`}>
      <div className={`${popup}`}>
        <div className={`${popupText}`}>{children}</div>
      </div>
    </div>
  );
};
