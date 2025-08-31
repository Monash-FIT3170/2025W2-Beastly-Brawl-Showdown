import BattleHeader from "../../components/player-screen/BattleHeader";
import { ArchetypeIdentifier, MonsterIdentifier } from "/types/single/monsterState";

export const TestPage = () => {
    console.log("Rendering TestPage");

    const dummyID = crypto.randomUUID();

    const dummyMonster = {
      id: MonsterIdentifier.ROCKY_RHINO,
      archetypeId: ArchetypeIdentifier.ATTACKER,
      name: "Dude",
      description: "Dude",
    
      maxHealth: 20,
      attackBonus: 10,
      armourClass: 10,
    
      possibleActions: [],
    };

    const dummyPlayer = {
      id: "1",
      name: "Test",
    
      currentHealth: 10,
      currentAttackStat: 10,
      currentArmourClassStat: 10,
      // initialHealth: number;
      // monsterName: string;
      successBlock: 10,
      successHit: 10,
    
      statuses: [],
    
      monster: dummyMonster,
    
      logs: [],
      battleLogs: [],
    };

    const dummyState = {
        id: dummyID,
        turn: 1,
        yourPlayer: dummyPlayer,
        yourPlayerMonster: dummyMonster,
        opponentPlayer: dummyPlayer,
        opponentPlayerMonster: dummyMonster,
        isOver: false,
    };

    return(
        <div>
            <BattleHeader battleState={dummyState} /> 
            <div>THIS IS A TEST PAGE</div>
        </div>
    );
};