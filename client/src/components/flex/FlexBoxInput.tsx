import React from "react";
import { InputBox } from "../inputs/InputBox";
import { NameCard } from "../cards/NameCard";
import { NameCardRed } from "../cards/NameCards/NameCardRed";
import { NameCardYellow } from "../cards/NameCards/NameCardYellow";

const FlexBoxInput: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-ronchi w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex flex-col mx-10">
        <p className="items-start font-jua text-blackCurrant text-tiny">Input</p>
        <div className="flex w-full m-4 gap-4">
          <InputBox />
        </div>
        <p className="items-start font-jua text-blackCurrant text-tiny">Cards</p>
        <div className="flex flex-col w-full justify-center m-4 gap-4">
          <NameCard name='Player 1' />
          <NameCardRed name='Player 2' />
          <NameCardYellow name='Player 3' />
        </div>
      </div>
      
    </div>
  );
};

export default FlexBoxInput;