import React, {ReactNode} from "react";

interface BaseCardProps{
    color: string;
    children: ReactNode;
}

export const BaseCard = ({color, children}: BaseCardProps) =>{
    
    
    const colorLoader: Record<string, string> = {
        'customblue':'bg-customblue',
        'lightorange': 'bg-lightorange',
        'orange': 'bg-orange',
        'maybeyellow': 'bg-maybeyellow',
        'cream': 'bg-cream',
        'plainyellow': 'bg-plainyellow'
    }

    return(
        <div className={`${colorLoader[color]} border border-[4px] border-darkpurple w-fit rounded-xl`}>
            {children}
        </div>

    );
}

