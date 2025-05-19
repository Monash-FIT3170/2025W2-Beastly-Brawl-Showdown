import React from "react";
import "./PlayerInfoPanel.css";
import HealthBar from "./HealthBar";
import { BattleState } from "/types/composite/battleState";

interface PlayerInfoPanelProps {
  battleState: BattleState;
}

const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({battleState}) => {
  return (
    <div className="player-info-container">
      <div className="player-info left">
        <HealthBar current={battleState.yourPlayer.currentHealth} max={battleState.yourPlayerMonster.maxHealth}/>
        <div className="monster-name">{battleState.yourPlayerMonster.name}</div>
        <div className="player-name">{battleState.yourPlayer.name}</div>
      </div>
      <div className="player-info right">
        <HealthBar current={battleState.opponentPlayer.currentHealth} max={battleState.opponentPlayerMonster.maxHealth}/>
        <div className="monster-name">{battleState.opponentPlayerMonster.name}</div>
        <div className="player-name">{battleState.opponentPlayer.name}</div>
      </div>
    </div>
  );
};

export default PlayerInfoPanel;