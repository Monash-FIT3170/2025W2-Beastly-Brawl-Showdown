import React from 'react';
import RoundNumberHeader from './RoundNumberHeader';
import LeftPanel from './LeftPanel';

interface MatchSummaryPanelProps {
  // Round information
  roundNumber?: number;
  remainingPlayers?: number;
  totalPlayers?: number;
  
  // Left panel data
  damageData?: Array<{ playerName: string; damageAmount: number }>;
  blockData?: Array<{ playerName: string; blocksAmount: number }>;
  popularPokemon?: {
    name: string;
    pickRate: number;
    imageSrc: string;
  };
}

const MatchSummaryPanel: React.FC<MatchSummaryPanelProps> = ({ 
      // Default values for props
      roundNumber = 2,
      remainingPlayers = 6,
      totalPlayers = 16,

       // Left panel data with defaults
      damageData = [
        { playerName: 'CAMERON', damageAmount: 15 },
        { playerName: 'ANIKA', damageAmount: 12 },
        { playerName: 'DEVAN', damageAmount: 11 }
      ],
      blockData = [
        { playerName: 'DANIEL', blocksAmount: 3 },
        { playerName: 'LUNA', blocksAmount: 2 },
        { playerName: 'RIO', blocksAmount: 1 }
      ],
      popularPokemon = {
        name: 'SPARKING MOUSE',
        pickRate: 42,
        imageSrc: 'match-summary-assets/Attacker.png'
      }
 }) => {
  return (
    <div 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        padding: '1rem',
        margin: '0', // no margin because we'll control spacing by inset
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        bottom: '1rem',
        overflow: 'auto',
      }}
    >   

    <RoundNumberHeader roundNumber={roundNumber} />

    {/* Only the Left Panel */}
      <div style={{ maxWidth: '320px', width: '100%', marginTop: '1rem' }}>
        <LeftPanel 
          totalPlayers={totalPlayers}
          damageData={damageData}
          blockData={blockData}
          popularPokemon={popularPokemon}
        />
      </div>

    </div>
  );
};


export default MatchSummaryPanel;