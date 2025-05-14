import React, { useEffect, useState } from "react";

interface MonsterSelectionProps{
    name: string;
    description: string;
    image: string;
    type: string;
}

export const MonsterSelectionCard = ({name, description, image, type}: MonsterSelectionProps) =>{
    

    const [color, setColor] = useState('blue');

    const monsterToColour = {
        'wolf': {
            'bgColour': 'blue',
            'name': 'Wolf',
            'description': 'Yayaya'
        }
        ,
        'rhino': 'black',
        'dragon': 'red'
    }
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
                rounded-[15px]`}>
            <div>
                
            </div>
            <div>
                <p className=" text-large text-white font-[Jua]">{name}</p>
                <p className=" text-medium text-black font-[Jua]">{description}</p>
            </div>
        </button>
    );
}