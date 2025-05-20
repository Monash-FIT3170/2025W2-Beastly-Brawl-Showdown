import React from 'react';



const GameBackground = () => {
  return (
    <div 
      style={{
        backgroundImage: `url("match-summary-assets/forest.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        minHeight: '100vh',   // Ensure div fills screen height
        width: '100vw', 
      }}
    />
  );
};

export default GameBackground;
