import React, { ReactNode } from "react";

interface OutlineTextProps{
    size: 'tiny'|'small'|'medium'|'medium-battle-text'|'choice-text'|'large'|'extraLarge'|'monsterSelect';
    children?: ReactNode;
}

export const OutlineText = ({children, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem] lg:text-tiny',
        'small': 'text-[1.5rem] lg:text-small',
        'medium':'text-[3rem] lg:text-medium',
        'medium-battle-text': 'text-[2rem] lg:text-medium-battle-text',
        'choice-text': 'text-[4rem] lg:text-large',
        'large':'text-[4rem] lg:text-large sm:text-largemobile',
        'extraLarge': 'text-[5rem]',
        'monsterSelect':'lg:text-[5rem] sm:text-[4.2rem]'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-outline`}>
        {children}
    </p>
    );
}