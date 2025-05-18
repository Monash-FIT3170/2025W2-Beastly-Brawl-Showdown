import React, {ReactNode} from "react";

interface BaseCardProps{
    color: string;
    children?: ReactNode;
    width?: number;
    height?: number;
}

export const BaseCard = ({color, children, width, height}: BaseCardProps) =>{
    

    
    
    const colorLoader: Record<string, string> = {
        'customblue':'bg-customblue',
        'lightorange': 'bg-lightorange',
        'orange': 'bg-orange',
        'maybeyellow': 'bg-maybeyellow',
        'cream': 'bg-cream',
        'plainyellow': 'bg-plainyellow',
        'guardian': 'bg-guardianblue',
        'predator': 'bg-predatorpurple',
        'wyvern': 'bg-wyvernred'
    }

    return(
        <div className={`${colorLoader[color]} border border-[4px] border-darkpurple w-min h-min rounded-xl`}
        style = {{width: width ? `${width}rem` : undefined,
                    height: height ? `${height}rem` : undefined}}
        >
            {children}
        </div>

    );
}

