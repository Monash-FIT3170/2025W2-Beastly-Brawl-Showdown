import React, { useState } from "react";
import { ActionIdentifier } from "../../../../types/single/actionState"
import { AbilityCard } from "../../components/wiki/AbilityCard"
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { OutlineTextBP } from "../../components/texts/OutlineTextBP";
import { BaseCard } from "../../components/cards/BaseCard";

export const WikiAbilitiesPage = () => {
    return (

        <div className="flex flex-col space-y-[1rem] overflow-y-scroll justify-around items-center m-[2rem]">

            <BaseCard color="peach" width={50} height={8}>
                <OutlineTextBP size="extraLarge">Abilities</OutlineTextBP>
            </BaseCard>

            <OutlineTextBP size="large">
                Common Abilities
            </OutlineTextBP>

            <AbilityCard
                image={ActionIdentifier.ATTACK}
                name="Attack"
                body={"The basic form of offence that all monsters have access to. \nMakes an attack roll, dealing 5 damage on a successful hit."}
                uses="Unlimited"
            />
            <AbilityCard
                image={ActionIdentifier.DEFEND}
                name="Defend"
                body={"The basic form of defence that all monsters have access to. \nIncreases AC by 5 this turn."}
                uses="3"
            />

            <OutlineTextBP size="large">
                Regular Abilities
            </OutlineTextBP>

            <AbilityCard
                image={ActionIdentifier.FORTRESS_STANCE}
                name="Fortress Stance"
                body={"The user toughens their body, anticipating an attack. \nIncreases AC by 20 this turn."}
                uses="1"
            />
            <AbilityCard
                image={ActionIdentifier.TIP_THE_SCALES}
                name="Tip the Scales"   
                body={"The user's natural luck manifests in an attack. \nMakes an attack roll that will never roll below a 10, dealing 5 damage on a successful hit."}
                uses="1"
            />
            <AbilityCard
                image={ActionIdentifier.GROUND_SLAM}
                name="Ground Slam"
                body={"The user stomps the earth, disorientating the opponent. \nDeals 3 damage and stuns the enemy, preventing them from acting next turn."}
                uses="2"
            />  
            <AbilityCard
                image={ActionIdentifier.SHADOW_LEAP}
                name="Shadow Leap"
                body={"The user moves fast enough to become invisible, evading an attack. \nAny damage this turn is nullified."}
                uses="1"
            />
            <AbilityCard
                image={ActionIdentifier.FLAME_LASH}
                name="Flame Lash"
                body={"The user whips a blazing tail that seeks the opponent. \nDeals 5 damage, plus 5 more damage if the opponent tries to use an ability to dodge this attack."}
                uses="1"
            />
            <AbilityCard
                image={ActionIdentifier.ALLURING_LULLABY}
                name="Alluring Lullaby"
                body={"The user sings a strange tune that confuses the opponent. \nIf this monster would be hit by an attack this turn, the opponent takes the damage instead."}
                uses="1"
            />
            <AbilityCard
                image={ActionIdentifier.TOXIN_TONGUE}
                name="Toxin Tongue"
                body={"The user whips their venomous tongue as a weapon. \nThe opponent becomes poisoned, taking 1 damage at the start of their next 5 turns."}
                uses="2"
            />
            <AbilityCard
                image={ActionIdentifier.PUFFER_BLAST}
                name="Puffer Blast"
                body={"The user launches a burst of three pufferfish at the opponent. \nAttacks 3 times. Each attack has a 50% chance to hit and deals 2 damage if successful."}
                uses="1"
            />

            <OutlineTextBP size="large">
                Passive Abilities
            </OutlineTextBP>

            <AbilityCard
                image={ActionIdentifier.FERAL_STRIKE}
                name="Feral Strike"
                body={"The user's savage nature causes it to deal crippling blows more easily. \nThis monster triggers a critical hit on a roll of 18-20."}
                uses="Unlimited"
            />

        </div>
    );
}