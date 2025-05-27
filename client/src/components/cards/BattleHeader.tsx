import React from "react";
import { GenericHeader } from "./GenericHeader";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";
import { BattleState } from "/types/composite/battleState";

interface BattleHeaderProps {
    battleState: BattleState;
}

export const BattleHeader = ({battleState}: BattleHeaderProps) => {
    return (
        <GenericHeader color="cream">
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-start pt-[2%] px-[1%] w-1/2">
                    <BattleHealthBar currentHealth={battleState.yourPlayer.currentHealth} maxHealth={battleState.yourPlayerMonster.maxHealth} />
                    <div className="leading-none pt-[2%]">
                        <OutlineText size="medium">
                            {battleState.yourPlayerMonster.name}
                        </OutlineText>
                    </div>
                    <div className="leading-none pb-[2%]">
                        <OutlineText size="large">
                            {battleState.yourPlayer.name}
                        </OutlineText>
                    </div>
                </div>
                <div className="flex flex-col items-end pt-[2%] px-[1%] w-1/2">
                    <BattleHealthBar currentHealth={battleState.opponentPlayer.currentHealth} maxHealth={battleState.opponentPlayerMonster.maxHealth} />
                    <div className="leading-none pt-[2%]">
                        <OutlineText size="medium">
                            {battleState.opponentPlayerMonster.name}
                        </OutlineText>
                    </div>
                    <div className="leading-none pb-[2%]">
                        <OutlineText size="large">
                            {battleState.opponentPlayer.name}
                        </OutlineText>
                    </div>
                </div>
            </div>
        </GenericHeader>
    );
};
