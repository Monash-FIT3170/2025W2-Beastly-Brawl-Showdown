import React from 'react';

interface BackgroundProps {
  children?: React.ReactNode;
}


const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div 
      style={{
        backgroundImage: `url("match-summary-assets/forest.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        minHeight: '100vh',   // Ensure div fills screen height
        width: '100vw',
        position: 'relative'  // Important for absolute positioning of children
      }}
    >
      {children}
    </div>
  );
};


export default Background;
