import React, { useState, useEffect } from "react";
import socket from "../../socket";
import "./CharacterSelect.css"; // We'll define styles here

export interface FrontendMonster {
  id: string;
  name: string;
  type: string;
  hp: number;
  attack: number;
  description: string;
  armourClass: number;
}

export const monsterList: FrontendMonster[] = [
  {
    id: "stonehide",
    name: "Stonehide Guardian",
    type: "Earth",
    hp: 120,
    attack: 10,
    armourClass: 18,
    description: "A sturdy tank with powerful defense.",
  },
  {
    id: "shadowfang",
    name: "Shadowfang Predator",
    type: "Dark",
    hp: 90,
    attack: 15,
    armourClass: 14,
    description: "A stealthy striker with high damage.",
  },
  {
    id: "mysticwyvern",
    name: "Mystic Wyvern",
    type: "Air",
    hp: 100,
    attack: 12,
    armourClass: 16,
    description: "A balanced attacker with magical prowess.",
  },
  // Add more here as needed
];

interface CharacterSelectProps {
  battleId: string | null;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ battleId }) => {
  const [monsters, setMonsters] = useState<FrontendMonster[]>([]);
  const [selectedMonster, setSelectedMonster] =
    useState<FrontendMonster | null>(null);

  useEffect(() => {
    setMonsters(monsterList);
  }, []);

  const handleSelectMonster = (monster: FrontendMonster) => {
    setSelectedMonster(monster);
  };

  const handleConfirmSelection = () => {
    if (battleId && selectedMonster) {
      socket.emit("monster_selected", {
        battleId,
        monsterState: selectedMonster,
      });

      console.log(`Monster ${selectedMonster.name} selected for player`);
    }
  };

  return (
    <div className="character-select-container">
      <h1 className="title">Choose Your Monster</h1>

      <div className="monster-grid">
        {monsters.map((monster) => (
          <div
            key={monster.id}
            className={`monster-square ${
              selectedMonster?.id === monster.id ? "selected" : ""
            }`}
            onClick={() => handleSelectMonster(monster)}
          >
            <h3>{monster.name}</h3>
            <p>{monster.type}</p>
          </div>
        ))}
      </div>

      {selectedMonster && (
        <div className="monster-details">
          <h2>{selectedMonster.name}</h2>
          <p>{selectedMonster.description}</p>
          <p>HP: {selectedMonster.hp}</p>
          <p>Attack: {selectedMonster.attack}</p>
          <p>Armor Class: {selectedMonster.armourClass}</p>
          <button onClick={handleConfirmSelection}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default CharacterSelect;
