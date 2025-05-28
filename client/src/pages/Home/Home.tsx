import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";

export const Home = () => {
  // Called on 'Host Lobby' button press
  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  // Received when Game Session is created. Takes user to 'Host Lobby' Page
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  // Called on 'Join Lobby' button press
  const renderJoinLobby = () => {
    FlowRouter.go("/join");
  };

  return (
    console.log("Home"),
    ( 
      <div>
        <ButtonResizableText buttonSize="medium" max1={8} max2={10} color="blue" onClick={()=>{}}>12345678</ButtonResizableText>
        <ButtonResizableText buttonSize="medium" max1={8} max2={10} color="blue" onClick={()=>{}}>123456789</ButtonResizableText>
        <ButtonResizableText buttonSize="medium" max1={8} max2={9} color="blue" onClick={()=>{}}>1234567890</ButtonResizableText>
      </div>
      // <BlankPage>
      //   <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around">
      //     <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full"></LogoResizable>
      //   </div>
      //   <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-10 sm:space-y-30">
      //     <ButtonGeneric
      //       color="ronchi"
      //       size="large"
      //       onClick={createGame}
      //       mobileHidden={"true"}
      //     >
      //       <OutlineText size="large">HOST GAME</OutlineText>
      //     </ButtonGeneric>
      //     <ButtonGeneric color="ronchi" size="large" onClick={renderJoinLobby}>
      //       <OutlineText size="large">JOIN GAME</OutlineText>
      //     </ButtonGeneric>
      //   </div>
      // </BlankPage>
    )
  );
};
