import React from "react";

interface HeaderProps{
    text: string;
}

export const PurpleHeaderCard = ({text}: HeaderProps) => {
    return(
    <div className="mx-auto bg-brightpurple text-large text-white font-[Jua] w-fit h-normalPhoneHeight rounded-bl-xl rounded-br-xl border-[4px] border-darkpurple border-t-0 text-center text-wrap pl-[1%] pr-[1%]">
        {text}
    </div>
    );
}
