import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';
import { BlueButton } from '../../components/buttons/BlueButton';
import { RedButton } from '../../components/buttons/RedButton';
import { PurpleHeaderCard } from '../../components/cards/PurpleHeaderCard';

export const Home = () => (
  <>
    <PurpleHeaderCard text = "SELECT YOUR MONSTER"/>
    <h1>Welcome to Meteor!</h1>
    <BlueButton text = 'DEFEND' onClick={() => (console.log("hey"))}/>
    <RedButton text = 'ATTACK' onClick = {() => console.log("attack")}></RedButton>
    <ButtonDemo/>
    <CardDemo />
  </>
);
