import { MonsterIdentifier } from "/types/single/monsterState";
import PlayerInfoPanel from "../../components/player-screen/PlayerInfoPanel";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import { FadingBattleText } from "../../components/texts/FadingBattleText";
import DiceRollModal from "../Game/DiceRollModal";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { useState } from "react";
import { BattleState } from "/types/composite/battleState";
import { ActionState } from "/types/single/actionState";

interface AdventureProps {
  //so i am adding this without actually knowing why just trust the process
  stage: number;
}

const AdventureBattle: React.FC<AdventureProps> = ({ stage }) => {
  //TODO: determine enemy in here???? maybe from AdventureProps

  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [timer, setTimer] = useState<number>(10);
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice
  const battleId = "ADVENTURE";
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);

  return (
    <>
      {/* ADD win/death results*/}

      <>
        {battleState && (
          <div className="battle-state-parts item-center justify-center ">
            <PlayerInfoPanel battleState={battleState} />

            <div className="timer-box font-[Jua]">
              <p>Timer: {timer}</p>
            </div>

            <BattleMonsterPanel battleState={battleState} />

            <div
              className="battle-logs-stack mt-[60%] xl:mt-[15%]"
              style={{ position: "relative", width: "100%", height: "120px" }}
            >
              {battleState.yourPlayer.logs.map((log, index) => (
                <FadingBattleText
                  key={index}
                  size="medium-battle-text"
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
    </>
  );
};

export default AdventureBattle;
