import React, { ReactNode } from "react";

type SizeKey = 'tiny' | 'medium' | 'large' | 'extraLarge';

interface OutlineTextResizableProps{
    size: SizeKey;
    children: String;
    max1:number;
    max2:number;
}

export const OutlineTextResizable = ({children, max1, max2, size}: OutlineTextResizableProps) => {
    
    // const sizeList: SizeKey[] = ['extraLarge', 'large', 'medium', 'tiny']
    const sizeList: SizeKey[] = ['tiny', 'medium', 'large', 'extraLarge']

    // const text = React.Children.toArray(children).join('').trim();


    let index = sizeList.indexOf(size);

    if (children.length > max2) {
        index = Math.max(0, index - 2);
    } else if (children.length > max1) {
        index = Math.max(0, index - 1);

    } 

    const trueSize = sizeList[index]
    
    const sizeLoader: Record<SizeKey, string> = {
        tiny:'text-[2rem] lg:text-tiny',
        medium:'text-[3rem] lg:text-medium',
        large:'text-[4rem] lg:text-large sm:text-largemobile',
        extraLarge: 'text-[5rem]'
    }

    return(
    <p className={`${sizeLoader[trueSize]} font-[Jua] text-outline`}>
        {children}
    </p>
    );
}
