import { MonsterIdentifier } from "/types/single/monsterState";

export interface MonsterMeta {
  name: string;
  description: string;
}

export const monsterMeta: Record<MonsterIdentifier, MonsterMeta> = {
  [MonsterIdentifier.POUNCING_BANDIT]: {
    name: "Pouncing Bandit",
    description:
      "Enter the grasslands where happy slime families live. Beware you may encounter a purple beast.",
  },
  [MonsterIdentifier.CINDER_TAIL]: {
    name: "Cinder Tail",
    description:
      "Venture forth into the Basalt Cliffs where you’ll find a mysterious dragon whose flames burn bright.",
  },
  [MonsterIdentifier.FURIOUS_FLIPPER]: {
    name: "Furious Flipper",
    description:
      "Dive into the coral shallows where currents run fast. A mischievous dolphin lurks here.",
  },
  [MonsterIdentifier.POISON_POGO]: {
    name: "Poison Pogo",
    description:
      "Wade through the swamp where toxic lilies bloom. Beware of a frog that leaps with venom.",
  },
  [MonsterIdentifier.CHARMER_COBRA]: {
    name: "Charmer Cobra",
    description:
      "Explore the desert dunes where melodies carry far. A serpent waits to hypnotise intruders.",
  },
};
