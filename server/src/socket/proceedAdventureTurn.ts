import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";
import { AttackAction } from "../../model/game/action/attack";
import { TipTheScalesAbilityAction } from "../../model/game/action/ability/tipTheScales";
import { Adventure } from "../model/game/adventure";

export default function proceedAdventureTurn(
  io: Server,
  socket: Socket,
  adventure: Adventure,
  battle: Battle
) {
  //TODO: figure out what goes here / if necessary
  //THIS MIGHT ONLY EXIST FOR THE TIMER -> NO LONGER EXISTS.
  io.to(adventure.getId()).emit(
    "adventure_state",
    battle.getBattleState(adventure.getId())
  );

  setTimeout(() => {
    //   if (gameSession.areBattlesConcluded()) {
    //     console.log(
    //       `All battles are concluded in game session ${gameSession.getGameCode()}`
    //     );

    //     //TODO: for future, this can be used to handle what happens after a game session ends

    //     socket.emit("game_session_ended", {
    //       message: `Game session ${gameSession.getGameCode()} has ended.`,
    //     });
    //     return;
    //   }

    proceedAdventureTurn(io, socket, adventure, battle);
  }, 3000);
}
