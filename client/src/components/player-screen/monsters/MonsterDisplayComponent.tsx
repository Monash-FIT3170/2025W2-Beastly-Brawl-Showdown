import { Monster } from "/types/monster";
import React from "react";

interface MonsterDisplayComponentProps{
    monster: Monster;
}

export const MonsterDisplayComponent = (props: MonsterDisplayComponentProps) => {
    return <>
    <img src = {props.monster.image} alt = "Monster image"/>
    <p>Name: {props.monster.name}</p>
    <p>Health: {props.monster.health}</p>
    <p>Attack: {props.monster.attack}</p>
    <p>Armour Class: {props.monster.armourClass}</p>
    </>
};