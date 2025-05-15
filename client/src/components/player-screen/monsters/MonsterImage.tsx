import React from 'react';

interface MonsterImageProps {
  name: string;
}

export const MonsterImage = ({ name }: MonsterImageProps) => {
  return (
    <img src={`${name}.png`} alt={`${name} image`} />
  );
};