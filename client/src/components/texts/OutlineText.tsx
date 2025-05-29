import React, { ReactNode } from "react";

interface OutlineTextProps{
    size: 'tiny'|'medium'|'large'|'extraLarge';
    children?: ReactNode;
}

export const OutlineText = ({children, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem] lg:text-tiny',
        'medium':'text-[3rem] lg:text-medium',
        'large':'text-[4rem] lg:text-large sm:text-largemobile',
        'extraLarge': 'text-[5rem]'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-outline`}>
        {children}
    </p>
    );
}
