import React from 'react';

import { OutlineText } from '../texts/OutlineText';
import { MonsterImageResizable } from '../player-screen/monsters/MonsterImageResizable';

interface ScoreCardProps {
    playerName: string;
    monster: string;
    score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ playerName, monster, score }) => (
    <div className="flex flex-col rounded-lg p-4 m-2 items-center w-full font-jua">
        <OutlineText size='medium'>
            {playerName}
        </OutlineText>
        <div className='flex flex-row items-center justify-around w-full'>
            <div className="my-2">
                <MonsterImageResizable
                    name={monster}
                    width={4}
                    height={4}
                />
            </div>
            <div className={`
              sm:w-[1rem] md:w-[1.5rem] lg:w-[2rem] xl:w-[2.5rem] 2xl:w-[3rem]
              sm:h-[1rem] md:h-[1.5rem] lg:h-[2rem] xl:h-[2.5rem] 2xl:h-[3rem]
              rounded-full
              bg-[#FFE07C]
              sm:outline-[0.125rem] md:outline-[0.15rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
              outline-blackCurrant
              text-white
              flex
              items-center
              justify-center
              overflow-hidden
            `}>
                <OutlineText size='small'>
                    {score}
                </OutlineText>          
            </div>
        </div>
    </div>
);

export default ScoreCard;
