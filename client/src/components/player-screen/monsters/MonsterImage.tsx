import React from 'react';

interface MonsterImageProps {
  name: string;
}

export const MonsterImage = ({ name }: MonsterImageProps) => {
  const monsterToPath: { [key: string]: string } = {
    monster1: 'MysticWyvern.png',
    monster2: 'ShadowFangPredator.png',
    monster3: 'StonehideGuardian.png',
  };

  return (
    <img src={monsterToPath[name]} alt={`${name} image`} />
  );
};