import React, { ReactNode } from "react";

interface OutlineTextProps{
    size: 'tiny'|'medium'|'large';
    children?: ReactNode;
}

export const OutlineText = ({children, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem] xl:text-tiny',
        'medium': 'text-[3rem] xl:text-medium',
        'large': 'text-[4rem] xl:text-large'
    }

    return(
    <p className={`${sizeLoader[size]}  font-[Jua] text-outline`}>
        {children}
    </p>
    );
}
