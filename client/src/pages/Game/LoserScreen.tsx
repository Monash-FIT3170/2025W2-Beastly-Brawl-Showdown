import React from 'react';
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// 
const LoserScreen: React.FC = () => {

  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });

  return (
    <div>
      You Lost!
    </div>
  );
};

export default LoserScreen;