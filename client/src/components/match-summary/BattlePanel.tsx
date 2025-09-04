import React from 'react';
import PlayerPanel from './PlayerPanel';
import { BattlePhase, BattleState } from '/types/composite/battleState';
import DifferentPhaseImage from './PhaseImage';
import { GameSessionStateMetaData } from '/types/composite/gameSessionState';

interface BattlePanelProps {
  battleState: BattleState;
  battleIndex: number;
  currentPhase: BattlePhase|null;
  metadata: GameSessionStateMetaData
}

const BattlePanel: React.FC<BattlePanelProps> = ({ battleState, battleIndex, currentPhase, metadata }) => {
  const player1State = battleState.yourPlayer;
  const player1Index = 0;
  const player1LeftPlayer = true;
  const player1Id = player1State.id

  const player2State = battleState.opponentPlayer;
  const player2Index = 1;
  const player2LeftPlayer = false;
  const player2Id = player2State.id

  const player1Win = player1State.currentHealth != 0 && player2State.currentHealth == 0;
  const player2Win = player2State.currentHealth != 0 && player1State.currentHealth == 0;

  // console.log("[METADATA]:", metadata)
  let p1Score;
  let p2Score;
  if (metadata.playerScore){
    p1Score = metadata.playerScore[player1Id].points
    p2Score = metadata.playerScore[player2Id].points
  }

  return (
    <div 
      style={{
        borderRadius: '0.75rem',
        // border: '2px solid #006400',
        padding: '1rem 0rem',
        marginBottom: '1rem',
      }}
    >
      
      {/* Display players in this battle */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '0.5rem',
          position: 'relative',
          gap: '0',
          // border: '2px solid',
          width: '100%'
        }}
      >
        <PlayerPanel
          key={player1Index}
          playerState={player1State}
          playerIndex={player1Index}
          isLeftPlayer={player1LeftPlayer}
          winner={player1Win}
          playerScore = {p1Score}
        />

        {/* Use the new DifferentPhaseImage component */}
        <DifferentPhaseImage 
          currentPhase={currentPhase}
          player1Win = {player1Win}
          player2Win = {player2Win}
          isOver={battleState.isOver}
          width="35%"
          height="35%"
          top="70%"
        />

        <PlayerPanel
          key={player2Index}
          playerState={player2State}
          playerIndex={player2Index}
          isLeftPlayer={player2LeftPlayer}
          winner={player2Win}
          playerScore = {p2Score}
        />
      </div>
    
      
    </div>
  );
};

export default BattlePanel;