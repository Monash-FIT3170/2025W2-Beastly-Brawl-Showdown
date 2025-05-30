
import ActionButton from "../buttons/ActionButton";
import { ActionState } from "/types/single/actionState";
import socket from "../../socket";
import { BaseCard } from "./BaseCard";
import { GenericFooter } from "./GenericFooter";
import React, { useRef, useState, useLayoutEffect } from 'react';

interface BattleFooterProp{
    possibleActions: ActionState[];
    battleId: string | null;
}

export const BattleFooter = ({possibleActions, battleId}: BattleFooterProp) => {

    const handleActionClick = (action: ActionState) => {
        console.log(`Action selected: ${action}`);

        socket.emit("action_selected", { action, battleId, playerId: socket.id });
    };

     const footer = 
    `
    bg-[#FBD474]
    mx-auto
    rounded-tl-[5rem]
    rounded-tr-[5rem]
    border-[4px]
    border-blackCurrant
    border-b-0
    flex 
    inset-x-0
    fixed
    w-[95%]
    xl:w-[60%]
    bottom-0
    z-[40]
    `;

    const button=
    `
    flex 
    place-items-center 
    w-full 
    justify-evenly 
    grid 
    grid-cols-2 
    gap-y-[5rem] 
    xl:gap-y-[4rem] 
    pb-[2%]
    
    `
    
    // Get the height of the 4 buttons and make footer the 83% of that height
    const gridRef = useRef<HTMLDivElement>(null);
    const [footerH, setFooterH] = useState(0);
    useLayoutEffect(() => {
        if (!gridRef.current) return;

        const h = gridRef.current.getBoundingClientRect().height;

        setFooterH(h * 0.83);
    }, [possibleActions]);

    return (
        
        <div className="fixed flex mx-auto flex-col inset-x-0 bottom-0 w-[95%] xl:w-[60%] justify-center">
            <div ref={gridRef}>
                <div className={button}>
                    {possibleActions.map((action, i) => (
                    <div className="z-[50]"><ActionButton key={i} actionState={action} battleId={battleId!} /></div>
                    ))}
                </div>
            </div>
            <div style={{ height: `${footerH}px` }} className={footer}>
            </div>
        </div>
    );
    };