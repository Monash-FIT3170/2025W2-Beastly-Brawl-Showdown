import React from 'react';
import { BattleState } from '/types/composite/battleState';
import BattlePanel from './BattlePanel';

interface MiddlePanelProps {
  battleStates?: BattleState[]|null;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ battleStates }) => {
  return (
    <div 
      style={{
        padding: '1rem',
        width: '100%',
        height: '100%',
        overflow: 'auto',
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
      {battleStates ? (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Two equal columns
            gap: '1rem', // Space between battles
            alignItems: 'start', // Align battles to the top of their grid cells
          }}
        >
          {battleStates.map((battleState, index) => (
            <BattlePanel 
                key={battleState.id|| index}  // Used by React for list rendering, not passed as a prop
                battleState={battleState}                 // This is passed as a prop
                battleIndex={index}            // This is passed as a prop. Represents the battle number
            />
          ))}
        </div>
      ) : (
        <div 
          style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            fontFamily: 'Jua, sans-serif',
            color: '#666',
            padding: '2rem',
          }}
        >
          Waiting for battle data...
        </div>
      )}
    </div>
  );
};

export default MiddlePanel;