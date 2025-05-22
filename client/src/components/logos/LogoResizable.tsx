import React from 'react';

interface MonsterImageProps {
  width: number;
  height: number;
}

export const LogoResizable = ({ width, height }: MonsterImageProps) => {
   
    let path: string = 'logo-transparent.png';

    return (
        <img 
        style={{width: `${width}rem`, height: `${height}rem`}}
        src={path} 
        alt={`${name} image`} 
        />
    );
};