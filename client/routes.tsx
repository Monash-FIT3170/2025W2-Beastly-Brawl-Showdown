import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./src/pages/Home/Home";
import HostLobby from "./src/pages/Lobby/HostLobby";
import JoinLobby from "./src/pages/Lobby/JoinLobby";
import PathNotFound from "./src/pages/Home/PathNotFound";
import HostBattles from "./src/pages/Lobby/HostBattles";
import Battle from "./src/pages/Game/Battle";
import { Game } from "./src/pages/Lobby/Game";
import Rules from "./src/pages/Game/Rules";
import MatchSummary from "./src/pages/Host View/MatchSummary";
import { Account } from "./src/pages/Home/Account";

function mount(Component: React.FC) {
  const container = document.getElementById("react-target");
  if (container) {
    createRoot(container).render(<Component />);
  }
}

FlowRouter.route("/", {
  name: "Home",
  action() {
    mount(Home);
  },
});

FlowRouter.route("/host", {
  name: "HostLobby",
  action() {
    mount(HostLobby);
  },
});

FlowRouter.route("/host/:code?", {
  name: "HostLobby",
  action(params) {
    mount(() => <HostLobby gameCode={params.code} />);
  },
});

FlowRouter.route("/join", {
  name: "JoinLobby",
  action() {
    mount(JoinLobby);
  },
});

FlowRouter.route("/join/:code?", {
  name: "JoinLobby",
  action(params) {
    mount(() => <JoinLobby gameCode={params.code} />);
  },
});

FlowRouter.route("/account", {
  name: "Account",
  action(params) {
    mount(() => <Account />);
  },
});

FlowRouter.route("/battle/:battleId?", {
  name: "Battle",
  action(params) {
    mount(() => <Battle battleId={params.battleId} />);
  },
});

FlowRouter.route("/session/:sessionId?", {
  name: "Session",
  action(params) {
    mount(() => <Game gameSessionId={params.sessionId} />);
  },
});

FlowRouter.route("/battles/:code?", {
  name: "MatchSummary",
  action(params) {
    mount(() => <MatchSummary gameCode={params.code} />);
  },
});

FlowRouter.route("/rules", {
  name: "Rules",
  action() {
    mount(Rules);
  },
});

FlowRouter.route("/*", {
  name: "NotFound",
  action() {
    mount(PathNotFound);
  },
});
