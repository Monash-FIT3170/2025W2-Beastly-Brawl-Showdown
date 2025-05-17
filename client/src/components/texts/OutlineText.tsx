import React, { ReactNode } from "react";

interface OutlineTextProps{
    size: string
    children?: ReactNode;
}

export const OutlineText = ({children, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-tiny',
        'medium': 'text-medium',
        'large': 'text-large'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-outline`}> 
        {children}
    </p>
    );
}
