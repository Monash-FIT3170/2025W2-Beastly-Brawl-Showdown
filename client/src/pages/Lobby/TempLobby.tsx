import React, { useState } from "react";
import socket from "../../socket";
import CreatePlayer from "../../components/buttons/CreatePlayer";
import StartBattles from "../../components/buttons/StartBattles";

const TempLobby: React.FC = () => {
  var test = "";
  return (
    <div>
      <CreatePlayer />
      <StartBattles />
    </div>
  );
};

export default TempLobby;
