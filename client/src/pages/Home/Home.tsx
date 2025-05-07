import React, { useEffect, useState } from "react";
import TempLobby from "../Lobby/TempLobby";
import TempGame from "../Game/TempGame";
import socket from "../../socket"; // Ensure you import the socket instance

export const Home = () => {
  const [screen, setScreen] = useState<"LOBBY" | "GAME">("LOBBY"); // State to track the current screen
  const [battleId, setBattleId] = useState<string | null>(null); // State to track the battle ID

  useEffect(() => {
    socket.on("battle_started", (battleId: string) => {
      setScreen("GAME"); // Switch to the GAME screen when a battle starts
      console.log("TSX", battleId);
      setBattleId(battleId); // Store the battle ID
    });

    return () => {
      socket.off("battle_started");
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {screen === "LOBBY" ? <TempLobby /> : <TempGame battleId={battleId} />}
    </div>
  );
};
