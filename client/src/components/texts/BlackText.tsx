import React, { ReactNode } from "react";

interface BlackTextProps{
    size: string
    children?: ReactNode;
}

export const BlackText = ({children, size}: BlackTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-tiny',
        'medium': 'text-medium',
        'large': 'text-large'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-darkpurple`}> 
        {children}
    </p>
    );
}