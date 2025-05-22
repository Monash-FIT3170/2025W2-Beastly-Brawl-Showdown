import React, { ReactNode } from "react";

interface BlackTextProps{
    size: 'tiny'|'medium'|'large';
    children?: ReactNode;
}

export const BlackText = ({children, size}: BlackTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-[2rem] xl:text-tiny',
        'medium': 'text-[3rem] xl:text-medium',
        'large': 'text-[4rem] xl:text-large'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-blackCurrant`}> 
        {children}
    </p>
    );
}