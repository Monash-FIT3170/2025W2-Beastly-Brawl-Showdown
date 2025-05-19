import React, { useState } from 'react';

interface DefendButtonTempProps {
  label: string;
  initialCount: number;
}

export const DefendButtonTemp: React.FC<DefendButtonTempProps> = ({ label, initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const isDisabled = count <= 0;
  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`
		w-normalButtonWidth
		h-normalButtonHeight
		bg-pictonBlue
		text-white 
		font-[Jua] 
		text-2xl 
		px-6 
		py-3 
		rounded-xl 
		border-[4px] border-darkpurple
		border-4 border-[#403245] 
		shadow-lg transition-colors 
		duration-200
        ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500'}`}
      >
        {label}
      </button>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#FFE07C] border-4 border-[#403245] rounded-full w-10 h-10 flex items-center justify-center text-[#403245] font-jua text-lg">
        {count}
      </div>
    </div>
  );
};
