import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { Screens } from "../../screens";

interface MonsterSelectionProps {
  setScreen: ((screen: Screens) => void);
}

export const MonsterSelection: React.FC<MonsterSelectionProps> = ({ setScreen }) => {
  // LISTENERS:
  // UPDATE: Add listener to all player pages
  // Listen for the "kick-warning" event from the server
  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: change route, currently takes to path not found page
    FlowRouter.go("/*");
  });


  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Please Select A Monster...</h1>
      <p>placeholder for Agile Team 1</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setScreen(Screens.WAITING_SCREEN)}
      >
        Go to waiting room.
      </button>
    </div>
  );
};

