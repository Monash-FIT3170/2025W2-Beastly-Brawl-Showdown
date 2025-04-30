import React, {useState} from 'react';
import DicerollPopup from '../../components/popups/DicerollModal';

export const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [finalRoll, setFinalRoll] = useState<number | null>(null);

  const handleRollDice = () => {
    setShowModal(true);
  };


  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <button onClick={handleRollDice} className="btn btn-primary">
        Roll Dice
      </button>

      <DicerollPopup
        show={showModal}
        onClose={() => setShowModal(false)}
        onRolled={(value) => setFinalRoll(value)}
      />
    </div>
  );

};
