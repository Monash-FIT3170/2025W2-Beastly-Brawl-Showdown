import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { Screens } from "../../screens";
import {
  ArchetypeIdentifier,
  MonsterIdentifier,
  MonsterState,
} from "../../../../types/single/monsterState";
import {
  ActionIdentifier,
  ActionState,
} from "../../../../types/single/actionState";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { MonsterSelectionCard } from "../../components/cards/MonsterSelectionCard";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { MonsterImage } from "../../components/player-screen/monsters/MonsterImage";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { TotalHealthBar } from "../../components/bars/TotalHealthBar";
import { ArmourClassBar } from "../../components/bars/ArmourClassBar";
import { AttackBonusBar } from "../../components/bars/AttackBonusBar";
import { BlackText } from "../../components/texts/BlackText";
import { PopupClean } from "../../components/popups/PopupClean";

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
  const [abilities, setAbilities] = useState<ActionState[]>([]);
  const [exitPopup, setExitPopup] = useState<Boolean>();

  const colorLoader: Record<string, string> = {
    [ArchetypeIdentifier.ATTACKER]: "bg-[#DC7466]",
    [ArchetypeIdentifier.DEFENDER]: "bg-[#7EACD5]",
    [ArchetypeIdentifier.BALANCED]: "bg-[#9DD786]",
  };

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
      //UPDATE: ADD POP-UP "You've been disconnected from game session."
      console.log(message);
      setExitPopup(true);
    });

    return () => {
      socket.off("kick-warning");
    };
  }, []);

  const handleSelectMonster = (monster: MonsterState) => {
    setSelectedMonster(monster);
    console.log(selectedMonster?.name);

    for (const action of monster.possibleActions) {
      if (
        action.id !== ActionIdentifier.ATTACK &&
        action.id !== ActionIdentifier.DEFEND
      ) {
        setAbilities((prevAbilities) => [...prevAbilities, action]);
      }
    }
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

  const handleCancelSelection = () => {
    setSelectedMonster(null);
    setAbilities([]);
  };

  const sendHome = () => {
    FlowRouter.go("/");
  };

  return (
    <div>
      <GenericHeader color="purple">
        <OutlineText size="extraLarge">SELECT YOUR MONSTER</OutlineText>
      </GenericHeader>

      {/* Popup */}
      {exitPopup && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">
              YOU HAVE BEEN REMOVED FROM THE GAME SESSION.
            </OutlineText>
            <div className="mt-10 flex flex-col items-center">
              <ButtonGeneric
                size="large"
                color="red"
                onClick={() => sendHome()}
              >
                EXIT
              </ButtonGeneric>
            </div>
          </div>
        </PopupClean>
      )}

      <div className="flex flex-col items-center justify-center space-y-10 sm:pt-40 lg:pt-35">
        {monsters.map((monster) => (
          <MonsterSelectionCard
            key={monster.id}
            monster={monster}
            type= {monster.archetypeId}
            onClick={() => handleSelectMonster(monster)}
          />
        ))}
      </div>

      {selectedMonster && (
        <div
          className={`flex items-center justify-center box-border bg-white/30 fixed left-0 right-0 bottom-0 top-0 flex flex-col backdrop-blur-md z-50 overflow-y-scroll `}
        >
          {/* Popup */}
          {exitPopup && (
            <PopupClean>
              <div className="flex flex-col justify-around">
                <OutlineText size="extraLarge">
                  YOU HAVE BEEN REMOVED FROM THE GAME SESSION.
                </OutlineText>
                <div className="mt-10 flex flex-col items-center">
                  <ButtonGeneric
                    size="large"
                    color="red"
                    onClick={() => sendHome()}
                  >
                    EXIT
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          )}
          <div
            className={`flex  
            justify-around border-[4px] 
            border-blackCurrant w-min h-min rounded-xl
            ${colorLoader[selectedMonster.id]}
            top-[20%]
            sm:h-min
            sm:w-[95dvw]
            lg:h-min
            lg:w-[90dvw]
            border-[3px]
            border-[#403245]
            rounded-[20px]
            w-[60%]
            box-border
            flex
            flex-col
            items-center`}
          >
            <div className="pt-[2dvh]" />
            <BaseCard
              color="goldenRod"
              className="flex flex-col justify-around sm:w-[80dvw] lg:w:[90dvw] h-min"
            >
              <MonsterImage
                name={selectedMonster.id}
                className="sm:size-[30dvw]
                            lg:size-[10dvw]"
              />
              <div className="w-[100%] flex items-center flex-col">
                <div className="bg-ronchi border-[4px] rounded-tl-xl rounded-tr-xl border-b-0 border-blackCurrant w-min text-nowrap">
                  <OutlineText size="medium">
                    {selectedMonster.name}
                  </OutlineText>
                </div>
                <BaseCard
                  color="peach"
                  className="flex flex-col items-center sm:h-min sm:w-[90%] lg:h-min lg:w:[90%]"
                >
                  <div className="pt-[1pt]" />
                  <div className="w-[95%] text-left">
                    <OutlineText size="medium">Total Health:</OutlineText>
                    <TotalHealthBar
                      totalHealth={selectedMonster.maxHealth}
                      highestTotalHealth={40}
                    />
                  </div>
                  <div className="w-[95%] text-left">
                    <OutlineText size="medium">Armour Class:</OutlineText>
                    <ArmourClassBar
                      armourClass={selectedMonster.armourClass}
                      highestArmourClass={20}
                    />
                  </div>
                  <div className="w-[95%] text-left">
                    <OutlineText size="medium">Attack Bonus:</OutlineText>
                    <AttackBonusBar
                      attackBonus={selectedMonster.attackBonus}
                      highestAttackBonus={10}
                    />
                  </div>
                  <div className="pb-[7pt]" />
                </BaseCard>
              </div>

              <div className="flex flex-col items-center justify-start">
                <p className="text-outline font-[Jua] sm:text-[4rem] md:text-[2rem] lg:text[2rem]">
                  SPECIAL ABILITIES
                </p>
                <div className="flex flex-col justify-center lg:flex-row w-full">
                  {abilities.map((ability, idx) => (
                    <div
                      key={ability.id || idx}
                      className="flex flex-row items-center grow-1 justify-left"
                    >
                      <img
                        src="/assets/logo/logo.png"
                        alt="ability icon"
                        className="w-[7rem] h-[7rem]"
                      />
                      <div>
                        <p className="text-outline font-[Jua] sm:text-[4rem] md:text-[2rem] lg:text[2rem]">
                          {ability.name}
                        </p>
                        {/**<BlackText size="medium">{ability.description}</BlackText>*/}
                        <p className="text-black font-[Jua] sm:text-[2rem] md:text[1rem] lg:text[0.5rem] text-ellipses">
                          {ability.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BaseCard>

            <div className="flex flex-row space-x-10 justify-around pt-[2dvh] pb-[2dvh]">
              <ButtonGeneric
                color="red"
                size="medium"
                onClick={() => {
                  handleCancelSelection();
                }}
              >
                <OutlineText size="medium">CANCEL</OutlineText>
              </ButtonGeneric>
              <ButtonGeneric
                color="blue"
                size="medium"
                onClick={() => {
                  handleConfirmSelection();
                }}
              >
                <OutlineText size="medium">CONFIRM</OutlineText>
              </ButtonGeneric>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
