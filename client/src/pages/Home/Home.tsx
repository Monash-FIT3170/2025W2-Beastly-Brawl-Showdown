import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InputBox } from '../../components/inputs/InputBox'
import { BlueButton } from '../../components/buttons/BlueButton';
import { RedButton } from '../../components/buttons/RedButton';
import { PurpleHeaderCard } from '../../components/cards/PurpleHeaderCard';
import { MonsterSelectionCard } from '../../components/cards/MonsterSelectionCard';
import { IconTest } from '../../components/icons/IconTest';
import { DefendButton } from '../../components/buttons/DefendButton';

export const Home = () => (
  <>
    <PurpleHeaderCard text = "SELECT YOUR MONSTER">
        <p></p>
      </PurpleHeaderCard>
    <h1>Welcome to Meteor!</h1>
    <MonsterSelectionCard name = 'Mystic Wyvern' description='flavourtext' image = 'MysticWyvern.png' type = 'defender'/>
    <BlueButton text = 'DEFEND' onClick={() => (console.log("hey"))}/>
    <RedButton text = 'ATTACK' onClick = {() => console.log("attack")}></RedButton>


    <DefendButton charges = {3}/>
  </>
);
