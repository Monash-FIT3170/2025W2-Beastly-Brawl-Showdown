import React, { useState, useEffect } from "react";
import socket from "../../socket";
import CountDownTimer from "../../components/temp/CountdownTimer";
import { ActionState, ActionIdentifier } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";
import { BattleFooter } from "../../components/cards/BattleFooter";

interface BattleProps {
  battleId: string | null; // Add battleId as a prop
}

const Battle: React.FC<BattleProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [winner, setWinner] = useState<string | null>(null);

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

  // const attackAction = possibleActions.find((a) => a.id === ActionIdentifier.ATTACK);
  // const defendAction = possibleActions.find((a) => a.id === ActionIdentifier.DEFEND);

  // const abilityActions = possibleActions.filter(
  //   (a) => a.id !== ActionIdentifier.ATTACK && a.id !== ActionIdentifier.DEFEND && a.id !== ActionIdentifier.NULL
  // );

  // const ability1 = abilityActions[0];
  // const ability2 = abilityActions[1];

  let attackAction: ActionState | undefined;
  let defendAction: ActionState | undefined;
  const abilityActions: ActionState[] = [];

  possibleActions.forEach((action) => {
    if (action.id === ActionIdentifier.ATTACK) {
      attackAction = action;
    } else if (action.id === ActionIdentifier.DEFEND) {
      defendAction = action;
    } else if (action.id !== ActionIdentifier.NULL) {
      abilityActions.push(action);
    }
  });

  const ability1 = abilityActions[0];
  const ability2 = abilityActions[1];

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
                <p>
                  Armour: {battleState.opponentPlayer.currentArmourClassStat}
                </p>
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
              // possibleActions.map((action, index) => (
              //   <button key={index} onClick={() => handleActionClick(action)}>
              //     {action.name} {action.currentUse}/{action.maxUse}
              //   </button>
              // ))
              <BattleFooter
              attackOnClick={() => attackAction && handleActionClick(attackAction)}
              defenseCharges={defendAction?.maxUse ?? 0}
              defendOnClick={() => defendAction && handleActionClick(defendAction)}
              ability1={ability1?.name ?? "Ability 1"}
              ability1Charges={ability1?.maxUse ?? 0}
              ability1Image={'ShadowFangPredator'}
              ability1OnClick={() => ability1 && handleActionClick(ability1)}
              ability2={ability2?.name ?? "Ability 2"}
              ability2Charges={ability2?.maxUse ?? 0}
              ability2Image={'ShadowFangPredator'}
              ability2OnClick={() => ability2 && handleActionClick(ability2)}
              />
            ) : (
              <p>TURN ENDED...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Battle;
 