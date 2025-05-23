import React from "react";

interface MonsterImageProps {
  alt?: string;
  className?: string;
}

const LogoResizable: React.FC<MonsterImageProps> = ({ alt = 'image', className = '' }) => {
  let path: string = 'logo-transparent.png';

  return (
    <img
      src={path}
      alt={alt}
      className={`${className}`}
    />
  );
};

export default LogoResizable;