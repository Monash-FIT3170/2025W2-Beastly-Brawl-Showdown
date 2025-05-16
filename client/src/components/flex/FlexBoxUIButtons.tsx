import React from "react";
import { ButtonGeneric } from "../buttons/ButtonGeneric";

const FlexBoxButtons: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-maybeyellow w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex w-full items-start px-10">
        <p className="items-start font-jua text-darkpurple text-tiny">Buttons</p>
      </div>
      <div className="flex w-full items-start px-10">
        <div className="flex flex-col w-full my-8 px-2 space-y-2">
          <ButtonGeneric text='Button' color='lightorange' size='small' /> 
          <ButtonGeneric text='Button' color='lightorange' size='small' /> 
          <ButtonGeneric text='Button' color='lightorange' size='small' /> 
          <ButtonGeneric text='Button' color='lightorange' size='small' /> 
        </div>
        <div className="flex flex-col w-full my-8 px-2 space-y-2">
          <ButtonGeneric text='Button' color='red' size='small' /> 
          <ButtonGeneric text='Button' color='red' size='small' /> 
          <ButtonGeneric text='Button' color='red' size='small' /> 
          <ButtonGeneric text='Button' color='red' size='small' /> 
        </div>
        <div className="flex flex-col w-full my-8 px-2 space-y-2">
          <ButtonGeneric text='Button' color='blue' size='small' /> 
          <ButtonGeneric text='Button' color='blue' size='small' /> 
          <ButtonGeneric text='Button' color='blue' size='small' /> 
          <ButtonGeneric text='Button' color='blue' size='small' /> 
        </div>
      </div>
    
    </div>
  );
};

export default FlexBoxButtons;