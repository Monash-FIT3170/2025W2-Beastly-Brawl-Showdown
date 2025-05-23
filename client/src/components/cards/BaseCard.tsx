import React, {ReactNode} from "react";

interface BaseCardProps{
    color: string;
    children?: ReactNode;
    width?: number;
    height?: number;
}

export const BaseCard = ({color, children, width, height}: BaseCardProps) =>{
    
    const colorLoader: Record<string, string> = {
        'pictonBlue':'bg-pictonBlue',
        'ronchi': 'bg-ronchi',
        'terracotta': 'bg-terracotta',
        'goldenRod': 'bg-goldenRod',
        'peach': 'bg-peach',
        'springLeaves': 'bg-springLeaves',
        'schoolBusYellow': 'bg-schoolBusYellow',
        'quillGray': 'bg-quillGray',
        'guardian': 'bg-guardianblue',
        'predator': 'bg-predatorpurple',
        'wyvern': 'bg-wyvernred'
    }

    return(
        <div className={`${colorLoader[color]} flex flex-row items-center justify-around border-[4px] border-blackCurrant w-min h-min rounded-xl`}
        style = {{width: width ? `${width}rem` : undefined,
                    height: height ? `${height}rem` : undefined}}
        >
            {children}
        </div>

    );
}

