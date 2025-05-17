import React from "react";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

interface MonsterSelectionProps{
    name: string;
    description: string;
    type: string;
}

export const MonsterSelectionCard = ({name, description, type}: MonsterSelectionProps) =>{

    const colorLoader: Record<string, string> = {
        'attacker': 'bg-sharpred',
        'defender': 'bg-neongreen',
        'balanced': 'bg-customblue'
    }
    
    return(
        <button 
            className=
                {`${colorLoader[type]} 
                border border-[4px] border-darkpurple 
                rounded-xl
                w-[40rem]
                flex flex-row`}>
            <div className="flex flex-col shrink-0 justify-center">
                <MonsterImageResizable name = {name} height={10} width={10}/>
            </div>
            <div className="flex flex-col text-center grow">
                <OutlineText size = 'large'>
                    {name}
                </OutlineText>
                <BlackText size = 'medium'>
                    {description}
                </BlackText>
            </div>
        </button>
    );
}