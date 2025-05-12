import React, { useState, useEffect } from "react";
import socket from "../../socket";
import CountDownTimer from "../../components/temp/CountdownTimer";
import { ActionState } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";

interface TempGameProps {
  battleId: string | null; // Add battleId as a prop
}

const TempGame: React.FC<TempGameProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [winner, setWinner] = useState<string|null>(null);

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
      console.log(`Winner ${winner}`)
      setWinner(winner)
    })

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

  return (
    <div>
      <h1>GAME</h1>


      {/* Winner display if battle is over */}
      {winner ? (
        <div>
          <h2>Battle Ended</h2>
          <p>Winner: {winner}</p>
        </div>
      ) : (
        <>
          <CountDownTimer timer={timer} />


          {battleState && (
            <div>
              <h2>Battle</h2>
              <p>Turn: {battleState.turn}</p>


              <div>
                <h3>You: {battleState.yourPlayer.name}</h3>
                <p>Health: {battleState.yourPlayer.currentHealth}</p>
                <p>Attack: {battleState.yourPlayer.currentAttackStat}</p>
                <p>Armour: {battleState.yourPlayer.currentArmourClassStat}</p>
                <p>Monster: {battleState.yourPlayerMonster.name}</p>
              </div>


              <div>
                <h3>Opponent: {battleState.opponentPlayer.name}</h3>
                <p>Health: {battleState.opponentPlayer.currentHealth}</p>
                <p>Attack: {battleState.opponentPlayer.currentAttackStat}</p>
                <p>Armour: {battleState.opponentPlayer.currentArmourClassStat}</p>
                <p>Monster: {battleState.opponentPlayerMonster.name}</p>
              </div>


              <div>
                <h3>Logs:</h3>
                {battleState.yourPlayer.logs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </div>
            </div>
          )}


          <div>
            {timer > 0 ? (
              possibleActions.map((action, index) => (
                <button key={index} onClick={() => handleActionClick(action)}>
                  {action.name}
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
