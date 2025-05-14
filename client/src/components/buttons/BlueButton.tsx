import React from "react";

interface ButtonProps{
    text: string;
    onClick: () => void;
}

export const BlueButton = ({text, onClick}: ButtonProps) => {
    return(
    <button 
    className=  "bg-customblue text-large text-white font-[Jua] h-normalButtonHeight w-normalButtonWidth rounded-[15px] border border-[4px] border-darkpurple"
    onClick={onClick}
    >
  {text}
</button>
)
}