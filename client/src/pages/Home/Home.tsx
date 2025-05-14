import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';
import { BlueButton } from '../../components/buttons/BlueButton';
import { RedButton } from '../../components/buttons/RedButton';
import { PurpleHeaderCard } from '../../components/cards/PurpleHeaderCard';
import { MonsterSelectionCard } from '../../components/cards/MonsterSelectionCard';

export const Home = () => (
  <>
    <PurpleHeaderCard text = "SELECT YOUR MONSTER"/>
    <h1>Welcome to Meteor!</h1>

    <MonsterSelectionCard name = 'Dragon' description='flavourtext' image = 'path' type = 'defender'/>
    <BlueButton text = 'DEFEND' onClick={() => (console.log("hey"))}/>
    <RedButton text = 'ATTACK' onClick = {() => console.log("attack")}></RedButton>
    <ButtonDemo/>
    <CardDemo />
  </>
);
