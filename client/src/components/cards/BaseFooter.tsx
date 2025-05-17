import React, {ReactNode} from "react";

interface BaseFooterProps{
    color: string;
    children: ReactNode;
}

export const BaseFooter = ({color, children}: BaseFooterProps) =>{
    

    const colorLoader: Record<string, string> = {
        'customblue':'bg-customblue',
        'lightorange': 'bg-lightorange',
        'orange': 'bg-orange',
        'maybeyellow': 'bg-maybeyellow',
        'cream': 'bg-cream',
        'plainyellow': 'bg-plainyellow'
    }

    return(
        <div className=
            {`${colorLoader[color]} 
            mx-auto
            w-[60%]
            h-normalPhoneHeight
            rounded-tl-xl rounded-tr-xl
            border-[4px] border-darkpurple border-b-0
            text-center text-wrap
            pl-[1%] pr-[1%]
            inset-x-0
            fixed
            bottom-0`}>
            {children}
        </div>

    );
}

