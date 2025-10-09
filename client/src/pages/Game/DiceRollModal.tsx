
import React, { useEffect, useRef, useState } from 'react';
import { BattleState } from '/types/composite/battleState';
import './d20.css'

// Required props (hooks)
// interface DiceRollModalProps {
//   show: boolean;                                // Shows the modal 
//   onClose: () => void;                          // Closes the modal 
//   toRoll: number;                               // The value to roll
//   battleState: BattleState;
// }

// const DiceRollModal: React.FC<DiceRollModalProps> = ({show, onClose, toRoll, battleState}) => {
//     const [rollingValue, setRollingValue] = useState(1);
//     const [finalValue, setFinalValue] = useState<number | null>(null); // TODO: Appears to be some bugs on the first roll
//     const yourMonsterATK = battleState.yourPlayerMonster.attackBonus;
//     const enemyMonsterAC = battleState.opponentPlayerMonster.armourClass;
//     const outcome = finalValue !== null ? (finalValue + yourMonsterATK >= enemyMonsterAC) : false;

//     useEffect(() => {
//       if (!show) return;
      
//       console.log(`From dice modal: dps ${toRoll}`);
//       setFinalValue(null);
//       // setFinalValue(toRoll);
  
//       let intervalId: NodeJS.Timeout;
//       intervalId = setInterval(() => {
//         setRollingValue(Math.floor(Math.random() * 6) + 1);
//       }, 100);
  
//       const final = toRoll;
//       setTimeout(() => {
//         clearInterval(intervalId);
//         setFinalValue(final);
//         setRollingValue(final);
//         // onRolled(final);
  
//         // Auto-close after 1.5 seconds
//         setTimeout(() => {
//           onClose();
//         }, 1500); // 1500 ms delay to close the modal
//       }, 1500); // 2000 ms delay for the rolling effect
//     }, [show]);
    
//     // Hides the dice after roll
//     if (!show) {
//       return null;
//     }

//     return (
//       <div className="fixed inset-0 flex items-center justify-center">
//       <div className="dice-modal-overlay border-[4px] border-blackCurrant font-[Jua] rounded-xl ">
//         <div className="dice-modal-content">
//           <h5 className="dice-result-text font-bold">
//             ENEMY AC: {enemyMonsterAC} <br />
//             YOUR ATK: {yourMonsterATK} <br /><br />
//             ROLL NEEDED: {enemyMonsterAC - yourMonsterATK}+
//           </h5>
//           <div className="dice-face">{rollingValue}</div>
//           {finalValue !== null && (
//             <h5 className="dice-result-text font-bold">
//               <br />
//               OUTCOME: {finalValue} + {yourMonsterATK} {outcome ? '≥' : '<'} {enemyMonsterAC} <br /><br />
//               {outcome ? 'SUCCESS!' : 'FAILED...'}
//             </h5>
//           )}
//         </div>
//       </div>
//       </div>
//     );

// };

const DiceRollModal = ({show, onClose, toRoll, battleState}) => {
  const dieRef = useRef<HTMLDivElement>(null); // Reference to the die element
  const sides = 20;
  const initialSide = 1;
  let lastFace: number | undefined;

  // Function to generate a random face
  const randomFace = (): number => {
    const face = Math.floor(Math.random() * sides) + initialSide;
    return face === lastFace ? randomFace() : (lastFace = face);
  };

  // Function to roll the die to a specific face
  const rollTo = (face: number) => {
    if (dieRef.current) {
      dieRef.current.setAttribute('data-face', face.toString());
    }
  };

  // Function to reset the die to the initial side
  const reset = () => {
    if (dieRef.current) {
      dieRef.current.setAttribute('data-face', initialSide.toString());
    }
  };

  // Effect to handle rolling the die when the modal is shown
  useEffect(() => {
    if (show) {
      console.log(`SHOWING DICE ROLL`)
      // Roll the dice to a random face when the modal is shown
      const timeoutId = setTimeout(() => rollTo(randomFace()), 3000);

      return () => clearTimeout(timeoutId); // Cleanup on unmount or when `show` changes
    }
  }, [show]);

  return (
    <div className="dice-roll-modal">
      {/* Replace the square with the d20 dice */}
      <div className="die" data-face="1" ref={dieRef}>
        {/* Add the faces of the dice */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`face face-${i + 1}`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiceRollModal;