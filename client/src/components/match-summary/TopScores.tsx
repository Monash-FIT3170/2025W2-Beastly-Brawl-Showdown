import React from 'react';
import './styles.css';
import { BattleState } from '/types/composite/battleState';
import ScoreCard from '../cards/ScoreCard';

interface TopScoresProps {
  battleStates?: BattleState[]|null;
}

const TopScores: React.FC<TopScoresProps> = ({ battleStates }) => {
    
    return (
    <div 
      style={{
        backgroundColor: '#FFE8B1', // Peach/light yellow background
        borderRadius: '1.5rem', // Rounded corners
        border: '4px solid #403245', // Dark border
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Shadow for depth
        padding: '0.75rem 1.5rem',
        width: '260px',
        margin: '1rem 0',
        height: '550px', // Changes height of logpanel
      }}
    >
      <h3 
        style={{
          fontSize: '1.5rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: '100',
          color: '#FFFFFF', // White text
          WebkitTextStroke: '1px black', // Black outline
          textAlign: 'center',
          margin: '0 0 0.75rem 0',
          textTransform: 'uppercase',
          textDecoration: 'underline',
          textUnderlineOffset: '6px',
          textDecorationThickness: '3px',
        }}
      >
        PODIUM
      </h3>
      
      {/* Scrollable log content */}
      <div 
        style={{
          height: 'calc(100% - 3rem)', // Account for header height
          paddingRight: '0.5rem',
        }}
      >
        {/* Top 3 Highest Scores */}
        {/* Prolly map name score and monster to this */}
        
        <ScoreCard playerName="Player 1" monster="CINDER_TAIL" score={10} />
        
        <ScoreCard playerName="Player 2" monster="ROCKY_RHINO" score={5} />
        
        <ScoreCard playerName="Player 3" monster="POISON_POGO" score={0} />

      </div>
    </div>
  );
};

export default TopScores;