import React from "react";

interface HeaderProps{
    text: string;
}

export const PurpleHeaderCard = ({text}: HeaderProps) => {
    return(
    <div className=  "bg-brightpurple text-large text-white font-[Jua] w-fit h-normalPhoneHeight rounded-[15px] border border-[4px] border-darkpurple border-t-0">
        {text}
    </div>
    );
}