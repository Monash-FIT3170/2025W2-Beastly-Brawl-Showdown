import React from 'react';
import './styles.css';
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";
import ScoreCard from '../cards/ScoreCard';

interface TopScoresProps {
  metadata?: GameSessionStateMetaData|null;
}

const TopScores: React.FC<TopScoresProps> = ({ metadata }) => {
  const top3 = metadata.top3Score
    
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
      <div style={{ height: 'calc(100% - 3rem)', paddingRight: '0.5rem' }}>
        {/* render only if present */}
        {top3[0] && (
          <ScoreCard
            playerName={top3[0].name}
            monster={top3[0].playerMonster}
            score={top3[0].points}
          />
        )}
        {top3[1] && (
          <ScoreCard
            playerName={top3[1].name}
            monster={top3[1].playerMonster}
            score={top3[1].points}
          />
        )}
        {top3[2] && (
          <ScoreCard
            playerName={top3[2].name}
            monster={top3[2].playerMonster}
            score={top3[2].points}
          />
        )}
      </div>

    </div>
  );
};

export default TopScores;