import React from 'react';
import PlayerPanel from './PlayerPanel';
import { BattlePhase, BattleState } from '/types/composite/battleState';

interface BattlePanelProps {
  battleState: BattleState;
  battleIndex: number;
  currentPhase: BattlePhase|null;
}

const BattlePanel: React.FC<BattlePanelProps> = ({ battleState, battleIndex, currentPhase }) => {
  const player1State = battleState.yourPlayer;
  const player1Index = 0;
  const player1LeftPlayer = true;

  const player2State = battleState.opponentPlayer;
  const player2Index = 1;
  const player2LeftPlayer = false;


  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1',
        borderRadius: '0.75rem',
        border: '2px solid #006400',
        padding: '1rem 0rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        // position: 'relative'
      }}
    >
      <h3 
        style={{
          fontSize: '1.25rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
          margin: '0 0 0.75rem 0',
          textAlign: 'center',
        }}
      >
        Battle {battleIndex + 1} - Turn {battleState.turn}
      </h3>
      
      {/* Display players in this battle */}
        <div 
        style={{
        display: 'flex',
        justifyContent: 'center', // Change to center
        alignItems: 'center',
        marginBottom: '0.5rem',
        position: 'relative',
        gap: '0', // Control the exact gap
        border: '2px solid',
        width: '100%'
        }}
        >

        <PlayerPanel
            key={player1Index}
            playerState={player1State}
            playerIndex={player1Index}
            isLeftPlayer={player1LeftPlayer} // First player is left, second is right
          />

        <PlayerPanel
            key={player2Index}
            playerState={player2State}
            playerIndex={player2Index}
            isLeftPlayer={player2LeftPlayer} // First player is left, second is right
          />
        
      </div>
    
      
    </div>
  );
};

export default BattlePanel;