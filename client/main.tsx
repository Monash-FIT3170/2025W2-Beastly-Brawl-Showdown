import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "./App";

import { Home } from "./src/pages/Home/Home";
import { HostLobby } from "./src/pages/Lobby/HostLobby";
import { JoinLobby } from "./src/pages/Lobby/JoinLobby";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);
  // root.render(<HostLobby />);
  // root.render(<Home />);
  // root.render(<JoinLobby />);
  root.render(<App />)
});
