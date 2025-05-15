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
import {DefendButtonTemp} from "../../components/buttons/DefendButtonTemp"
import { MonsterImage } from '../../components/player-screen/monsters/MonsterImage';
import { ButtonGeneric } from '../../components/buttons/ButtonGeneric';
import { Popup } from '../../components/popups/Popup';
import { BattleHealthBar } from '../../components/bars/BattleHealthBar';
import { ArmourClassBar } from '../../components/bars/ArmourClassBar';
import { AttackBonusBar } from '../../components/bars/AttackBonusBar';
import { TotalHealthBar } from '../../components/bars/TotalHealthBar';

export const Home = () => (
  <>
    <PurpleHeaderCard text = "SELECT YOUR MONSTER">
        <p></p>
      </PurpleHeaderCard>
    <h1>Welcome to Meteor!</h1>
    <MonsterSelectionCard name = 'Mystic Wyvern' description='flavourtext' image = 'MysticWyvern.png' type = 'defender'/>
    <BlueButton text = 'DEFEND' onClick={() => (console.log("hey"))}/>
    <RedButton text = 'ATTACK' onClick = {() => console.log("attack")}></RedButton>
    {/* <ButtonDemo/> */}
    <ButtonGeneric text = "ATTACK" color = 'red' size = 'large' />
    <ButtonGeneric text = "JOIN ROOM" color = 'lightorange' size = 'large' />
    <ButtonGeneric text = "RETURN TO LOBBY" color = 'red' size = 'medium' />
    <ButtonGeneric text = "EXIT LOBBY" color = 'red' size = 'medium' />
    <ButtonGeneric text = "CANCEL" color = 'red' size = 'small' />
    <ButtonGeneric text = "SELECT" color = 'blue' size = 'small' />
    <ButtonGeneric text = "MENU" color = 'lightorange' size = 'small' />
    <Popup text = "This is a pop up screen! This is a pop up screen! This is a pop up screen! This is a pop up screen! You don't need to add line breaks, just type in here!" />
    <InputBox />
    <CardDemo />
    <IconTest />
    <DefendButtonTemp label = 'DEFEND' initialCount = {3}/>
    <br /><br />
    Battle Health Bar (Full):
    <BattleHealthBar currentHealth={20} maxHealth={20} />
    Battle Health Bar (High):
    <BattleHealthBar currentHealth={15} maxHealth={20} />
    Battle Health Bar (Medium):
    <BattleHealthBar currentHealth={10} maxHealth={20} />
    Battle Health Bar (Low):
    <BattleHealthBar currentHealth={5} maxHealth={20} />
    Battle Health Bar (Zero):
    <BattleHealthBar currentHealth={0} maxHealth={20} />
    Total Health Bar (Stat Screen):
    <TotalHealthBar totalHealth={30} highestHealth={35} />
    Armour Class Bar (Stat Screen):
    <ArmourClassBar armourClass={16} highestArmourClass={20} />
    Attack Bonus Bar (Stat Screen):
    <AttackBonusBar attackBonus={1} highestAttackBonus={5} />
  </>
);
