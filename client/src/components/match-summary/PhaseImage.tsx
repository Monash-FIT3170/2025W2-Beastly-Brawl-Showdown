import React from 'react';
import { BattlePhase } from '/types/composite/battleState';

interface PhaseImageProps {
  currentPhase: BattlePhase | null;
  width?: string;
  height?: string;
  top?: string;
}

const PhaseImage: React.FC<PhaseImageProps> = ({ 
  currentPhase, 
  width = '35%', 
  height = '35%',
  top = '70%'
}) => {
  // You can customize the image source based on the current phase
  const getImageSrc = () => {
    switch (currentPhase) {
      case 'CHOOSE_ACTION':
        return '/match-summary-assets/SWORDS_CROSSED.png';
      case 'EXECUTE_ACTION':
        return '/match-summary-assets/SMOKE.png';
      default:
        return '/match-summary-assets/SWORDS_CROSSED.png'; // Default image
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: top,
        transform: 'translate(-50%, -50%)',
        zIndex: 10, // Higher than PlayerPanel elements
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={getImageSrc()}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
};

export default PhaseImage;