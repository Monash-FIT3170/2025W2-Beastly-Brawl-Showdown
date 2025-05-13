import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';
import { BlueButton } from '../../components/buttons/BlueButton';

export const Home = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <BlueButton text = 'Defend' onClick={() => (console.log("hey"))}/>
    <ButtonDemo/>
    <CardDemo />
  </div>
);
