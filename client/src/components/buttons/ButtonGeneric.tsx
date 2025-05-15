import React, {useEffect, useState} from "react";

interface ButtonGenericProps{
	text: string;
    color: 'lightorange' | 'blue' | 'red';
	size: 'small' | 'medium' | 'large';
}

export const ButtonGeneric = ({text,color,size}: ButtonGenericProps) => {
	const colorToDisplay = {
		'lightorange': 'bg-lightorange hover:bg-[#FF9E2F]',
		'blue': 'bg-customblue hover:bg-[#1F7BD0]',
		'red': 'bg-sharpred hover:bg-[#C23033]'
		}

	const sizeToDisplay = {
		'large': 'max-w-[15.625rem] h-[4.75rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'max-w-[18.75rem] h-[3.75rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'small': 'max-w-[8.125rem] h-[3.1875rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]'
	}
    return(
        <div>
            <button 
                className={`
				${colorToDisplay[color]}
				text-whiteish
				outline-darkpurple
				outline-[0.25rem]
				outline-offset-0
				focus:outline-darkpurple
				focus:ring-[0.3125rem]
				focus:ring-darkpurple
				font-[Jua]
				font-medium
				rounded-[0.5rem]
				text-[0.875rem]
				me-[0.5rem]
				mb-[0.5rem]
				dark:bg-blue-600
				dark:hover:bg-blue-600
				dark:focus:ring-blue-800
				${sizeToDisplay[size]}`}
				>
                {text}
            </button>
        </div>
    )
};