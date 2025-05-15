import React from 'react';
import { ButtonDemo } from '../../components/buttons/Button';
import { CardDemo } from '../../components/cards/Card';
import { InfoTextDemo } from '../../components/texts/InfoText';
import { BlueButton } from '../../components/buttons/BlueButton';
import { RedButton } from '../../components/buttons/RedButton';
import { PurpleHeaderCard } from '../../components/cards/PurpleHeaderCard';
import { HealthBar } from '../../components/bars/HealthBar';
import { ArmourClassBar } from '../../components/bars/ArmourClassBar';
import { AttackBonusBar } from '../../components/bars/AttackBonusBar';

export const Home = () => (
  <>
    <PurpleHeaderCard text = "SELECT YOUR MONSTER"/>
    <h1>Welcome to Meteor!</h1>
    <BlueButton text = 'DEFEND' onClick={() => (console.log("hey"))}/>
    <RedButton text = 'ATTACK' onClick = {() => console.log("attack")}></RedButton>
    <ButtonDemo/>
    <CardDemo />
    Health Bar (Full):
    <HealthBar currentHealth={35} maxHealth={35} />
    Health Bar (High):
    <HealthBar currentHealth={30} maxHealth={35} />
    Health Bar (Medium):
    <HealthBar currentHealth={15} maxHealth={35} />
    Health Bar (Low):
    <HealthBar currentHealth={5} maxHealth={35} />
    Health Bar (Zero):
    <HealthBar currentHealth={0} maxHealth={35} />
    Armour Class Bar:
    <ArmourClassBar armourClass={16} highestArmourClass={20} />
    Attack Bonus Bar:
    <AttackBonusBar attackBonus={1} highestAttackBonus={5} />
  </>
);
