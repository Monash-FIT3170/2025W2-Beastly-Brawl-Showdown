import React from 'react';
import './Monster.css';

interface MonsterProps {
  name: string;
  image: string;
  side: 'left' | 'right';
}

export const Monster = ({ name, image, side }: MonsterProps) => {
  return (
    <div className={`monster-container ${side}`}>
      <img src={image} alt={name} className="monster-sprite" />
    </div>
  );
};