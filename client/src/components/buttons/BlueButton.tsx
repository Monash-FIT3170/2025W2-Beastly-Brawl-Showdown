import React from "react";

interface ButtonProps{
    text: string;
    onClick: () => void;
}

export const BlueButton = ({text, onClick}: ButtonProps) => {
    return(
    <button 
    className=  "bg-customblue text-[50px] text-white font-[Jua] font-outline-1 py-5 px-10 rounded-[15px] border border-[4px] border-darkpurple"
    onClick={onClick}
    >
  {text}
</button>
)
}