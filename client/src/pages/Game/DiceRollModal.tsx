
import React, { useEffect, useState } from 'react';
import { BattleState } from '/types/composite/battleState';

// Required props (hooks)
interface DiceRollModalProps {
  show: boolean;                                // Shows the modal 
  onClose: () => void;                          // Closes the modal (doesnt work???)
  toRoll: number;                               // The value to roll
  battleState: BattleState;
}

const DiceRollModal: React.FC<DiceRollModalProps> = ({show, onClose, toRoll, battleState}) => {
    const [rollingValue, setRollingValue] = useState(1);
    const [finalValue, setFinalValue] = useState<number | null>(null); // TODO: Appears to be some bugs on the first roll
    const yourMonsterATK = battleState.yourPlayerMonster.attackBonus;
    const enemyMonsterAC = battleState.opponentPlayerMonster.armourClass;
    const outcome = finalValue !== null ? (finalValue + yourMonsterATK >= enemyMonsterAC) : false;

    useEffect(() => {
      if (!show) return;
      
      console.log(`From dice modal: dps ${toRoll}`);
      setFinalValue(null);
      // setFinalValue(toRoll);
  
      let intervalId: NodeJS.Timeout;
      intervalId = setInterval(() => {
        setRollingValue(Math.floor(Math.random() * 6) + 1);
      }, 100);
  
      const final = toRoll;
      setTimeout(() => {
        clearInterval(intervalId);
        setFinalValue(final);
        setRollingValue(final);
        // onRolled(final);
  
        // Auto-close after 1.5 seconds
        setTimeout(() => {
          onClose();
        }, 1500); // 1500 ms delay to close the modal
      }, 1500); // 2000 ms delay for the rolling effect
    }, [show]);
    
    // Hides the dice after roll
    if (!show) {
      return null;
    }

    return (
      <div className="dice-modal-overlay border-[4px] border-blackCurrant font-[Jua]">
        <div className="dice-modal-content">
          <h5 className="dice-result-text font-bold">
            ENEMY AC: {enemyMonsterAC} <br />
            YOUR ATK: {yourMonsterATK} <br /><br />
            ROLL NEEDED: {enemyMonsterAC - yourMonsterATK}+
          </h5>
          <div className="dice-face">{rollingValue}</div>
          {finalValue !== null && (
            <h5 className="dice-result-text font-bold">
              <br />
              OUTCOME: {finalValue} + {yourMonsterATK} {outcome ? '≥' : '<'} {enemyMonsterAC} <br /><br />
              {outcome ? 'SUCCESS!' : 'FAILED...'}
            </h5>
          )}
        </div>
      </div>
    );

};

export default DiceRollModal;