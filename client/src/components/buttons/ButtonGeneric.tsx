import React, { ReactNode } from "react";

interface ButtonGenericProps{
    color: 'ronchi' | 'blue' | 'red' | 'purple';
	size: 'tiny' | 'medium' | 'large' | 'square' | 'battle';
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
		'large': 'lg:max-w-[15.625rem] sm:w-[40rem] lg:h-[4.75rem] sm:h-[15rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'max-w-[18.75rem] h-[3.75rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'tiny': 'max-w-[8.125rem] h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
		'square': 'w-[2rem] min-h-[2rem]'
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
		transition
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