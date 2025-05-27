import React from "react";
import "./BattleMonsterPanel.css";
import { BattleState } from "/types/composite/battleState";

interface BattleMonsterPanelProps {
  battleState: BattleState;
}

const BattleMonsterPanel: React.FC<BattleMonsterPanelProps> = ({ battleState }) => {

    const pathLeftMon = "/assets/characters/" + battleState.yourPlayerMonster.id + ".png";
    const pathRightMon = "/assets/characters/" + battleState.opponentPlayerMonster.id + ".png";

    console.log("Left Monster Path: ", pathLeftMon);
    console.log("Right Monster Path: ", pathRightMon);

    return (
        <div className="monster-panel">
            <div className="right-monster">
                <img src={pathRightMon}/>
                <div className="monster-shadow"></div>
            </div>
            <div className="left-monster">
                <img src={pathLeftMon}/>
                <div className="monster-shadow"></div>
            </div>
        </div>
    );
};

export default BattleMonsterPanel;