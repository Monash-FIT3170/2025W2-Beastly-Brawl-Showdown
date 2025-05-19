import React from "react";

interface FooterProps{
    children: React.ReactNode;
}

export const GenericFooter = ({children }: FooterProps) => {
    const footer = 
        `
        bg-[#FBD474]
        mx-auto
        font-[Jua]
        w-[95%]
        xl:w-[60%]
        h-normalPhoneHeight
        rounded-tl-xl
        rounded-tr-xl
        border-[4px]
        border-darkpurple
        border-b-0
        space-x-0
        flex 
        flex-col 
        items-center 
        justify-center
        text-wrap
        pl-[1%]
        pr-[1%]
        pt-4
        pb-4
        inset-x-0
        fixed
        bottom-0
        `;

    return(
        <div className={`${footer}`}>
            {children}
        </div>
    );
    
}
