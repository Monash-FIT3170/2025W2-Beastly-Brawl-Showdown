import { Server, Socket } from "socket.io";
import { activeAdventures, players } from "../../main";
import { Adventure } from "../model/game/adventure";
import { Player } from "../model/game/player";
import { MonsterIdentifier } from "/types/single/monsterState";
import { RockyRhino } from "../model/game/monster/rockyRhino";
import { PouncingBandit } from "../model/game/monster/pouncingBandit";
import { CinderTail } from "../model/game/monster/cinderTail";
import { PoisonFrog } from "../model/game/monster/poisonFrog";
import { FuriousFlipper } from "../model/game/monster/furiousFlipper";
import { CharmerCobra } from "../model/game/monster/charmerCobra";
import { Battle } from "../model/game/battle";
import proceedAdventureTurn from "./proceedAdventureTurn";

export const adventureModeHandler = (io: Server, socket: Socket) => {
  //todo sockets:
  // receive monster selection
  // send to stage 1 => battle (for now)
  //battle sockets stuff

  //need to add player to the socket

  //adventure_monster_selected
  socket.on(
    "adventure_monster_selected",
    ({ monsterID }: { monsterID: MonsterIdentifier }) => {
      //creating the adventure with the player
      //TODO: GET REAL NAME NOT ANIKA
      const player = new Player(socket.id, "Anika");
      const bot = new Player("Bot", "Bot");
      const monster = getMonster(monsterID);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterID}`);
        return;
      }
      player.setMonster(monster);
      bot.setMonster(new CharmerCobra());
      players.set(socket.id, player);
      players.set("Bot", bot);
      //   console.log("Player", player);
      //TODO: GET ACTUAL LEVEL.
      const adventure = new Adventure(player, 1);
      activeAdventures.set(socket.id, adventure);
      //   console.log("Adventure", adventure);
      //add player to adventure
      //   socket.join(`adventure-${socket.id}`);
      //TODO: initialise battle properly
      const battle = new Battle(crypto.randomUUID(), player, bot, socket.id);
      //   console.log("Battle", battle);
      proceedAdventureTurn(io, socket, adventure, battle);
    }
  );

  socket.on("action_added", () => {});
};

const monsterMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => new RockyRhino()],
  [MonsterIdentifier.POUNCING_BANDIT, () => new PouncingBandit()],
  [MonsterIdentifier.CINDER_TAIL, () => new CinderTail()],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => new FuriousFlipper()],
  [MonsterIdentifier.POISON_FROG, () => new PoisonFrog()],
  [MonsterIdentifier.CHARMER_COBRA, () => new CharmerCobra()],
]);

function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}
