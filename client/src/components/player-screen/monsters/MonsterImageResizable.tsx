import React from 'react';

interface MonsterImageProps {
  name: string;
  width: number;
  height: number;
}

export const MonsterImageResizable = ({ name, width, height }: MonsterImageProps) => {

    let path: string = name.replace(/\s+/g, '');
    path = path+'.png';

    return (
        <img 
        style={{width: `${width}rem`, height: `${height}rem`}}
        src={path} 
        alt={`${name} image`} 
        />
    );
};