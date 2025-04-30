
/* 
When called, creates a small popup in the center of the screen with a dice that rolls for 2 seconds. 
Once dice finishes rolling, a text will display the result of the dice. We we will return the result of the dice. 
Popup will close shortly after the result is displayed. 

The animation of the rolling dice will be just a square with a number in the center that rapidly changes to 
simulate the rolling of the dice. 
*/
import React, { useEffect, useState } from 'react';

interface DicerollModalProps {
  show: boolean;
  onClose: () => void;
  onRolled: (result: number) => void;
}

const DicerollModal: React.FC<DicerollModalProps> = ({show, onClose, onRolled}) => {
    const [isRolling, setIsRolling] = useState(true);
    const [rollingValue, setRollingValue] = useState(1);
    const [finalValue, setFinalValue] = useState<number | null>(null);

    useEffect(() => {
      if (!show) return;
  
      setIsRolling(true);
      setFinalValue(null);
  
      let intervalId: NodeJS.Timeout;
      intervalId = setInterval(() => {
        setRollingValue(Math.floor(Math.random() * 6) + 1);
      }, 100);
  
      const final = Math.floor(Math.random() * 6) + 1;
      setTimeout(() => {
        clearInterval(intervalId);
        setFinalValue(final);
        setRollingValue(final);
        setIsRolling(false);
        onRolled(final);
  
        // Auto-close after 1.5 seconds
        setTimeout(() => {
          onClose();
        }, 1500);
      }, 2000);
    }, [show]);
    
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