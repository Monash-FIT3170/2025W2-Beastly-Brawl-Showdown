import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { Screens } from "../../screens";
import { MonsterState } from "../../../../types/single/monsterState";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { MonsterSelectionCard } from "../../components/cards/MonsterSelectionCard";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { MonsterImage } from "../../components/player-screen/monsters/MonsterImage";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { TotalHealthBar } from "../../components/bars/TotalHealthBar";
import { ArmourClassBar } from "../../components/bars/ArmourClassBar";
import { AttackBonusBar } from "../../components/bars/AttackBonusBar";

interface MonsterSelectionProps {
  setScreen: (screen: Screens) => void;
}

export const MonsterSelection: React.FC<MonsterSelectionProps> = ({
  setScreen,
}) => {
  const [monsters, setMonsters] = useState<MonsterState[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<MonsterState | null>(
    null
  );

  useEffect(() => {
    // Request the monster list once when component mounts
    socket.emit("request_monster_list");

    // Listen for the monster list from server
    socket.on("monster_list", (monsterList: MonsterState[]) => {
      setMonsters(monsterList);
    });

    return () => {
      socket.off("monster_list");
    };
  }, []);

  useEffect(() => {
    socket.on("kick-warning", ({ message }) => {
      console.log(message);
      FlowRouter.go("/*");
    });

    return () => {
      socket.off("kick-warning");
    };
  }, []);

  const handleSelectMonster = (monster: MonsterState) => {
    setSelectedMonster(monster);
    console.log(selectedMonster?.name)
  };

  const handleConfirmSelection = () => {
    if (selectedMonster) {
      socket.emit("monster_selected", {
        monsterID: selectedMonster.id,
      });

      console.log(`Monster ${selectedMonster.name} selected for player`);
      setScreen(Screens.WAITING_SCREEN);
    }
  };

  return (

    <>
      <GenericHeader color = 'purple'>
        <OutlineText size = 'extraLarge'>
          SELECT YOUR MONSTER
        </OutlineText>
      </GenericHeader>

      <div className="flex flex-col items-center justify-center space-y-10 sm:pt-40 lg:pt-35">
        {monsters.map((monster => (
          <MonsterSelectionCard monster = {monster} type='balanced' onClick={() => handleSelectMonster(monster)}/>
        )))}
      </div>

      {selectedMonster && (
        <div className = {`flex items-center justify-center box-border bg-white/30 fixed left-0 right-0 bottom-0 top-0 flex flex-col backdrop-blur-md z-50  `}>
          <BaseCard 
            color="pictonBlue" 
            className="
            top-[20%]
            sm:h-[95%]
            sm:w-[95%]
            lg:h-[90%]
            lg:x-[80%]
            bg-[#FFE8B1]
            border-[3px]
            border-[#403245]
            rounded-[20px]
            text-center
            w-[60%]
            box-border
            flex
            flex-col">

                  <BaseCard color="goldenRod" className="sm:h-[60%] sm:w-[80%] lg:h-50% lg:w:90% pt-10">
                    <MonsterImage name = {selectedMonster.id} className="
                                                                          sm:w-[20rem] sm:h-[20rem] 
                                                                          lg:w-[15rem] lg:h-[15rem]
                                                                          absolute -top-2"/>
                      <BaseCard color="peach" className="flex flex-col items-center sm:h-[60%] sm:w-[80%] lg:h-[50%] lg:w:[90%]">
                        <div className="w-[95%] text-left">
                        <OutlineText size = 'medium'>Total Health:</OutlineText>
                        <TotalHealthBar totalHealth={selectedMonster.maxHealth} highestTotalHealth={40}/>
                        </div>
                        <div className="w-[95%] text-left">
                        <OutlineText size = 'medium'>Armour Class:</OutlineText>
                        <ArmourClassBar armourClass={selectedMonster.armourClass} highestArmourClass={20}/>
                        </div>
                        <div className="w-[95%] text-left">
                        <OutlineText size = 'medium'>Attack Bonus:</OutlineText>
                        <AttackBonusBar attackBonus={selectedMonster.attackBonus} highestAttackBonus={4}/>
                        </div>
                      </BaseCard>

                    </BaseCard>
                  <div className="flex flex-row space-x-10 pt-10 pb-10">
                    <ButtonGeneric color = 'red' size = 'medium' onClick={() => setSelectedMonster(null)}> 
                        <OutlineText size="large">
                          CANCEL
                        </OutlineText>
                    </ButtonGeneric>
                    <ButtonGeneric color = 'blue' size = 'medium' onClick={() => {handleConfirmSelection}}> 
                        <OutlineText size="large">
                          CONFIRM
                        </OutlineText>
                    </ButtonGeneric>
                  </div>
          </BaseCard>  
        </div>
      )}

    </>

    /**
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Choose Your Monster</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {monsters.map((monster) => (
          <div
            key={monster.id}
            onClick={() => handleSelectMonster(monster)}
            className={`cursor-pointer border rounded-lg p-4 shadow-md hover:shadow-lg transition ${
              selectedMonster?.id === monster.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold">{monster.name}</h3>
          </div>
        ))}
      </div>

      {selectedMonster && (
        <div className="mt-6 p-4 border rounded-lg shadow w-full max-w-md bg-white">
          <h2 className="text-xl font-bold">{selectedMonster.name}</h2>
          <p className="mt-1">{selectedMonster.description}</p>
          <p className="mt-2">HP: {selectedMonster.maxHealth}</p>
          <p>Attack: {selectedMonster.attackBonus}</p>
          <p>Armor Class: {selectedMonster.armourClass}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </button>
        </div>
      )}
    </div>
    */
  );
};
