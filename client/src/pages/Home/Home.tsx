import React, { useEffect, useState } from "react";
import TempLobby from "../Lobby/TempLobby";
import TempGame from "../Game/TempGame";
import socket from "../../socket"; // Ensure you import the socket instance
import { Screens } from "../../screens";

export const Home = () => {
  const [screen, setScreen] = useState<Screens>(Screens.LOBBY_SCREEN); // State to track the current screen
  const [battleId, setBattleId] = useState<string | null>(null); // State to track the battle ID

  useEffect(() => {
    socket.on("battle_started", (battleId: string) => {
      setScreen(Screens.GAME_SCREEN); // Switch to the GAME screen when a battle starts
      console.log("TSX", battleId);
      setBattleId(battleId); // Store the battle ID
    });

    return () => {
      socket.off("battle_started");
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case Screens.LOBBY_SCREEN:
        return <TempLobby />;
      case Screens.GAME_SCREEN:
        return <TempGame battleId={battleId} />;
      default:
        return <TempLobby />;
    }
  };

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {renderScreen()}
    </div>
  );
};
