import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { Screens } from "../../screens";
import { MonsterIdentifier } from "../../../../types/single/monsterState";

interface MonsterSelectionProps {
  setScreen: (screen: Screens) => void;
}

export interface FrontendMonster {
  id: MonsterIdentifier;
  name: string;
  hp: number;
  attack: number;
  description: string;
  armourClass: number;
}

const monsterList: FrontendMonster[] = [
  {
    id: MonsterIdentifier.STONEHIDE_GUARDIAN,
    name: "Stonehide Guardian",
    hp: 120,
    attack: 10,
    armourClass: 18,
    description: "A sturdy tank with powerful defense.",
  },
  {
    id: MonsterIdentifier.SHADOWFANG_PREDATOR,
    name: "Shadowfang Predator",
    hp: 90,
    attack: 15,
    armourClass: 14,
    description: "A stealthy striker with high damage.",
  },
  {
    id: MonsterIdentifier.MYSTIC_WYVERN,
    name: "Mystic Wyvern",
    hp: 100,
    attack: 12,
    armourClass: 16,
    description: "A balanced attacker with magical prowess.",
  },
];

export const MonsterSelection: React.FC<MonsterSelectionProps> = ({
  setScreen,
}) => {
  const [monsters, setMonsters] = useState<FrontendMonster[]>([]);
  const [selectedMonster, setSelectedMonster] =
    useState<FrontendMonster | null>(null);

  useEffect(() => {
    setMonsters(monsterList);

    // Listen for the "kick-warning" event from the server
    socket.on("kick-warning", ({ message }) => {
      console.log(message);
      FlowRouter.go("/*");
    });

    // Cleanup to avoid duplicate listeners
    return () => {
      socket.off("kick-warning");
    };
  }, []);

  const handleSelectMonster = (monster: FrontendMonster) => {
    setSelectedMonster(monster);
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
          <p className="mt-2">HP: {selectedMonster.hp}</p>
          <p>Attack: {selectedMonster.attack}</p>
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
  );
};
