
import React, { useEffect, useState } from 'react';

// Required props (hooks)
interface DicerollModalProps {
  show: boolean;                                // Shows the modal 
  onClose: () => void;                          // Closes the modal (doesnt work???)
  toRoll: number;                               // The value to roll
}

const DicerollModal: React.FC<DicerollModalProps> = ({show, onClose, toRoll}) => {
    const [rollingValue, setRollingValue] = useState(1);
    const [finalValue, setFinalValue] = useState<number | null>(null); // TODO: Appears to be some bugs on the first roll

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
      <div className="dice-modal-overlay">
        <div className="dice-modal-content">
          {finalValue !== null && (
            <h5 className="dice-result-text">You rolled a {finalValue}!</h5>
          )}
          <div className="dice-face">{rollingValue}</div>
        </div>
      </div>
    );

};

export default DicerollModal;