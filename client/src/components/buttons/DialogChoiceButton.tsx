import React, { ReactNode } from "react";


export interface DialogChoiceButtonProp{
    onClick?: () => void;
    children?: ReactNode;
}

export const DialogChoiceButton = ({children, onClick} : DialogChoiceButtonProp) => {

    const button = 
        `
        bg-pictonBlue
        outline-blackCurrant
        inline-flex
		items-center
		justify-around
		text-merino
        outline-[0.5rem]
        inline-block
        items-center
        font-[Jua]
        rounded-[1rem]
        outline-offset-0
        px-[1rem]
        py-[1rem]
        xl:py-[0.5rem]
        xl:px-[0.5rem]
        pl-[1rem]
        pr-[1rem]
        
        `

    return(
        <button className={`${button}`} onClick={onClick}>
            {children}
        </button>
    )

}