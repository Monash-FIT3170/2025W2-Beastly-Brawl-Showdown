import React, { ReactNode } from "react";
import { OutlineText } from "../texts/OutlineText";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";

export interface ButtonResizableTextProps{
    color: 'ronchi' | 'blue' | 'red' | 'purple';
    max1:number;
    max2:number;
    // isDisabled?: boolean;
    children: string
    onClick?: () => void;
    // mobileHidden?: 'false' | 'true' 
    buttonSize: ButtonSize;
}

export const ButtonResizableText = ({color,max1, max2, buttonSize,children,onClick}: ButtonResizableTextProps) => {
    
    // let textSize = 'large';
    // if (children.length > max1) {
    //     textSize = "medium";
    // } else if (children.length > max2) {
    //     textSize = "tiny";
    // }
    const isDisabled = false
    const mobileHidden = 'false'

    const colorToDisplay = {
        'ronchi': 'bg-ronchi',
        'blue': 'bg-pictonBlue',
        'red': 'bg-burntSienna',
        'purple': 'bg-heliotrope'
        }

    const sizeToDisplay = {
        'battle': 'w-[20rem] h-[7rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem] xl:w-[12rem] xl:h-[4.75rem]',
        'large': 'lg:w-[16rem] sm:w-[40rem] lg:h-[4.75rem] sm:h-[15rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
        'medium': 'lg:w-[12rem] sm:w-[25rem] lg:h-[3.75rem] sm:h-[10rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
        'tiny': 'lg:w-[8.125rem] lg:h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
        'square': 'w-[2rem] h-[2rem]',
        'squaremedium': 'lg:w-[4rem] lg:h-[4rem] sm:w-[8rem] sm:h-[8rem]',
    }

    const mobile = {
        'true': 'sm:hidden lg:block',
        'false': 'block',
    }

    const baseButton =
        `
        ${colorToDisplay[color]}
        ${mobile[mobileHidden]}
        flex
        items-center
        justify-around
        text-merino
        outline-blackCurrant
        sm:outline-[0.75rem]
        lg:outline-[0.25rem]
        outline-offset-0
        font-[Jua]
        font-medium
        lg:rounded-[0.5rem]
        sm:rounded-[2rem]
        `;

    const enabledButton = 
        `
        hover:brightness-85
        active:outline-blackCurrant
        active:ring-[0.3125rem]
        active:ring-blackCurrant
        `;

    const disabledButton = 
        `
        grayscale
        cursor-not-allowed 
        `;

    return(
        <button
        
        className={`
            ${baseButton} 
            ${isDisabled ? disabledButton : enabledButton}
            ${sizeToDisplay[buttonSize]}
        `}
        onClick={onClick}> 
            <OutlineTextResizable size='extraLarge' max1={max1} max2={max2}>{children}</OutlineTextResizable>
        </button>
    );
};