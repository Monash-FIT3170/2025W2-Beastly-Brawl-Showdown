import React from "react";
import "./BattleMonsterPanel.css";
import { BattleState } from "/types/composite/battleState";

interface BattleMonsterPanelTestProps {
  battleState: BattleState;
}

const BattleMonsterPanelTest: React.FC<BattleMonsterPanelTestProps> = ({ battleState }) =>{
    const pathLeftMon = "/assets/characters/" + battleState.yourPlayerMonster.id + ".png";
    const pathRightMon = "/assets/characters/" + battleState.opponentPlayerMonster.id + ".png";

    console.log("Left Monster Path: ", pathLeftMon);
    console.log("Right Monster Path: ", pathRightMon);

    const shadow=
    `
    xl:w-[13rem]
    xl:h-[2rem]
    opacity-70
    xl:-mt-[4rem]
    xl:mb-[2rem]
    w-[30rem]
    h-[4rem]
    -mt-[8rem]
    mb-[10rem]
    z-0
    flex

    `

    return (
        <div className="fixed flex flex-col w-full h-screen justify-center pb-[50%] xl:pb-[25%] pl-[5%] xl:pl-[0%] xl:pr-[0%] pr-[5%]">
            <div className="w-full place-items-center xl:gap-x-[40rem] grid grid-cols-2 gap-y-[7rem] xl:gap-y-[0rem] ">
                <div></div>
                <div className=" relative inline-block xl:w-[50%] ">
                    <img  className="relative z-10" src={pathRightMon}/>
                    <div className={`${shadow}`}></div>
                </div>
                <div className="relative inline-block xl:w-[50%]">
                    <img className=" relative transform -scale-x-100 z-10" src={pathLeftMon}/>
                    <img className={`${shadow}`} src="/assets/shadow.png"></img>
                </div>
                <div></div>
            </div>
        </div>
    );

};

export default BattleMonsterPanelTest;