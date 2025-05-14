import React from 'react'
interface MonsterImageProps {
  name: string;
}

export const MonsterImage = ({ name }: MonsterImageProps) => {
  const monsterToPath: { [key: string]: string } = {
    monster1: 'monster1.png',
    monster2: 'monster2.png',
    monster3: 'monster3.png',
  };

  return (
    <img src={monsterToPath[name]} alt={`${name} image`} />
  );
};