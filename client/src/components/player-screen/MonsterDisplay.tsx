import React from "react";
import { MonsterState } from "/types/single/monsterState";
import "./MonsterDisplay.css";

interface MonsterDisplayProps {
  monster: MonsterState;
  className?: string;
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  className,
}) => {
  const imagePath = `/assets/characters/${monster.id}.png`;

  return (
    <div className={`monster-display-container ${className ?? ""}`}>
      <div className="monster-image-wrapper">
        <img
          src={imagePath}
          alt={monster.name}
          className="monster-image"
          draggable={false}
        />
        <img
          className="monster-shadow"
          src="/shadow.png"
          alt="shadow"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default MonsterDisplay;
