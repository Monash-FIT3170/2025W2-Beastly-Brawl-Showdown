import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';

export const Home = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <ButtonDemo/>
    <CardDemo />
  </div>
);
