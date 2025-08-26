import React from "react";
import "./MonsterPanel.css";
import { BattleState } from "/types/composite/battleState";

interface MonsterPanelProps {
  battleState: BattleState;
}

const MonsterPanel: React.FC<MonsterPanelProps> = ({ battleState }) => {
  const pathLeftMon =
    "/assets/characters/" + battleState.yourPlayerMonster.id + ".png";
  const pathRightMon =
    "/assets/characters/" + battleState.opponentPlayerMonster.id + ".png";

  // console.log("Left Monster Path: ", pathLeftMon);
  // console.log("Right Monster Path: ", pathRightMon);

  return (
    <div className="monster-panel">
      <div className="right-monster">
        <img src={pathRightMon} />
      </div>
      <div className="left-monster">
        <img src={pathLeftMon} />
      </div>
    </div>
  );
};

export default MonsterPanel;
