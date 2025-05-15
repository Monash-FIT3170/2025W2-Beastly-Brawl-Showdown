import React from "react";
import { InputBox } from "../inputs/InputBox";
import { NameCardPurple } from "../cards/NameCards/NameCardPurple";
import { NameCardRed } from "../cards/NameCards/NameCardRed";
import { NameCardYellow } from "../cards/NameCards/NameCardYellow";

const FlexBoxEmpty: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-lightorange w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex flex-col mx-10">
        <p className="items-start font-jua text-darkpurple">Input</p>
        <div className="flex w-full m-4 gap-4">
          <InputBox />
        </div>
        <p className="items-start font-jua text-darkpurple">Cards</p>
        <div className="flex flex-col w-full justify-center m-4 gap-4">
          <NameCardPurple name='Player 1' />
          <NameCardRed name='Player 2' />
          <NameCardYellow name='Player 3' />
        </div>
      </div>
      
    </div>
  );
};

export default FlexBoxEmpty;