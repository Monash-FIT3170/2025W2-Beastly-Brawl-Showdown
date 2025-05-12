import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { PlayerScreen } from '../imports/ui/pages/Game/PlayerScreen';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(<PlayerScreen />);
});
