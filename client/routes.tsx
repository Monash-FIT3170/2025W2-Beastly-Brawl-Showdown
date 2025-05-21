
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from "./src/pages/Home/Home";
import HostLobby from "./src/pages/Lobby/HostLobby";
import JoinLobby from "./src/pages/Lobby/JoinLobby";
import PathNotFound from "./src/pages/Home/PathNotFound";

function mount(Component: React.FC) {
  const container = document.getElementById('react-target');
  if (container) {
    createRoot(container).render(<Component />);
  }
}

FlowRouter.route('/', {
  name: 'Home',
  action() {
    mount(Home);
  },
});

FlowRouter.route('/host', {
  name: 'HostLobby',
  action() {
    mount(HostLobby);
  },
});

FlowRouter.route('/join', {
  name: 'JoinLobby',
  action() {
    mount(JoinLobby);
  },
});

FlowRouter.route('/join/:code?', {
  name: 'JoinLobby',
  action(params) {
    mount(() => <JoinLobby gameCode={params.code} />);
  },
});

FlowRouter.route('/*', {
  name: 'NotFound',
  action() {
    mount(PathNotFound);
  },
});