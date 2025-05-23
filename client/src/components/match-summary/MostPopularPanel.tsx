import React from 'react';
import { MostChosenMonsterResult } from '/types/other/gameSessionData';
import './styles.css';

interface MostPopularPanelProps {
  popularMonster: MostChosenMonsterResult;
}

const MostPopularPanel: React.FC<MostPopularPanelProps> = ({ popularMonster }) => {

  const formattedName = popularMonster.monster!.id;
  const imageSrc = `/assets/characters/${formattedName}.png`;
  console.log("image src = ",imageSrc)

  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1',
        borderRadius: '1.5rem',
        border: '4px solid #403245',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        padding: '0.75rem 1.5rem',
        width: '260px',
        margin: '1rem auto',
        textAlign: 'center',
      }}
    >
      <img 
        src={imageSrc} 
        alt={formattedName} 
        style={{ 
          width: '100px', 
          height: '100px', 
          objectFit: 'contain',
          marginBottom: '0.5rem' 
        }} 
      />

      <div
        style={{
          fontSize: '1.5rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: '100',
          color: '#FFFFFF',
          WebkitTextStroke: '1px black',
          marginBottom: '0.25rem',
          textTransform: 'uppercase'
        }}
      >
        {popularMonster.monster!.name}
      </div>

      <div
        style={{
          fontSize: '1.25rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: '100',
          color: '#FFFFFF',
          WebkitTextStroke: '1px black',
        }}
      >
        {popularMonster.percentagePick}% Pick Rate
      </div>
    </div>
  );
};

export default MostPopularPanel;
