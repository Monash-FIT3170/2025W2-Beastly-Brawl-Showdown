import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { ActionState } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";
import PlayerInfoPanel from "../../components/player-screen/PlayerInfoPanel";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import DiceRollModal from "./DiceRollModal";
import WinnerScreen from "./WinnerScreen";
import LoserScreen from "./LoserScreen";
import DrawScreen from "./DrawScreen";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { FadingBattleText } from "../../components/texts/FadingBattleText";

interface BattleProps {
  battleId: string | null; // Add battleId as a prop
}

const Battle: React.FC<BattleProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [winner, setWinner] = useState<string | null>(null);
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
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

    socket.on("battle_end", ({ result, winners }) => {
      console.log(result, winners);
      if (result === "draw") {
        setWinner("Draw");
      } else if (result === "concluded") {
        setWinner(winners[0]);
      }
      console.log(winner);
    });

    // TODO: For future, this should handle socket message 'handle_animation' and pass in an animation identifier
    // to handle all types of animations triggered by actions
    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in Battle: dps ${diceRoll}`);
      setShowDiceModal(true);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("timer");
      socket.off("turn_over");
    };
  }, []);

  return (
    <div className="game-screen flex flex-col">
      {/* Winner display if battle is over */}
      {/*winner === "Draw" ? (
          <DrawScreen />
        ) : */}
      {winner ? (
        winner === "Draw" ? (
          <DrawScreen />
        ) : battleState?.yourPlayer.name === winner ? (
          <WinnerScreen playerMonster={battleState?.yourPlayer.monster} />
        ) : (
          <LoserScreen />
        )
      ) : (
        <>
          {battleState && (
            <div className="battle-state-parts">
              <PlayerInfoPanel battleState={battleState} />

              <div className="timer-box font-[Jua]">
                <p>Timer: {timer}</p>
              </div>

              <BattleMonsterPanel battleState={battleState} />

              {/* <div className="battle-logs">
                <h3>Logs:</h3>
                {battleState.yourPlayer.logs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </div> */}
              <div
                className="battle-logs-stack"
                style={{ position: "relative", width: "100%", height: "120px" }}
              >
                {battleState.yourPlayer.logs.map((log, index) => (
                  <FadingBattleText
                    key={index}
                    size="tiny"
                    style={{ top: `${index * 32}px` }}
                  >
                    {log}
                  </FadingBattleText>
                ))}
              </div>

              <DiceRollModal
                show={showDiceModal}
                onClose={() => setShowDiceModal(false)}
                toRoll={diceValue}
                battleState={battleState}
              />
            </div>
          )}

          <div>
            {timer > 0 && (
              <BattleFooter
                possibleActions={possibleActions}
                battleId={battleId}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Battle;
