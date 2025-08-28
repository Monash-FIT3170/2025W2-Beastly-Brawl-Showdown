import React, { ReactNode } from "react";

export interface ButtonGenericProps{
    color: 'ronchi' | 'blue' | 'red' | 'purple'| 'alto';
	size: ButtonSize;
	isDisabled?: boolean;
	children?: ReactNode
	onClick?: () => void;
	mobileHidden?: 'false' | 'true'
	isPassive?: boolean;
}

export const ButtonGeneric = ({color,size,isDisabled,children,onClick,mobileHidden='false',isPassive=false}: ButtonGenericProps) => {

	const colorToDisplay = {
		'ronchi': 'bg-ronchi',
		'blue': 'bg-pictonBlue',
		'red': 'bg-burntSienna',
		'purple': 'bg-heliotrope',
		'alto': 'bg-alto',
		}

	const sizeToDisplay = {
		'battle': 'w-[20rem] h-[7rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem] xl:w-[12rem] xl:h-[4.75rem]',
		'large': 'lg:w-[16rem] sm:w-[40rem] lg:h-[4.75rem] sm:h-[15rem] px-[1.5rem] py-[0.75rem] text-[2.1875rem]',
		'medium': 'lg:w-[12rem] sm:w-[25rem] lg:h-[3.75rem] sm:h-[10rem] px-[1.5rem] py-[0.75rem] text-[1.5625rem]',
		'tiny': 'lg:w-[8.125rem] lg:h-[2.5rem] px-[1.5rem] py-[0.75rem] text-[0.9375rem]',
		'square': 'w-[2rem] h-[2rem]',
		'squaremedium': 'lg:w-[4rem] lg:h-[4rem] sm:w-[8rem] sm:h-[8rem]',
		'scaling': 'sm:w-min-[40vw] h-[7dvh] md:w-min-[20dvw] lg:w-min-[10dvw] sm:text-[2.1875rem] md:text-[1.5625] lg:text-[0.9375]'
	}

	const mobile = {
		'true': 'sm:hidden lg:block',
		'false': 'block',
	}

	const baseButton =
		`
		${colorToDisplay[color]}
		${mobile[mobileHidden]}
		flex
		items-center
		justify-around
		text-merino
		sm:outline-[0.75rem]
		md:outline-[0.5rem]
		lg:outline-[0.25rem]
		outline-offset-0
		font-[Jua]
		font-medium
		lg:rounded-[0.5rem]
		md:rounded-[1rem]
		sm:rounded-[2rem]
		`;

	const enabledButton = 
		`
		group-hover:brightness-85
		active:outline-blackCurrant
		active:ring-[0.3125rem]
		active:ring-blackCurrant
		outline-blackCurrant
		`;

	const disabledButton = 
		`
		grayscale
		cursor-not-allowed 
		outline-blackCurrant
		`;

	const passiveButton = 
		`
		outline-[#43bf37]
		cursor-not-allowed
		`

    return(
		<button
		disabled={isDisabled}
		className={`
			${baseButton}
			${isDisabled ? (isPassive ? passiveButton : disabledButton) : enabledButton}
			${sizeToDisplay[size]}
		`}
		onClick={onClick}> 
			{children}
		</button>
  	);
};