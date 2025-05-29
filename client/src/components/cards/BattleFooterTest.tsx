
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
        // You can emit the selected action to the server here if needed
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

    // const footer = 
    // `
    // bg-[#FBD474]
    // mx-auto
    // font-[Jua]
    // w-[95%]
    // xl:w-[60%]
    // h-[19%]
    // xl:h-[25%]
    // rounded-tl-[5rem]
    // rounded-tr-[5rem]
    // border-[4px]
    // border-blackCurrant
    // border-b-0
    // flex 
    // flex-col 
    // items-center 
    // justify-center
    // text-wrap
    // pl-[1%]
    // pr-[1%]
    // xl:pt-[2%]
    // pt-[4%]
    // pb-10
    // inset-x-0
    // fixed
    // bottom-0
    // z-30
    // `;
    // return(
    //     <div>
    //         <div className={`${topButton}`}>
    //             <AttackButton onClick={attackOnClick}></AttackButton>
    //             <DefendButton initialCount={defenseCharges} onClick = {defendOnClick}></DefendButton>
    //         </div>
    //         <GenericFooter>
                
    //             <br></br><br></br><br></br>
    //             <div className="flex justify-evenly items-center w-full">
    //                 <AbilityButton ability={ability1} amountAllowed={ability1Charges} imageName={ability1Image} onClick={ability1OnClick}></AbilityButton>
    //                 <AbilityButton ability={ability2} amountAllowed={ability2Charges} imageName={ability2Image} onClick={ability2OnClick}></AbilityButton>
    //             </div>
                
    //         </GenericFooter>
    //     </div>
    // )
    // return(
    //     <div className={`${topButton}`}>
    //         <GenericFooter>
    //             {/* <div className="flex flex-wrap justify-evenly gap-4 w-full"> */}
    //             <div className="grid grid-cols-2  gap-y-[4rem] w-full place-items-center justify-evenly">
                
    //                     {possibleActions.map((action, _) => (
                              
    //                             <ActionButton actionState={action} battleId={battleId!} />
                            
    //                     ))}
    //             </div>
    //         </GenericFooter>
    //     </div>
    // )
    // return(
    //     <div className="relative w-full">
    //         <div className={`${topButton}`}>
    //             <div className="grid grid-cols-2  gap-y-[5rem] xl:gap-y-[2rem] w-full place-items-center justify-evenly">
                
    //                     {possibleActions.map((action, _) => (
                            
    //                             <ActionButton actionState={action} battleId={battleId!} />
                            
    //                     ))}
    //             </div> 
    //         </div>
    //         <div className={`${footer}`}>
    //             <br></br>
    //         </div>
    //     </div>
    // )
//     
    const gridRef = useRef<HTMLDivElement>(null);
    const [footerH, setFooterH] = useState(0);
    useLayoutEffect(() => {
        if (!gridRef.current) return;
        // measure the grid’s height
        const h = gridRef.current.getBoundingClientRect().height;
        // set footer to 75% of that
        setFooterH(h * 0.83);
    }, [possibleActions]);

    return (
        // <div className=" h-full fixed flex flex-col relative w-[95%] xl:w-[60%] items-center  mx-auto inset-x-0">
        <div className="fixed flex mx-auto flex-col inset-x-0 bottom-0 w-[95%] xl:w-[60%] justify-center">
            <div ref={gridRef}>
                <div className="flex place-items-center w-full justify-evenly grid grid-cols-2 gap-y-[5rem] xl:gap-y-[4rem] pb-[2%]">
                    {possibleActions.map((action, i) => (
                    <div className="z-[50]"><ActionButton key={i} actionState={action} battleId={battleId!} /></div>
                    ))}
                </div>
            </div>
            <div style={{ height: `${footerH}px` }} className={footer /* your existing footer classes */}>
            </div>
        </div>
    );
    };