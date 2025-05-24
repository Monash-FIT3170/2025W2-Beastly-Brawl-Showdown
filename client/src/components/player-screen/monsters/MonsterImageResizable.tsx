import React from 'react';

interface MonsterImageProps {
  name: string;
  width: number;
  height: number;
}

export const MonsterImageResizable = ({ name, width, height }: MonsterImageProps) => {

    const path = `/${name.replace(/\s+/g, '')}.png`;

    return (
        <img 
        style={{width: `${width}rem`, height: `${height}rem`}}
        src={path} 
        alt={`${name} image`} 
        />
    );
};