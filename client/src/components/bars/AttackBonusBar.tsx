import React from "react";
import { GenericBar } from "./GenericBar";
import { OutlineText } from "../texts/OutlineText";

interface AttackBonusBarProps {
    attackBonus: number;
    highestAttackBonus: number;
}

export const AttackBonusBar = ({attackBonus, highestAttackBonus}: AttackBonusBarProps) => {
    return (
        <GenericBar colour="yellow" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(attackBonus / highestAttackBonus * 100) as BarFillPercentage}>
            <OutlineText size="tiny">
                {`+${attackBonus}`}
            </OutlineText>
        </GenericBar>
    );
};
