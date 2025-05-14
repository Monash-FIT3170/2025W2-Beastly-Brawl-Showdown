import React, { useEffect, useState } from "react";
import TempLobby from "../Lobby/TempLobby";
import TempGame from "../Game/TempGame";
import socket from "../../socket";
import { Screens } from "../../screens";
import CharacterSelect from "../Game/CharacterSelect";

export const Home = () => {
  const [screen, setScreen] = useState<Screens>(Screens.LOBBY_SCREEN);
  const [battleId, setBattleId] = useState<string | null>(null);

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

  useEffect(() => {
    socket.on("go_to_character_select", ({ battleId }) => {
      console.log("Switching to CHARACTER_SELECT_SCREEN");
      setBattleId(battleId);
      setScreen(Screens.CHARACTER_SELECT_SCREEN); // Navigate to the character select screen
    });

    return () => {
      socket.off("go_to_character_select");
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case Screens.LOBBY_SCREEN:
        return <TempLobby />;
      case Screens.CHARACTER_SELECT_SCREEN:
        return <CharacterSelect battleId={battleId} />;
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
