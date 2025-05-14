import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { players, battles } from "../../../main";

export const startBattleHandler = (io: Server, socket: Socket) => {
  socket.on("start_battle", () => {
    if (players.size == 2) {
      console.log(`Made it to startBattleHandler`);
      let playersList = Array.from(players.values());

      let battleId = crypto.randomUUID();
      console.log(`Battle made`);
      let battle = new Battle(battleId, playersList[0], playersList[1]);

      battles.set(battleId, battle);

      playersList.forEach((player) => {
        io.sockets.sockets.get(player.getId())?.join(battleId);
      });

      io.to(battleId).emit("go_to_character_select", { battleId }); // Emit to both players to navigate to character select screen
    }
  });
};

export const ContinueBattle = (io: Server, socket: Socket) => {};
