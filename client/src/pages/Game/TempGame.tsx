import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { ActionState } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";
import PlayerInfoPanel from "../../components/player-screen/PlayerInfoPanel";
import MonsterPanel from "../../components/player-screen/MonsterPanel";
import LoserScreen from "./LoserScreen";
import WinnerScreen from "./WinnerScreen";
import DicerollModal from "./DiceRollModal";

interface TempGameProps {
  battleId: string | null; // Add battleId as a prop
}

const TempGame: React.FC<TempGameProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(5);
  const [winner, setWinner] = useState<string|null>(null);

  const [showModal, setShowModal] = useState(false); // show dice modal
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice

  useEffect(() => {
    socket.on("battle_state", (battle: BattleState) => {
      setBattleState(battle);
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    socket.on("timer", (time: number) => {
      console.log(`Timer: ${time}`);
      setTimer(time);
    });

    socket.on("battle_end", (winner: string) => {
      console.log(`Winner ${winner}`);
      setWinner(winner);
    });

    // TODO: Perhaps use socket to pass dice roll
    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in TempGame: dps ${diceRoll}`);
      setShowModal(true);
    });
    
    return () => {
      socket.off("possible_actions");
      socket.off("timer");
      socket.off("turn_over");
    };
  }, []);

  const handleActionClick = (action: ActionState) => {
    console.log(`Action selected: ${action}`);
    // You can emit the selected action to the server here if needed
    socket.emit("action_selected", { action, battleId, playerId: socket.id });
  };

  // TODO: Need to make this more modular so that we can insert different types of screens rather than using if statements within css
  return (
    <div className="game-screen">
      {/* Winner display if battle is over */}
      {winner ? (
        battleState?.yourPlayer.name === winner ? (
          <WinnerScreen />
        ) : (
          <LoserScreen />
        )
      ) : (
        <>
          {battleState && (
            <div className="battle-state-parts">
              <PlayerInfoPanel battleState={battleState}/>

              <div className="timer-box">
                <p>Timer: {timer}</p>
              </div>

              <MonsterPanel battleState={battleState}/>

              {/* <div className="battle-logs">
                <h3>Logs:</h3>
                {battleState.yourPlayer.logs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </div> */}
            </div>
          )}

          <div className="action-buttons">
            {timer > 0 ? (
              possibleActions.map((action, index) => (
                <button key={index} onClick={() => handleActionClick(action)}>
                  {action.name} {action.currentUse}/{action.maxUse}
                </button>
              ))
            ) : (
              <p>TURN ENDED...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TempGame;
