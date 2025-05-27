import React from 'react';
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// 
const DrawScreen: React.FC = () => {
  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });
  return (
    <div>
      That is a draw!
    </div>
  );
};

export default DrawScreen;