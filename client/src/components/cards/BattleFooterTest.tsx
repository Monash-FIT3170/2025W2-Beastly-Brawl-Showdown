
import ActionButton from "../buttons/ActionButton";
import { ActionState } from "/types/single/actionState";
import socket from "../../socket";
import { BaseCard } from "./BaseCard";
import { GenericFooter } from "./GenericFooter";
import React, { useRef, useState, useLayoutEffect } from 'react';

interface BattleFooterTestProp{
    possibleActions: ActionState[];
    battleId: string | null;
}

export const BattleFooterTest = ({possibleActions, battleId}: BattleFooterTestProp) => {

    const handleActionClick = (action: ActionState) => {
        console.log(`Action selected: ${action}`);

        socket.emit("action_selected", { action, battleId, playerId: socket.id });
    };

    const topButton=
    `
    justify-evenly
    inset-x-0
    flex 
    w-[92%]
    xl:w-[57.5%]
    items-center 
    bottom-[4%]
    xl:bottom-[5%]
    mx-auto
    fixed
    z-40
    `


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
                <div className="flex place-items-center w-full justify-evenly grid grid-cols-2 gap-y-[5rem] xl:gap-y-[4rem] pb-[2%]">
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