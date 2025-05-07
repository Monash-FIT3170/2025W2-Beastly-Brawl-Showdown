import React, { useState, useEffect } from "react";
import socket from "../../socket";
import CountDownTimer from "../../components/temp/CountdownTimer";

interface TempGameProps {
  battleId: string | null; // Add battleId as a prop
}

const TempGame: React.FC<TempGameProps> = ({ battleId }) => {
  const [possibleActions, setPossibleActions] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    socket.on("possible_actions", (actions: string[]) => {
      setPossibleActions(actions);
    });

    socket.on("timer", (time: number) => {
      console.log(`Timer: ${time}`);
      setTimer(time);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("timer");
      socket.off("turn_over");
    };
  }, []);

  const handleActionClick = (action: string) => {
    console.log(`Action selected: ${action}`);
    // You can emit the selected action to the server here if needed
    socket.emit("action_selected", { action, battleId, playerId: socket.id });
  };

  return (
    <div>
      <h1>GAME</h1>
      <CountDownTimer timer={timer} />
      <div>
        {/* 10 seconds where players can choose the action */}
        {timer > 0 ? (
          possibleActions.map((action, index) => (
            <button key={index} onClick={() => handleActionClick(action)}>
              {action}
            </button>
          ))
        ) : (
          // TODO: after 10 second elapses, show each action that each player selected and some animations (for example, a monster attacking).
          // Maybe it might be 3-5 seconds, then reset timer to zero and start a new turn.
          <p>TURN ENDED...</p>
        )}
      </div>
    </div>
  );
};

export default TempGame;
