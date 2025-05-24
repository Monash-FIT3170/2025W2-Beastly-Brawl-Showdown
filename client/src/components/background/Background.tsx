import React from 'react';

interface BackgroundProps {
  children?: React.ReactNode;
}


const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div 
      style={{
        backgroundImage: `url("/match-summary-assets/forest.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        height: '100vh',        // Change from minHeight to height
        width: '100vw',
        position: 'fixed',      // Change from relative to fixed
        top: 0,                 // Add these
        left: 0,                // Add these
        margin: 0,              // Add these
        padding: 0,             // Add these
      }}
    >
      {children}
    </div>
  );
};


export default Background;
