import React, { ReactNode } from "react";

interface OutlineTextProps{
    size: 'tiny'|'small'|'medium'|'large'|'extraLarge';
    children?: ReactNode;
}

export const OutlineText = ({children, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem] lg:text-tiny',
        'small': 'text-[1.5rem] lg:text-small',
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