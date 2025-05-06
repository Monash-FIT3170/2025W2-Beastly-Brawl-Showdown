import { Monster, MonstersCollection } from "/types/monster";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { MonsterIcon } from "../../components/player-screen/monsters/MonsterIcon";

//This needs to be overhauled with chosen creative components
export const ChooseMonsterScreen = () => {
  const isLoading = useSubscribe("monsters");
  const monsters: Monster[] = useTracker(() =>
    MonstersCollection.find({}).fetch()
  );

  return (
    <>
      <h1>Choose your monster</h1>

      <div className="flex flex-wrap">
        {monsters.map((monster) => (
          <MonsterIcon name={monster.name} image={monster.image} />
        ))}
      </div>
    </>
  );
};
