import React from "react";
import { ButtonGeneric } from "../buttons/ButtonGeneric";

const FlexBoxButtons: React.FC = () => {
  const disable = true

  return (
    <div className="flex flex-col justify-around items-center bg-goldenRod w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex w-full items-start px-10">
        <p className="items-start font-jua text-blackCurrant text-tiny">Buttons</p>
      </div>
      <div className="flex flex-row w-full h-3/4 items-center justify-evenly">
        <div className="flex flex-col space-y-4">
          <ButtonGeneric text='Button' color='ronchi' size='tiny' /> 
          <ButtonGeneric text='Button' color='ronchi' size='tiny' /> 
          <ButtonGeneric text='Button' color='ronchi' size='tiny' />  
          <ButtonGeneric text='Button' color='ronchi' size='tiny' isDisabled={disable}/> 
        </div>
        <div className="flex flex-col space-y-4">
          <ButtonGeneric text='Button' color='red' size='tiny' /> 
          <ButtonGeneric text='Button' color='red' size='tiny' /> 
          <ButtonGeneric text='Button' color='red' size='tiny' /> 
          <ButtonGeneric text='Button' color='red' size='tiny' isDisabled={disable}/> 
        </div>
        <div className="flex flex-col space-y-4">
          <ButtonGeneric text='Button' color='blue' size='tiny' /> 
          <ButtonGeneric text='Button' color='blue' size='tiny' /> 
          <ButtonGeneric text='Button' color='blue' size='tiny' /> 
          <ButtonGeneric text='Button' color='blue' size='tiny' isDisabled={disable}/> 
        </div>
      </div>
    </div>
  );
};

export default FlexBoxButtons;