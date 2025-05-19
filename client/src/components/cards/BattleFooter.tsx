import React from "react";
import { AttackButton } from "../buttons/AttackButton";
import { AbilityButton } from "../buttons/AbilityButton";
import { DefendButtonTemp } from "../buttons/DefendButtonTemp";
import { GenericFooter } from "./GenericFooter";

interface BattleFooterProp{
    ability1: string;
    ability1Charges: number;
    ability2: string;
    ability2Charges: number;
    defenseCharges: number;
    ability1Image: string;
    ability2Image: string;
    ability1OnClick: () => void;
    ability2OnClick: () => void;
    defenseOnClick: () => void;
    attackOnClick: () => void;
}

export const BattleFooter = ({ability1, ability2, ability1Charges, ability2Charges, defenseCharges, ability1Image, ability2Image, ability1OnClick, ability2OnClick, defenseOnClick, attackOnClick}: BattleFooterProp) => {

    const topButton=
    `
    justify-evenly
    inset-x-0
    flex 
    w-[95%]
    xl:w-[57.5%]
    items-center 
    bottom-[190px]
    xl:bottom-[170px]
    mx-auto
    fixed
    z-40
    `

    return(
        <div>
            <div className={`${topButton}`}>
                <AttackButton onClick={attackOnClick}></AttackButton>
                <DefendButtonTemp initialCount={defenseCharges} label="DEFEND"></DefendButtonTemp>
            </div>
            <GenericFooter>
                
                <br></br><br></br><br></br>
                <div className="flex justify-evenly items-center w-full">
                    <AbilityButton ability={ability1} amountAllowed={ability1Charges} imageName={ability1Image} onClick={ability1OnClick}></AbilityButton>
                    <AbilityButton ability={ability2} amountAllowed={ability2Charges} imageName={ability2Image} onClick={ability2OnClick}></AbilityButton>
                </div>
                
            </GenericFooter>
        </div>
    )
}
