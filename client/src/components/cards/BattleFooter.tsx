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
    return(
        <GenericFooter>
            <div className="space-y-[5%]">
                <div className="flex space-x-4">
                    <AttackButton onClick={attackOnClick}></AttackButton>
                    <DefendButtonTemp initialCount={defenseCharges} label="Defend"></DefendButtonTemp>
                </div>
                <div className="flex space-x-4">
                    <AbilityButton ability={ability1} amountAllowed={ability1Charges} imageName={ability1Image} onClick={ability1OnClick}></AbilityButton>
                    <AbilityButton ability={ability2} amountAllowed={ability2Charges} imageName={ability2Image} onClick={ability2OnClick}></AbilityButton>
                </div>
            </div>
        </GenericFooter>
    )
}
