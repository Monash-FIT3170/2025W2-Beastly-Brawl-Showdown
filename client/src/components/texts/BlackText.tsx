import React, { ReactNode } from "react";

interface BlackTextProps {
  size: "tiny" | "medium" | "large" | "choice-text";
  children?: ReactNode;
}

export const BlackText = ({ children, size }: BlackTextProps) => {
  const sizeLoader: Record<string, string> = {
    tiny: "text-[2rem] xl:text-tiny",
    medium: "text-[3rem] xl:text-medium sm:text-large",
    large: "text-[4rem] xl:text-large",
    "choice-text": "text-[4rem] lg:text-large",
  };

  return (
    <p className={`${sizeLoader[size]} font-[Jua] text-blackCurrant whitespace-pre-line`}>
      {children}
    </p>
  );
};
