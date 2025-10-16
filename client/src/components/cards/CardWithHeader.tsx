import React, { ReactNode } from "react";
import { OutlineText } from "../../components/texts/OutlineText";

interface CardWithHeaderProps {
  headerText: string;
  headerColor: "golden";
  cardColor: "white";
  children?: ReactNode;
}

export const CardWithHeader = ({ headerText, headerColor, cardColor, children }: CardWithHeaderProps) => {
  const colorToDisplay = {
    golden: "bg-goldenRod",
    white:  "bg-plainWhite",
  };

  return (
    <div className="h-screen w-screen bg-[#f6e3b4] flex flex-col items-center justify-center">
      <div className={`${colorToDisplay[headerColor]} border-[0.2rem] border-blackCurrant text-center rounded-t-2xl px-[2rem] py-[1rem] shadow-md w-[90%] lg:w-[60%] z-10`}>
        <OutlineText size="extraLarge">{headerText}</OutlineText>
      </div>

      <div className={`${colorToDisplay[cardColor]} border-[0.2rem] border-blackCurrant rounded-2xl shadow-lg px-[2rem] lg:px-[3rem] py-[2rem] w-[75%] lg:w-[75%] flex flex-col items-center justify-center -mt-[0.2rem]`}>
        {children}
      </div>
    </div>
  );
};
