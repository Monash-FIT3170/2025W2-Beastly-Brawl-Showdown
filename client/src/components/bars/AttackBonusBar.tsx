import React from "react";
import { Bar } from "./Bar";
import { OutlineText } from "../texts/OutlineText";

interface AttackBonusBarProps {
    attackBonus: number;
    highestAttackBonus: number;
}

export const AttackBonusBar = ({attackBonus, highestAttackBonus}: AttackBonusBarProps) => {
    return (
        <Bar colour="yellow" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(attackBonus / highestAttackBonus * 100) as BarFillPercentage}>
            <OutlineText text={`+${attackBonus}`} size="medium" />
        </Bar>
    );
};
