import React from "react";
import { InputBox } from "../inputs/InputBox";

const FlexBoxEmpty: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-lightorange w-1/3 h-72 m-1 rounded-2xl">
      <InputBox />
    </div>
  );
};

export default FlexBoxEmpty;