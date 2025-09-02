import React from 'react';
import TopScores from './TopScores';
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";

interface ScoringLeaderboardProps {
  metadata?: GameSessionStateMetaData[]|null;
}

const ScoringLeaderboard: React.FC<ScoringLeaderboardProps> = ({ metadata }) => {
  console.log("[TOP3SCORES]:", metadata)
  
  return (
    <div 
      className = "flex flex-col gap-[1rem] h-full overflow-auto"
    >
      {/* Round Summary Panel */}
      <div
        className="match-stats-header"
        style={{
          backgroundColor: '#EFB056',
          padding: '0.75rem 1.5rem',
          textAlign: 'center',
          borderRadius: '2rem',
          border: '4px solid #403245', // Dark border
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          display: 'inline-block',
          margin: '1rem auto',
          width: '260px'
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '2rem',
            fontWeight: '20000',
            letterSpacing: '-0.1rem',
            WebkitTextStroke: '2px black',
            fontFamily: '"Jua", sans-serif',
          }}
        >
          TOP SCORES
        </span>
      </div>
    
          {/* Log Panel */}
          <TopScores metadata={metadata} />
 
    </div>
  );
};

export default ScoringLeaderboard;