import React, { useState } from "react";
import { ActionIdentifier } from "../../../../types/single/actionState"
import { WikiAbilityCard } from "../../components/wiki/WikiAbilityCard"
import { OutlineTextBP } from "../../components/texts/OutlineTextBP";
import { BaseCard } from "../../components/cards/BaseCard";
import { WikiStatusCard } from "../../components/wiki/WikiStatusCard";

export const WikiStatusPage = () => {
    return (

        <div className="flex flex-col w-full h-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">

            <BaseCard color="peach" width={50} height={8}>
                <OutlineTextBP size="extraLarge">Statuses</OutlineTextBP>
            </BaseCard>

            <WikiStatusCard name="Stun" body="Prevents the affected monster from taking any actions on their next turn."></WikiStatusCard>

            <WikiStatusCard name="Poison" body="Deals 3 damage to the affected monster at the start of their turn for 3 turns."></WikiStatusCard>
        </div>
    );
}