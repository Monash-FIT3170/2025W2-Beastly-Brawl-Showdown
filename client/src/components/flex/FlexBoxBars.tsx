import React from "react";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { AttackBonusBar } from "../bars/AttackBonusBar";
import { TotalHealthBar } from "../bars/TotalHealthBar";
import { ArmourClassBar } from "../bars/ArmourClassBar";

const FlexBoxBars: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-pictonBlue w-1/3 h-72 m-1 rounded-2xl">
      <div className="flex flex-col space-y-2 mx-10">
        <p className="items-start font-jua text-merino text-tiny">Health Bars</p>
        <div className="flex flex-col space-y-2 mx-4">
          <BattleHealthBar currentHealth={20} maxHealth={20}/>
          <BattleHealthBar currentHealth={10} maxHealth={20}/>
          <BattleHealthBar currentHealth={5} maxHealth={20}/>
        </div>
        <p className="items-start font-jua text-merino text-tiny">Attribute Bars</p>
        <div className="flex flex-col space-y-2 mx-4">
          <TotalHealthBar totalHealth={30} highestTotalHealth={40}/>
          <ArmourClassBar armourClass={16} highestArmourClass={20}/>
          <AttackBonusBar attackBonus={1} highestAttackBonus={10}/>
        </div>
      </div>
    </div>
  );
};

export default FlexBoxBars;