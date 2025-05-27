import React, { useEffect, useState } from "react";
import socket from "../../socket"; // Ensure you import the socket instance
import { Screens } from "../../screens";
import { MonsterSelection } from "../Game/MonsterSelection";
import WaitingScreen from "../Game/WaitingScreen";

interface GameProps {
  gameSessionId: string; // Add battleId as a prop
}

export const Game: React.FC<GameProps> = ({ gameSessionId }) => {
  const [screen, setScreen] = useState<Screens>(
    Screens.CHARACTER_SELECT_SCREEN
  ); // State to track the current screen

  const renderScreen = () => {
    switch (screen) {
      case Screens.CHARACTER_SELECT_SCREEN:
        return <MonsterSelection setScreen={setScreen} />;
      case Screens.WAITING_SCREEN:
        return <WaitingScreen setScreen={setScreen}/>;
      default:
        return <MonsterSelection setScreen={setScreen} />;
    }
  };

  return <div>{renderScreen()}</div>;
};
