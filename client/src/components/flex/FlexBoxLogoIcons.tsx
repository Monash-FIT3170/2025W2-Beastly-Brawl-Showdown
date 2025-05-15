import React from "react";
import { IconTest } from "../icons/IconTest";
import { LogoResizable } from "../logos/LogoResizable";
import { IconArrowLeft } from "../icons/IconArrowLeft";
import { IconArrowRight } from "../icons/IconArrowRight";
import { IconArrowUp } from "../icons/IconArrowUp";
import { IconArrowDown } from "../icons/IconArrowDown";
import { IconInfo } from "../icons/IconInfo";
import { IconCog } from "../icons/IconCog";
import { IconX } from "../icons/IconX";

const FlexBoxLogoIcons: React.FC = () => {  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-cream w-2/3 h-72 m-1 rounded-2xl" style={{ width: "calc(66.6666666667% + 8px)" }}>
      <div className="flex w-full items-center justify-around">
        <LogoResizable height={10} width={10}/>
        <div className="flex flex-col justify-around h-full">
          <p className="font-jua text-darkpurple">Icons</p>
          <div className="flex w-full justify-center m-4 gap-8">
            <IconArrowLeft />
            <IconArrowRight />
            <IconArrowUp />
            <IconArrowDown />
          </div>
          <div className="flex w-full justify-center m-4 gap-8">
            <IconInfo />
            <IconCog />
            <IconX />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexBoxLogoIcons;