import React, { ReactNode } from "react";

export interface ButtonGenericProps {
  color: "ronchi" | "blue" | "red" | "purple" | "alto";
  size: ButtonSize;
  isDisabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  mobileHidden?: "false" | "true";
  isPassive?: boolean;
}

export const ButtonGeneric = ({
  color,
  size,
  isDisabled,
  children,
  onClick,
  mobileHidden = "false",
  isPassive = false,
}: ButtonGenericProps) => {
  const colorToDisplay = {
    ronchi: "bg-ronchi",
    blue: "bg-pictonBlue",
    red: "bg-burntSienna",
    purple: "bg-heliotrope",
    alto: "bg-alto",
  };

  const sizeToDisplay = {
    battle:
      "w-[80vw] sm:w-[20rem] h-[7dvh] sm:h-[7rem] px-4 py-2 text-[2rem] sm:text-[2.1875rem]",
    large:
      "w-[90vw] sm:w-[16rem] h-[6dvh] sm:h-[4.75rem] px-4 py-2 text-[2rem] sm:text-[2.1875rem]",
    medium:
      "w-[80vw] sm:w-[12rem] h-[5dvh] sm:h-[3.75rem] px-4 py-2 text-[1.5rem] sm:text-[1.5625rem]",
    tiny: "w-[60vw] sm:w-[8rem] h-[3dvh] sm:h-[2.5rem] px-2 py-1 text-[1rem] sm:text-[0.9375rem]",
    square: "w-[10vw] sm:w-[2rem] h-[10vw] sm:h-[2rem]",
    squaremedium: "w-[20vw] sm:w-[4rem] h-[20vw] sm:h-[4rem]",
    scaling:
      "w-[80vw] sm:w-[40vw] md:w-[20vw] lg:w-[10vw] h-[7dvh] sm:text-[2.1875rem] md:text-[1.5625rem] lg:text-[0.9375rem]",
    adventure:
      "w-[90vw] sm:w-[12rem] h-[6dvh] sm:h-[3.75rem] px-4 py-2 text-[2rem] sm:text-[2.1875rem]",
  };

  const mobile = {
    true: "sm:hidden lg:block",
    false: "block",
  };

  const baseButton = `
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

  const enabledButton = `
		group-hover:brightness-85
		active:outline-blackCurrant
		active:ring-[0.3125rem]
		active:ring-blackCurrant
		outline-blackCurrant
		`;

  const disabledButton = `
		grayscale
		cursor-not-allowed 
		outline-blackCurrant
		`;

  const passiveButton = `
		outline-[#43bf37]
		cursor-not-allowed
		`;

  return (
    <button
      disabled={isDisabled}
      className={`
			${baseButton}
			${isDisabled ? (isPassive ? passiveButton : disabledButton) : enabledButton}
			${sizeToDisplay[size]}
		`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
