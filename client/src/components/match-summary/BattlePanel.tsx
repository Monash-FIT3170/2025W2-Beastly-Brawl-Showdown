import React from 'react';

// Define the battle interface based on your MultipleBattleState structure
interface BattleData {
  battleId: string;
  turn: number;
  players: Array<{
    playerState: {
      name: string;
      currentAttackStat?: number;
      // Add other player state properties as needed
    };
  }>;
  isOver: boolean;
}

interface BattlePanelProps {
  battle: BattleData;
  battleIndex: number;
}

const BattlePanel: React.FC<BattlePanelProps> = ({ battle, battleIndex }) => {
  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1',
        borderRadius: '0.75rem',
        border: '2px solid #403245',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
        Battle {battleIndex + 1} - Turn {battle.turn}
      </h3>
      
      {/* Display players in this battle */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          position: 'relative',
        }}
      >
        {battle.players.map((playerData, playerIndex) => (
          <div 
            key={playerIndex}
            style={{
              backgroundColor: battle.isOver ? '#DAD9D7' : '#7EED55',
              borderRadius: '0.5rem',
              border: '2px solid #403245',
              padding: '0.5rem 1rem',
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            <div 
              style={{
                fontSize: '1rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: 'bold',
                color: '#403245',
                marginBottom: '0.25rem',
              }}
            >
              {playerData.playerState.name}
            </div>
            <div 
              style={{
                fontSize: '0.875rem',
                fontFamily: 'Jua, sans-serif',
                color: '#403245',
              }}
            >
              HP: {playerData.playerState.currentAttackStat || 'N/A'}
            </div>
          </div>
        ))}
        
        {/* VS indicator between players */}
        {battle.players.length >= 2 && (
          <div 
            style={{
              fontSize: '1.5rem',
              fontFamily: 'Jua, sans-serif',
              fontWeight: 'bold',
              color: '#403245',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            VS
          </div>
        )}
      </div>
      
      {/* Battle status */}
      <div 
        style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          fontFamily: 'Jua, sans-serif',
          color: '#403245',
          fontStyle: 'italic',
        }}
      >
        {battle.isOver ? 'Battle Complete' : 'Battle In Progress'}
      </div>
      
      {/* Debug: Show raw battle data */}
      <details style={{ marginTop: '0.5rem' }}>
        <summary 
          style={{
            fontSize: '0.75rem',
            color: '#666',
            cursor: 'pointer',
          }}
        >
          Debug: Raw Battle Data
        </summary>
        <pre 
          style={{
            fontSize: '0.625rem',
            backgroundColor: '#f5f5f5',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            overflow: 'auto',
            maxHeight: '150px',
          }}
        >
          {JSON.stringify(battle, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default BattlePanel;