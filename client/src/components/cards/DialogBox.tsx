import { OutlineText } from "../texts/OutlineText";
import React, { ReactNode } from "react";
import { MonsterState } from "/types/single/monsterState";
import { IconButton } from "../buttons/IconButton";

export interface DialogueBoxProp{
    children?: ReactNode;
    onClick?: () => void;
    monster: MonsterState;
    // monster: ReactNode;
}

export const DialogueBox = ({children, onClick, monster} : DialogueBoxProp) => {


    const dialogBox = 
        `
        bg-peach
        w-[95%]
        xl:w-[60%]
        rounded-tl-[5rem]
        rounded-tr-[5rem]
        border-[10px]
        mx-auto
        border-blackCurrant
        border-b-0
        bottom-0
        flex 
        place-items-center 
        justify-center
        pl-[3%]
        pr-[3%]
        xl:pt-[2%]
        pt-[4%]
        pb-10
        fixed
        xl:h-[35%]
        h-[30%]
        `

    const monsterName = 
        `
        bg-ronchi
        rounded-tl-[2rem]
        rounded-tr-[2rem]
        border-[10px]
        border-blackCurrant
        border-b-0
        place-items-center 
        px-[1rem]
        pb-[73rem]
        xl:pb-[35rem]
        xl:px-[0.5rem]
        pl-[1rem]
        pr-[1rem]
        font-[Jua]
        outline-offset-0
        `

        return(
        <div className="fixed inset-x-0 bottom-0 flex justify-center ">
            <div className="relative w-[95%] xl:w-[60%]">
                <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 ">
                    <div className={`${monsterName}`}>
                        <OutlineText size="medium">
                            {monster.name}
                        </OutlineText>
                    </div>
                </div>
                <div className={`${dialogBox}`}>
                    {children}
                </div>
                <div className=" absolute bottom-[3rem] xl:bottom-[2rem] pl-[52rem] xl:pl-[52rem]">
                    <IconButton buttonColour="blue" style="arrowright" iconColour="black" size="small" onClick={onClick}></IconButton>
                </div>
            </div>
        </div>
        );

}