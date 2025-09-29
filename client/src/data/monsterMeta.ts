import { MonsterIdentifier } from "/types/single/monsterState";

export interface MonsterMeta {
  name: string;
  description: string;
}

export const monsterMeta: Record<MonsterIdentifier, MonsterMeta> = {
  [MonsterIdentifier.POUNCING_BANDIT]: {
    name: "Pouncing Bandit",
    description:
      "Enter the Grasslands where happy slime families live. Beware you may encounter a purple beast.",
  },
  [MonsterIdentifier.CINDER_TAIL]: {
    name: "Cinder Tail",
    description:
      "Venture forth into the Basalt Cliffs where you’ll find a mysterious dragon whose flames burn bright.",
  },
  [MonsterIdentifier.FURIOUS_FLIPPER]: {
    name: "Furious Flipper",
    description:
      "Dive into the Arctic where currents run fast. A very angry penguin guards the icy waters.",
  },
  [MonsterIdentifier.POISON_POGO]: {
    name: "Poison Pogo",
    description:
      "Wade through the Marsh where toxic mushrooms grow. Beware of the frog with a poisonous tongue.",
  },
  [MonsterIdentifier.CHARMER_COBRA]: {
    name: "Charmer Cobra",
    description:
      "Explore the Desert Dunes where melodies carry far. A serpent waits to hypnotise intruders.",
  },
};
