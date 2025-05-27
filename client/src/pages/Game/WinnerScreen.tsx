import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import React from 'react';

const WinnerScreen: React.FC = () => {

  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });
  
  return (
    <div>
      You won!
    </div>
  );
};

export default WinnerScreen;