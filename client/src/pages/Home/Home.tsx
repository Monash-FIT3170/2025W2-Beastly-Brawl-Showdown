import React from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

export const Home = () => {
  const renderHostLobby = () => {
    FlowRouter.go('/host');
  };

  const renderJoinLobby = () => {
    FlowRouter.go('/join');
  };

  return (
    console.log("Home"),
    <div>
      <LogoDisplay size="3xl" />
      <ButtonDemo text="Host Lobby" onClick={renderHostLobby} />
      <ButtonDemo text="Join Lobby" onClick={renderJoinLobby} />
    </div>
  );
};
