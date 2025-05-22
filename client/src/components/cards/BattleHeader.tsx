import React from "react";
import { GenericHeader } from "./GenericHeader";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";

// Ideally, this will be replaced with the actual Player/Monster instances
interface BattleHeaderProps {
    player1Name: string;
    monster1Name: string;
    monster1CurrentHealth: number;
    monster1MaxHealth: number;
    player2Name: string;
    monster2Name: string;
    monster2CurrentHealth: number;
    monster2MaxHealth: number;
}

export const BattleHeader = ({
    player1Name,
    monster1Name,
    monster1CurrentHealth,
    monster1MaxHealth,
    player2Name,
    monster2Name,
    monster2CurrentHealth,
    monster2MaxHealth
}: BattleHeaderProps) => {
    return (
        <GenericHeader color="cream">
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-start pt-[2%] px-[1%] w-1/2">
                    <BattleHealthBar currentHealth={monster1CurrentHealth} maxHealth={monster1MaxHealth} />
                    <div className="leading-none py-[2%]">
                        <OutlineText size="tiny">
                            {monster1Name}
                        </OutlineText>
                    </div>
                    <div className="leading-none py-[2%]">
                        <OutlineText size="medium">
                            {player1Name}
                        </OutlineText>
                    </div>
                </div>
                <div className="flex flex-col items-end pt-[2%] px-[1%] w-1/2">
                    <BattleHealthBar currentHealth={monster2CurrentHealth} maxHealth={monster2MaxHealth} />
                    <div className="leading-none py-[2%]">
                        <OutlineText size="tiny">
                            {monster2Name}
                        </OutlineText>
                    </div>
                    <div className="leading-none py-[2%]">
                        <OutlineText size="medium">
                            {player2Name}
                        </OutlineText>
                    </div>
                </div>
            </div>
        </GenericHeader>
    );
};
