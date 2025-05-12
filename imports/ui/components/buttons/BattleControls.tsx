import React from 'react';
import './BattleControls.css';

export const BattleControls = () => {
    return (
        <div className="battle-controls">
      <div className="top-row">
        <button className="battle-button attack">ATTACK</button>
        <button className="battle-button defend">DEFEND</button>
      </div>
      <div className="bottom-row">
        <button className="battle-button special purple">SPECIAL_1</button>
        <button className="battle-button special purple">SPECIAL_2</button>
      </div>
    </div>
    )
}