import React, {ReactNode} from "react";

interface BaseCardProps{
    color: string;
    children: ReactNode;
}

export const BaseCard = ({color, children}: BaseCardProps) =>{
    
    
    let cardColor = 'bg-'+color;

    return(
        <div className={`${cardColor}`}>
            {children}
        </div>

    );
}

