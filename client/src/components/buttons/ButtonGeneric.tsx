import React, { ReactNode } from "react";

interface ButtonGenericProps{
    color: 'lightorange' | 'blue' | 'red';
	size: 'tiny' | 'medium' | 'large' | 'square';
	isDisabled?: boolean;
	children?: ReactNode
}

export const ButtonGeneric = ({color,size,isDisabled,children}: ButtonGenericProps) => {

	const colorToDisplay = {
		'lightorange': 'bg-lightorange',
		'blue': 'bg-customblue',
		'red': 'bg-sharpred'
		}

	const sizeToDisplay = {
		'large': 'max-w-[15.625rem] h-[4.75rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'max-w-[18.75rem] h-[3.75rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'tiny': 'max-w-[8.125rem] h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
		'square': 'w-[2rem] h-[2rem]'
	}

	const baseButton =
		`
		${colorToDisplay[color]}
		flex
		items-center
		text-whiteish
		outline-darkpurple
		outline-[0.25rem]
		outline-offset-0
		transition
		font-[Jua]
		font-medium
		rounded-[0.5rem]
		text-[0.875rem]
		
		dark:bg-blue-600
		dark:hover:bg-blue-600
		dark:focus:ring-blue-800
		`;

	const enabledButton = 
		`
		hover:brightness-85
		active:outline-darkpurple
		active:ring-[0.3125rem]
		active:ring-darkpurple
		`;

	const disabledButton = 
		`
		grayscale
		cursor-not-allowed 
		`;

    return(
		<button
		disabled={isDisabled}
		className={`
			${baseButton} 
			${isDisabled ? disabledButton : enabledButton}
			${sizeToDisplay[size]}
		`}> 
			{children}
		</button>
  	);
};