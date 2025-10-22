import React, { ReactNode } from "react";

interface OutlineTextBPProps{
    size: 'tiny'|'small'|'medium'|'large'|'extraLarge';
    children?: ReactNode;
}

export const OutlineTextBP = ({children, size}: OutlineTextBPProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem]',
        'small':'sm:text-[0.55rem] md:text-[2rem] lg:text-[0.88rem] xl:text-[1.1rem] 2xl:text-[1.32rem]',
        'medium':'sm:text-[0.75rem] md:text-[3rem] lg:text-[1.2rem] xl:text-[1.5rem] 2xl:text-[1.8rem]',
        'large':'sm:text-[1.5rem] md:text-[4.5rem] lg:text-[2.4rem] xl:text-[3rem] 2xl:text-[3.6rem]',
        'extraLarge': 'sm:text-[2.5rem] md:text-[6rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem]',
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-outline`}>
        {children}
    </p>
    );
}