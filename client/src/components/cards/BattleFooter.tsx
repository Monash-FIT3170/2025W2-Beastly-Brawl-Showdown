import React from "react";
import { AttackButton } from "../buttons/AttackButton";
import { ActionState } from "/types/single/actionState";
import socket from "../../socket";
import { BaseCard } from "./BaseCard";
import { GenericFooter } from "./GenericFooter";

interface BattleFooterProp{
    possibleActions: ActionState[];
    battleId: string | null;
}

export const BattleFooter = ({possibleActions, battleId}: BattleFooterProp) => {
    const handleActionClick = (action: ActionState) => {
        console.log(`Action selected: ${action}`);
        // You can emit the selected action to the server here if needed
        socket.emit("action_selected", { action, battleId, playerId: socket.id });
    };

    // const topButton=
    // `
    // justify-evenly
    // inset-x-0
    // flex 
    // w-[92%]
    // xl:w-[57.5%]
    // items-center 
    // bottom-[190px]
    // xl:bottom-[170px]
    // mx-auto
    // fixed
    // z-40
    // `
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
        w-1/3
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
        pl-[1%]
        pr-[1%]
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
                    {possibleActions.map((action, _) => (
                        <AttackButton onClick={() => handleActionClick(action)} />
                        //<ActionButton attackState={action} onClick={() => handleActionClick(action)} />
                    ))}
            </div>
        </div>

        //     {/* <GenericFooter>
        //         <br></br><br></br><br></br>
        //         <div className="flex justify-evenly items-center w-full">
        //             <AbilityButton ability={ability1} amountAllowed={ability1Charges} imageName={ability1Image} onClick={ability1OnClick}></AbilityButton>
        //             <AbilityButton ability={ability2} amountAllowed={ability2Charges} imageName={ability2Image} onClick={ability2OnClick}></AbilityButton>
        //         </div>
        //     </GenericFooter> */}
        // </div>
    )
}
