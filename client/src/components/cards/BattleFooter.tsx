import React, { useState } from "react";
import ActionButton from "../buttons/ActionButton";
import { ActionState } from "/types/single/actionState";

interface BattleFooterProp{
    possibleActions: ActionState[];
    battleId: string | null;
}

export const BattleFooter = ({possibleActions, battleId}: BattleFooterProp) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const topButton=`
        flex
        items-center
        justify-center
        grid
        grid-cols-2
        gap-x-8
        gap-y-15
        xl:bottom-[90px]
        pl-[1.4%]
        fixed
        z-40
    `

    const footer = 
        `
        bg-[#FBD474]
        mx-auto
        font-[Jua]
        w-115
        h-30
        rounded-tl-[1rem]
        rounded-tr-[1rem]
        border-[4px]
        border-blackCurrant
        border-b-0
        flex 
        flex-col
        items-center
        justify-center
        text-wrap
        pr-[1.5%]
        pb-[10%]
        pt-4
        pb-10
        inset-x-0
        fixed
        bottom-12
        z-10
        `;

    return(
        <div className={`${footer}`}>
            <div className={`${topButton}`}>
                {possibleActions.map((action, index) => (
                    <ActionButton actionState={action} battleId={battleId!} isActive={activeIndex === index} onClick={() => setActiveIndex(index)} />
                ))}
            </div>
        </div>
    )
}