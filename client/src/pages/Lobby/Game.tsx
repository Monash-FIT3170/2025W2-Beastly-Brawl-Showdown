import React, { useEffect, useState } from "react";
import socket from "../../socket"; // Ensure you import the socket instance
import { Screens } from "../../screens";
import WaitingScreen from "../Game/WaitingScreen";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { MonsterSelect } from "../Game/MonsterSelect";

interface GameProps {
  gameSessionId: string; // Add battleId as a prop
}

export const Game: React.FC<GameProps> = ({ gameSessionId }) => {
  const [screen, setScreen] = useState<Screens>(() => {
    const queryParams = FlowRouter.current().queryParams;
    if (queryParams.fromBattle === "true") {
      return Screens.WAITING_SCREEN;
    }
    return Screens.CHARACTER_SELECT_SCREEN;
  }); // State to track the current screen

  // add on reload?
  socket.on("new-connect", () => {
    FlowRouter.go("/");
  });

  const renderScreen = () => {
    switch (screen) {
      case Screens.CHARACTER_SELECT_SCREEN:
        return <MonsterSelect setScreen={setScreen} />;
      case Screens.WAITING_SCREEN:
        return <WaitingScreen setScreen={setScreen} />;
      default:
        return <MonsterSelect setScreen={setScreen} />;
    }
  };

  return <div>{renderScreen()}</div>;
};
