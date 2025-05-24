import React, { useState } from 'react';
import { ButtonGeneric } from './ButtonGeneric';
import { OutlineText } from '../texts/OutlineText';

interface DefendButtonProps {
  initialCount: number;
}

export const DefendButton: React.FC<DefendButtonProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };
  
  const isDisabled = count <= 0;

  return(
    <div className="relative inline-block">
      <ButtonGeneric color = 'blue' size = 'battle' onClick={handleClick} isDisabled = {isDisabled}>
        <div className='w-full justify-center'>
          <OutlineText size = 'large'>
            DEFEND
          </OutlineText>
          </div>
      </ButtonGeneric>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFE07C] border-4 border-[#403245] rounded-full w-10 h-10 flex items-center justify-center text-[#403245] font-jua text-lg">
        {count}
      </div>
    </div>
  );
};
