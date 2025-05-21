import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './src/pages/Home/Home';
import Rules from './src/pages/Game/Rules';
import MatchSummary from './src/pages/Host View/MatchSummary';

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

FlowRouter.route('/rules', {
  name: 'Rules',
  action() {
    mount(Rules);
  },
});

FlowRouter.route('/match-summary', {
  name: 'Match Summary',
  action() {
    mount(MatchSummary);
  },
});