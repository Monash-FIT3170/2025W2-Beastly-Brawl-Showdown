import React from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";

export const Home = () => (
  <div>
    <LogoDisplay size="3xl" />
    <ButtonDemo text="Host Lobby" onClick={() => {}} />
    <ButtonDemo text="Join Lobby" onClick={() => {}} />
  </div>
);
