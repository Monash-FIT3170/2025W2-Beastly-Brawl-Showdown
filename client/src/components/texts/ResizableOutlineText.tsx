import React, { ReactNode } from "react";

type SizeKey = 'tiny' | 'smaller' | 'small' | 'medium' | 'large' | 'extraLarge';

interface OutlineTextResizableProps{
    size: SizeKey;
    children: String;
    max1?:number;
    max2?:number;
    max3?: number;
}

export const OutlineTextResizable = ({children, max1, max2, max3, size}: OutlineTextResizableProps) => {

    const sizeList: SizeKey[] = ['tiny', 'smaller', 'small', 'medium', 'large', 'extraLarge']



    let index = sizeList.indexOf(size);

    const textLine = children.split(" ")

    let shrink = 0;

    
    textLine.forEach(line => {
        if (max3 && line.length > max3) {
            // if third maxiumm is reached - shrink text size on down three times
            shrink = Math.max(shrink, 3);
        } else if (max2 && line.length > max2) {
            // if second maxiumm is reached - shrink text size on down twice
            shrink = Math.max(shrink, 2);
        } else if (max1 && line.length > max1) {
            // if first maxiumm is reached - shrink text size down once
            shrink = Math.max(shrink, 1);
        }
    });

    index = index - shrink;

    const trueSize = sizeList[index]
    
    const sizeLoader: Record<SizeKey, string> = {
        tiny:'text-[2rem] lg:text-tiny',
        smaller:'text-[2rem] lg:text-smaller',
        small: 'text-[2.5rem] lg:text-small',
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
