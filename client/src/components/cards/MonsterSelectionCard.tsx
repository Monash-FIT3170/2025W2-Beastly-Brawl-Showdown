import React, { useEffect, useState } from "react";

interface MonsterSelectionProps{
    name: string;
    description: string;
    image: string;
    type: string;
}

export const MonsterSelectionCard = ({name, description, image, type}: MonsterSelectionProps) =>{
    

    const [color, setColor] = useState('blue');
    useEffect(()=>{

        switch(type){
            case 'attacker':
                setColor('sharpred');
                break;
            case 'defender':
                setColor('neongreen');
                break;
            case 'balanced':
                setColor('customblue');
                break;
                
        }
    },[color])
    

    return(

        <div className={`bg-${color} border border-[4px] border-darkpurple rounded-[15px]`} >
            {name}
            {description}
            {image}
            {type}
        </div>
    );
}