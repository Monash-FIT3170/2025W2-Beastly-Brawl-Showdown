import React from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const handleHostLobby = () => {
    navigate("/host");
  };

  const handleJoinLobby = () => {
    navigate("/join");
  };

  return (
    <div>
      <LogoDisplay size="3xl" />
      <ButtonDemo text="Host Lobby" onClick={handleHostLobby} />
      <ButtonDemo text="Join Lobby" onClick={handleJoinLobby} />
    </div>
  );
};
