import React, { useState } from 'react';
import { HealthBar } from '../../components/player-screen/health-bar/HealthBar.tsx';
import { BattleControls } from '../../components/buttons/BattleControls.tsx';

export const PlayerScreen = () => {
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <div>
          <h2>Player 1</h2>
          <HealthBar current={player1Health} max={100} />
          <button onClick={() => setPlayer1Health(h => Math.max(0, h - 10))}>Take Damage</button>
          <button onClick={() => setPlayer1Health(h => Math.min(100, h + 10))} style={{ marginLeft: '1rem' }}>Heal</button>
        </div>

        <div>
          <h2>Player 2</h2>
          <HealthBar current={player2Health} max={100} />
          <button onClick={() => setPlayer2Health(h => Math.max(0, h - 10))}>Take Damage</button>
          <button onClick={() => setPlayer2Health(h => Math.min(100, h + 10))} style={{ marginLeft: '1rem' }}>Heal</button>
        </div>
      </div>

      <BattleControls />
    </div>
  );
};