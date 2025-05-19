import React, { ReactNode } from "react";

interface ButtonGenericProps{
    color: 'lightorange' | 'blue' | 'red' | 'purple';
	size: 'tiny' | 'medium' | 'large' | 'square';
	isDisabled?: boolean;
	children?: ReactNode
	onClick?: () => void;
}

export const ButtonGeneric = ({color,size,isDisabled,children,onClick}: ButtonGenericProps) => {

	const colorToDisplay = {
		'lightorange': 'bg-lightorange',
		'blue': 'bg-pictonBlue',
		'red': 'bg-sharpred',
		'purple': 'bg-brightpurple'
		}

	const sizeToDisplay = {
		'large': 'max-w-[15.625rem] h-[4.75rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'max-w-[18.75rem] h-[3.75rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'tiny': 'max-w-[8.125rem] h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
		'square': 'w-[2rem] min-h-[2rem]'
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
		`}
		onClick={onClick}> 
			{children}
		</button>
  	);
};