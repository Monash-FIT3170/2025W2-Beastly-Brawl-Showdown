import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InputBox } from '../../components/inputs/InputBox'
import { BlueButton } from '../../components/buttons/BlueButton';
import { Header } from '../../components/cards/Header';

export const Home = () => ( 
  <div> 
    <Header text="Welcome to Meteor!" />
    <BlueButton text = 'Defend' onClick={() => (console.log("hey"))}/>
    <ButtonDemo/>
    <InputBox />
    <CardDemo />
  </div>
);
