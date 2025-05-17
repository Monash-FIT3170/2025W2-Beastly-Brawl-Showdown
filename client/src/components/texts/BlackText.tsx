import React from "react";

interface BlackTextProps{
    text: string
    size: string
}

export const BlackText = ({text, size}: BlackTextProps) => {
    
    const sizeLoader: Record<string, string> = {
        'tiny':'text-tiny',
        'medium': 'text-medium',
        'large': 'text-large'
    }

    return(
    <p className={`${sizeLoader[size]} font-[Jua] text-darkpurple`}> 
        {text}
    </p>
    );
}