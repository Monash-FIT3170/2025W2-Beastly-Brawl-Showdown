import React from "react";

const FlexBoxEmpty: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-whiteish w-1/3 h-72 m-1 rounded-2xl">
      
      <>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-darkpurple">Typography</p>
        </div>
        <div className="flex w-full">
          <p className="items-start font-jua text-8xl mx-10 text-darkpurple">Aa</p>
          <div className="flex flex-col mx-10">
            <p className="items-start font-jua text-xl text-darkpurple">Text Large</p>
            <p className="items-start font-jua text-darkpurple">Text Medium</p>
            <p className="items-start font-jua text-sm text-darkpurple">Text Small</p>
          </div>
        </div>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-darkpurple">Outlines and Backgrounds</p>
        </div>
        <div className="flex w-full px-10">
          <div className="flex flex-col justify-around items-center bg-lightgrey h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-cream h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-maybeyellow h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-lightorange h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-orange h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-darkpurple h-8 w-8 m-0.5 rounded-2xl"></div>
        </div>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-darkpurple">Themed Components</p>
        </div>
        <div className="flex w-full px-10">
          <div className="flex flex-col justify-around items-center bg-sharpred h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-customblue h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-plainyellow h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-neongreen h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-forestgreen h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-brightpurple h-8 w-8 m-0.5 rounded-2xl"></div>
        </div> 
      </>
    </div>
    
  );
};

export default FlexBoxEmpty;