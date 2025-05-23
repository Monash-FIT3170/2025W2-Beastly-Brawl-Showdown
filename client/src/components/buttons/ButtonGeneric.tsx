import React, { ReactNode } from "react";

interface ButtonGenericProps{
    color: 'ronchi' | 'blue' | 'red' | 'purple';
	size: ButtonSize;
	isDisabled?: boolean;
	children?: ReactNode
	onClick?: () => void;
}

export const ButtonGeneric = ({color,size,isDisabled,children,onClick}: ButtonGenericProps) => {

	const colorToDisplay = {
		'ronchi': 'bg-ronchi',
		'blue': 'bg-pictonBlue',
		'red': 'bg-burntSienna',
		'purple': 'bg-heliotrope'
		}

	const sizeToDisplay = {
		'battle': 'w-[20rem] h-[7rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem] xl:w-[15.625rem] xl:h-[4.75rem]',
		'large': 'lg:w-[16rem] sm:w-[40rem] lg:h-[4.75rem] sm:h-[15rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'lg:w-[12rem] sm:w-[25rem] lg:h-[3.75rem] sm:h-[10rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'tiny': 'lg:w-[8.125rem] lg:h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
		'square': 'w-[2rem] h-[2rem]',
		'squaremedium': 'lg:w-[4rem] lg:h-[4rem] sm:w-[8rem] sm:h-[8rem]',
	}

	const baseButton =
		`
		${colorToDisplay[color]}
		flex
		items-center
		justify-around
		text-merino
		outline-blackCurrant
		sm:outline-[0.75rem]
		lg:outline-[0.25rem]
		outline-offset-0
		font-[Jua]
		font-medium
		lg:rounded-[0.5rem]
		sm:rounded-[2rem]
		`;

	const enabledButton = 
		`
		hover:brightness-85
		active:outline-blackCurrant
		active:ring-[0.3125rem]
		active:ring-blackCurrant
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