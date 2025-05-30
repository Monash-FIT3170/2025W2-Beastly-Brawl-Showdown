import React from 'react';

interface MonsterImageProps {
  name: string;
  className?: string;
}

export const MonsterImage = ({ name, className }: MonsterImageProps) => {
  return (
    <img src={`/assets/characters/${name}.png`} alt={`${name} image`} className={className} />
  );
};