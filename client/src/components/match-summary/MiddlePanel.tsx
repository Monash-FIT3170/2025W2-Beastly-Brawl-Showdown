import React from 'react';
import BattlePanel from './BattlePanel';
import { GameSessionState } from '/types/composite/gameSessionState';

interface MiddlePanelProps {
  gameSession?: GameSessionState | null;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ gameSession }) => {
  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        border: '2px solid',
        position: 'relative'
      }}
    >
      <h2 
        style={{
          fontSize: '1.5rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
          textAlign: 'center',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
        }}
      >
        Battle Arena
      </h2>
      
      {/* Display battle states data */}
      {gameSession.battleStates && (
        
        <div className='all-battle-panels-holder'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Two equal columns
            gap: '1rem', // Space between battles
            alignItems: 'start', // Align battles to the top of their grid cells
            width: '100%',
            border: '2px solid'
          }}
        >
          {gameSession.battleStates.map((battleState, index) => (
            <div className='individual-battle-panel-holder'
              key={battleState.id || index}
              style={{
                border: '2px dotted #006400',
                padding: '0.5rem',
                // position: 'absolute',
                width: '100%'
              }}
            >
              <BattlePanel 
                battleState={battleState}       // This is passed as a prop
                battleIndex={index} 
                currentPhase={gameSession.currentPhase}            // This is passed as a prop. Represents the battle number
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiddlePanel;