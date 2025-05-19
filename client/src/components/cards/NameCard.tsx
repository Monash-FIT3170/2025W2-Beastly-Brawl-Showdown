import React from "react";
import { IconButton } from "../buttons/IconButton";
import { BaseCard } from "./BaseCard";
import { BlackText } from "../texts/BlackText";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";

interface NameCardProps {
    name: string;
    monster: 'StonehideGuardian' | 'ShadowFangPredator' | 'MysticWyvern'
}

export const NameCard = ({name, monster}: NameCardProps) => {

    const monsterCardColour = {
        'StonehideGuardian': 'guardian',
        'ShadowFangPredator': 'predator',
        'MysticWyvern': 'wyvern'
    }
    
    return (
        <div className="flex flex-col justify-center items-center h-60">
            <MonsterImageResizable name={monster} width={8} height={8} />
            <BaseCard color={monsterCardColour[monster]}>
                <div className='flex flex-row items-center space-x-4 m-2'>
                    <BlackText size='medium'>
                        {name}
                    </BlackText>
                    <IconButton style='x' iconColour='black' buttonColour='red' />
                </div>
            </BaseCard>
        </div>
    );
};