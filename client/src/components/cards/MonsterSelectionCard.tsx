import React, { useEffect, useState } from "react";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";

interface MonsterSelectionProps{
    name: string;
    description: string;
    image: string;
    type: string;
}

export const MonsterSelectionCard = ({name, description, type}: MonsterSelectionProps) =>{
    

    const [color, setColor] = useState('blue');

    useEffect(()=>{
        switch(type){
            case 'attacker':
                setColor('bg-sharpred');
                break;
            case 'defender':
                setColor('bg-neongreen');
                break;
            case 'balanced':
                setColor('bg-customblue');
                break;
                
        }
    },[type])
    

    return(

        <button 
            className=
                {`${color} 
                border border-[4px] border-darkpurple 
                rounded-[15px]
                flex flex-row`}>
            <div>
                <MonsterImageResizable name = {name} height={10} width={10}/>
            </div>
            <div>
                <p className=" text-large text-white font-[Jua]">{name}</p>
                <p className=" text-medium text-black font-[Jua]">{description}</p>
            </div>
        </button>
    );
}