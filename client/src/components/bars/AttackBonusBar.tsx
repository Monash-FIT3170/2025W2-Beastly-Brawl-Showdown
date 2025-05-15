import React from "react";
import { Bar } from "./Bar";

interface AttackBonusBarProps {
    attackBonus: number;
    highestAttackBonus: number;
}

export const AttackBonusBar = ({attackBonus, highestAttackBonus}: AttackBonusBarProps) => {
    return (
        <Bar colour="plainyellow" text={"+" + String(attackBonus)} textPosition="right" radius="lg" fillPercentage={Math.floor(attackBonus / highestAttackBonus * 100)} />
    );
}
