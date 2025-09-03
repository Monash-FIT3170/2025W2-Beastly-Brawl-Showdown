import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./src/pages/Home/Home";
import HostLobby from "./src/pages/Lobby/HostLobby";
import JoinLobby from "./src/pages/Lobby/JoinLobby";
import PathNotFound from "./src/pages/Home/PathNotFound";
import { GameConfiguration } from "./src/pages/Game/GameConfiguration";
import Battle from "./src/pages/Game/Battle";
import { Game } from "./src/pages/Lobby/Game";
import Rules from "./src/pages/Game/Rules";
import MatchSummary from "./src/pages/Host View/MatchSummary";
import LevelSelect from "./src/pages/Adventure/LevelSelect";
import MonsterSelect from "./src/pages/Adventure/MonsterSelect";
import AdventureBattle from "./src/pages/Adventure/AdventureBattle";
import AdventureDefeated from "./src/pages/Adventure/Defeated";
import AdventureWin from "./src/pages/Adventure/AdventureWin";
import { Account } from "./src/pages/Home/Account";
import { BlankPage } from "./src/components/pagelayouts/BlankPage";

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


FlowRouter.route('/host/choose-mode', {
  name: 'GameConfiguration',
  action() {
    mount(GameConfiguration);
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

FlowRouter.route("/adventure/level-select", {
  name: "LevelSelect",
  action() {
    mount(LevelSelect);
  },
});


FlowRouter.route("/adventure/monster-select", {
  name: "MonsterSelect",
  action() {
    mount(MonsterSelect);
  },
});

FlowRouter.route("/adventure/adventure-battle", {
  name: "AdventureBattle",
  action() {
    mount(() => <AdventureBattle stage={1} />);
    // TODO: Pass the stage as a prop
  },
});

FlowRouter.route("/adventure/defeated", {
  name: "AdventureDefeated",
  action() {
    mount(AdventureDefeated);
  },
});

FlowRouter.route("/adventure/win", {
  name: "AdventureWin",
  action() {
    mount(AdventureWin);
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
