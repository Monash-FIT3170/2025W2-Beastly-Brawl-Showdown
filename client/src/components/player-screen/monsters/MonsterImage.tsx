import React from 'react';

interface MonsterImageProps {
  name: string;
  className?: string;
}

export const MonsterImage = ({ name, className }: MonsterImageProps) => {
  return (
    <img src={`/${name}.png`} alt={`${name} image`} className={className} />
  );
};