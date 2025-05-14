import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';
import { BlueButton } from '../../components/buttons/BlueButton';
import { Header } from '../../components/cards/Header';

export const Home = () => (
  <div>
    <Header text="Welcome to Meteor!" />
    <BlueButton text = 'Defend' onClick={() => (console.log("hey"))}/>
    <ButtonDemo/>
    <CardDemo />
  </div>
);
