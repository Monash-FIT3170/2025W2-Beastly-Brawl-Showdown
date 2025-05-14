import { Server, Socket } from "socket.io";
import { battles } from "../../../main";
import { ActionState } from "/types/single/actionState";

export const actionSelectedHandler = (io: Server, socket: Socket) => {
  // Listen for the 'action_selected' event from the client
  socket.on(
    "action_selected",
    ({
      action,
      battleId,
      playerId,
    }: {
      action: ActionState;
      battleId: string;
      playerId: string;
    }) => {
      console.log(
        `Action received: ${action} for battleId: ${battleId} for player: ${playerId}`
      );

      var battle = battles.get(battleId);

      var player = battle?.getPlayer(playerId);

      var actionToAdd = player?.getMonster().getAction(action.id);

      if (actionToAdd) {
        player?.addAction(actionToAdd);
        console.log(`Adding action | Player: ${playerId}`, actionToAdd);
        // Log adding action to the plauer
        // console.log(`Action ${actionToAdd.getName()} added to player ${player?.getName()}`);
      }
    }
  );
};
