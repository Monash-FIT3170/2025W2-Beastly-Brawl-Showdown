import React, { useState } from 'react';
import { HealthBar } from '../../components/player-screen/health-bar/HealthBar.tsx';
import { BattleControls } from '../../components/buttons/BattleControls.tsx';
import { Monster } from '../../components/player-screen/monsters/Monster.tsx';

export const PlayerScreen = () => {
  const maxHealth = 20;
  const [player1Health, setPlayer1Health] = useState(maxHealth);
  const [player2Health, setPlayer2Health] = useState(maxHealth);

  return (
    <div className="monsters-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <div>
          <HealthBar current={player1Health} max={maxHealth} />
          <h3>GOLDEN WOLFLORD</h3>
          <h3>JOHN BATTLE</h3>
          <button onClick={() => setPlayer1Health(h => Math.max(0, h - 1))}>Take Damage</button>
          <button onClick={() => setPlayer1Health(h => Math.min(maxHealth, h + 1))} style={{ marginLeft: '1rem' }}>Heal</button>
          <Monster name="GOLDEN WOLFLORD" image="/assets/monsters/golden_wolflord.png" side="left" />
        </div>

        <div>
          <HealthBar current={player2Health} max={maxHealth} />
          <h3>PINK BEAN</h3>
          <h3>JACK DANIELS</h3>
          <button onClick={() => setPlayer2Health(h => Math.max(0, h - 1))}>Take Damage</button>
          <button onClick={() => setPlayer2Health(h => Math.min(maxHealth, h + 1))} style={{ marginLeft: '1rem' }}>Heal</button>
          <Monster name="PINK BEAN" image="/assets/monsters/pink_bean.png" side="right" />
        </div>

        <BattleControls />
      </div>
    </div>
  );
};