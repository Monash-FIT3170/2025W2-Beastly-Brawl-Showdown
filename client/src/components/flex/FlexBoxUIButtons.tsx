import React from "react";
import DemoButtonOrange from "../buttons/DemoButtonOrange"
import DemoButtonRed from "../../components/buttons/DemoButtonRed"

const FlexBoxEmpty: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-maybeyellow w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex w-full items-start px-10">
        <p className="items-start font-jua text-darkpurple">Buttons</p>
      </div>
    
      <div className="flex w-full items-start px-10">
        <div className="flex flex-col justify-evenly w-full my-8 px-4">
          <DemoButtonOrange /> 
          <DemoButtonOrange />
          <DemoButtonOrange />
          <DemoButtonOrange />
        </div>
        <div className="flex flex-col justify-evenly w-full my-8 px-4">
          <DemoButtonRed /> 
          <DemoButtonRed /> 
          <DemoButtonRed /> 
          <DemoButtonRed /> 
        </div>
      </div>
    
    </div>
  );
};

export default FlexBoxEmpty;