import React from "react";

interface MonsterImageProps {
  className?: string;
}

const LogoResizable: React.FC<MonsterImageProps> = ({ className = '' }) => {
  const path = `/${"logo-transparent".replace(/\s+/g, '')}.png`;

  return (
    <img
      src={path}
      className={`${className}`}
    />
  );
};

export default LogoResizable;