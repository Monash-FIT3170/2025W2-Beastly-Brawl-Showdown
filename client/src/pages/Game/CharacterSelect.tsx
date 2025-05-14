import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { Monster } from "../../../../server/src/model/game/monster/monster"; // Assuming you have a base Monster class
import { StonehideGuardian } from "../../../../server/src/model/game/monster/stonehideGuardian"; // Your specific monster class
import { BattleState } from "/types/composite/battleState";

interface CharacterSelectProps {
  battleId: string | null;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ battleId }) => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  useEffect(() => {
    // Initialize monster instances using your classes
    const availableMonsters: Monster[] = [
      new StonehideGuardian(),
      // new ShadowfangPredator(),
      // new MysticWyvern(),
    ];

    setMonsters(availableMonsters); // Set available monsters
  }, []);

  const handleSelectMonster = (monster: Monster) => {
    setSelectedMonster(monster);
  };

  const handleConfirmSelection = () => {
    if (battleId && selectedMonster) {
      // Emit the monster selection event with selected monster details
      socket.emit("monster_selected", {
        battleId,
        playerId: socket.id,
        monsterId: selectedMonster.getId(), // Pass the monster ID
      });

      // Navigate to the next screen or update the UI
      console.log(`Monster ${selectedMonster.getName()} selected for player`);
    }
  };

  return (
    <div>
      <h1>Select Your Character</h1>

      <div className="monster-selection">
        {monsters.map((monster) => (
          <div
            key={monster.getId()}
            className={`monster-card ${
              selectedMonster?.getId() === monster.getId() ? "selected" : ""
            }`}
            onClick={() => handleSelectMonster(monster)}
          >
            <h2>{monster.getName()}</h2>
            <p>{monster.getDescription()}</p>
            <p>Health: {monster.getMaxHealth()}</p>
            <p>Attack Bonus: {monster.getAttackBonus()}</p>
            <p>Armor Class: {monster.getArmourClass()}</p>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleConfirmSelection} disabled={!selectedMonster}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default CharacterSelect;
