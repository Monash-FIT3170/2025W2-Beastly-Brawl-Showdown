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
      "w-[80vw] sm:w-[20rem] h-auto py-2 sm:h-[7rem] sm:py-0 text-[clamp(1.5rem,4vw,2rem)] sm:text-[2.1875rem]",
    large:
      "w-[90vw] sm:w-[16rem] h-auto py-2 sm:h-[4.75rem] sm:py-0 text-[clamp(1.5rem,4vw,2rem)] sm:text-[2.1875rem]",
    medium:
      "w-[80vw] sm:w-[12rem] h-auto py-2 sm:h-[3.75rem] sm:py-0 text-[clamp(1.25rem,3.5vw,1.5625rem)] sm:text-[1.5625rem]",
    tiny: "w-[60vw] sm:w-[8rem] h-auto py-1 sm:h-[2.5rem] sm:py-0 text-[clamp(0.875rem,3vw,0.9375rem)] sm:text-[0.9375rem]",
    square: "w-[10vw] sm:w-[2rem] h-[10vw] sm:h-[2rem]",
    squaremedium: "w-[20vw] sm:w-[4rem] h-[20vw] sm:h-[4rem]",
    scaling:
      "w-[80vw] sm:w-[40vw] md:w-[20vw] lg:w-[10vw] h-auto sm:h-auto text-[clamp(1.5rem,4vw,2rem)] sm:text-[2.1875rem]",
    adventure:
      "w-[90vw] sm:w-[12rem] h-auto py-2 sm:h-[3.75rem] sm:py-0 text-[clamp(1.5rem,4vw,2rem)] sm:text-[2.1875rem]",
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
    justify-center
    text-merino
    font-[Jua]
    font-medium
    text-center
    rounded-xl
    overflow-hidden
    border-4 border-black
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
        ${
          isDisabled
            ? isPassive
              ? passiveButton
              : disabledButton
            : enabledButton
        }
        ${sizeToDisplay[size]}
      `}
      onClick={onClick}
    >
      <div className="overflow-hidden text-center truncate w-full">
        {children}
      </div>
    </button>
  );
};
