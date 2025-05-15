import React from 'react';

interface MonsterImageProps {
  name: string;
}

export const MonsterImage2 = ({ name }: MonsterImageProps) => {

    let path: string = name.replace(/\s+/g, '');
    path = path+'.png';

    return (
        <img src={path} alt={`${name} image`} />
    );
};