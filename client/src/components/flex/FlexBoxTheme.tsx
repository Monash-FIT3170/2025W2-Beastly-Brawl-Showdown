import React from "react";

const FlexBoxTheme: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-merino w-1/3 h-72 m-1 rounded-2xl">
      
      <>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-blackCurrant text-tiny">Typography</p>
        </div>
        <div className="flex w-full">
          <p className="items-start font-jua text-8xl mx-10 text-blackCurrant">Aa</p>
          <div className="flex flex-col mx-8">
            <p className="items-start font-jua text-large text-blackCurrant">Large Text</p>
            <p className="items-start font-jua text-medium text-blackCurrant">Medium Text</p>
            <p className="items-start font-jua text-tiny text-blackCurrant">Small Text</p>
          </div>
        </div>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-blackCurrant text-tiny">Outlines and Backgrounds</p>
        </div>
        <div className="flex w-full px-10">
          <div className="flex flex-col justify-around items-center bg-quillGray h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-peach h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-goldenRod h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-ronchi h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-terracotta h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-blackCurrant h-8 w-8 m-0.5 rounded-2xl"></div>
        </div>
        <div className="flex w-full items-start px-10">
          <p className="items-start font-jua text-blackCurrant text-tiny">Themed Components</p>
        </div>
        <div className="flex w-full px-10">
          <div className="flex flex-col justify-around items-center bg-burntSienna h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-pictonBlue h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-schoolBusYellow h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-conifer h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-springLeaves h-8 w-8 m-0.5 rounded-2xl"></div>
          <div className="flex flex-col justify-around items-center bg-heliotrope h-8 w-8 m-0.5 rounded-2xl"></div>
        </div> 
      </>
    </div>
    
  );
};

export default FlexBoxTheme;