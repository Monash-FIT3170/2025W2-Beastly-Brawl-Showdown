import React from "react";

interface OutlineTextProps{
    text: string
    size: string
}

export const OutlineText = ({text, size}: OutlineTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-tiny',
        'medium': 'text-medium',
        'large': 'text-large'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-outline`}> 
        {text}
    </p>
    );
}
