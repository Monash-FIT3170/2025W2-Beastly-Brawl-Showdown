import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const DemoButtonOrange: React.FC<ButtonProps> = ({ onClick = () => console.log('Clicked'), disabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 m-1 rounded-[8px] border-[3px] border-darkpurple
        font-jua text-whiteish transition 
        bg-lightorange hover:bg-maybeyellow active:bg-lightorange active:border-[4px] active:m-0.75
        disabled:bg-lightgrey disabled:cursor-not-allowed
      `}
    >
      Button
    </button>
  );
};

export default DemoButtonOrange;