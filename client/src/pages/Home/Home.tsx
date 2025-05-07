import React, { useState } from 'react';
import DicerollModal from '../../components/popups/DicerollModal'; // Correct name

export const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);                    // Shows the modal 
  const [finalRoll, setFinalRoll] = useState<number | null>(null);      // The result of the dice

  const handleRollDice = () => {
    setShowModal(true);
  };

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <button onClick={handleRollDice}>
        Roll Dice
      </button>

      <DicerollModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onRolled={(value) => setFinalRoll(value)}
      />

      {/* // debug only part  */}
      {finalRoll !== null && (
        <div className="dice-result">
          <h5>You rolled a {finalRoll}!</h5>
        </div>
      )}
    </div>

    

  );
};