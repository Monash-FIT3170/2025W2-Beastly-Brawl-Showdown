import React from "react";

interface ButtonProps{
    text: string;
    onClick: () => void;
}

export const RedButton = ({text, onClick}: ButtonProps) => {
    return(
    <button 
    className=  "bg-sharpred text-large text-white font-[Jua] w-normalButtonWidth h-normalButtonHeight rounded-[15px] border border-[4px] border-darkpurple"
    onClick={onClick}
    >
  {text}
</button>
)
}