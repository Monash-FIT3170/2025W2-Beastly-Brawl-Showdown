import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";

const WaitingScreen: React.FC = () => {

  useEffect(() => {
    socket.on("battle_started", (battleId: string) => {
      FlowRouter.go(`/battle/${battleId}`);
    });

    return () => {
      socket.off("battle_started");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Waiting section...</h1>
      <p>placeholder for Agile Team 1</p>
    </div>
  );
};

export default WaitingScreen;
