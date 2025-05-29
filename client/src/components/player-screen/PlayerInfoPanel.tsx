import React from "react";
import "./PlayerInfoPanel.css";
import BattleHealthBar from "./BattleHealthBar";
import { BattleState } from "/types/composite/battleState";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";

interface PlayerInfoPanelProps {
  battleState: BattleState;
}

const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({ battleState }) => {
  return (
    <div className="player-info-container">
      <div className="player-info left">
        <BattleHealthBar current={battleState.yourPlayer.currentHealth} max={battleState.yourPlayerMonster.maxHealth}/>
        <BlackText size="medium">{battleState.yourPlayerMonster.name}</BlackText>
        {/* <div className="monster-name">{battleState.yourPlayerMonster.name}</div> */}
        <BlackText size="large">{battleState.yourPlayer.name}</BlackText>
      </div>
      <div className="player-info right">
        <BattleHealthBar current={battleState.opponentPlayer.currentHealth} max={battleState.opponentPlayerMonster.maxHealth}/>
        <BlackText size="medium">{battleState.opponentPlayerMonster.name}</BlackText>
        <BlackText size="large">{battleState.opponentPlayer.name}</BlackText>
      </div>
    </div>
  );
};

export default PlayerInfoPanel;