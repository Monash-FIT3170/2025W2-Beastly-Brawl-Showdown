import React from 'react';

type ActionButtonProps = {
  label: string;
  onClick: () => void;
};
const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};
export default ActionButton;
