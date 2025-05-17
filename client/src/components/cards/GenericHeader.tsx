import React, { ReactElement } from "react";

interface HeaderProps{
    text: string;
    color: 'blue' | 'purple' | 'lightYellow' | 'green' | 'red';
}

export const GenericHeader = ({text, color}: HeaderProps) => {

    const colorToDisplay = {
        'blue': 'bg-[#55A9ED]',
        'purple': 'bg-[#BD55ED]',
        'lightYellow': 'bg-[#FFE8B1]',
        'green': 'bg-[#7EED55]',
        'red': 'bg-[#ED5A55]'
    };

    const header = 
        `
        ${colorToDisplay[color]}
        mx-auto
        text-large
        text-white
        font-[Jua]
        w-[60%]
        h-normalPhoneHeight
        rounded-bl-xl
        rounded-br-xl
        border-[4px]
        border-darkpurple
        border-t-0
        text-center
        text-wrap
        pl-[1%]
        pr-[1%]
        inset-x-0
        fixed
        top-0
        `;

    return(
    <div className={`${header}`}>
        {text}
    </div>
    );
}
