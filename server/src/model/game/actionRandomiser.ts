import { Player } from "./player";
import { Action } from "./action/action";

export class ActionRandomiser {
  constructor() {}

  static randomAction(player: Player): void {
    if (!player) {
      console.error(`Random Action Failed - Player Invalid ${player}`);
      return;
    }

    // Get the player's monster
    const monster = player.getMonster();
    if (!monster) {
      console.error(
        `Random Action Failed - Monster Invalid ${monster}, for Player: ${player}`
      );
      return;
    }
    console.log(
      "Random Action Debug: Bot Statuses",
      player.getStatuses().map((status) => status.getName())
    );

    // Get the current possible actions
    const monsterActions: Action[] = monster.getPossibleActions() ?? [];
    if (monsterActions.length === 0) {
      console.error(`Random Action Failed - No Possible Actions`);
      return;
    }
    console.log(
      "Possible Random Actions:",
      monsterActions.map((action) => action.getName())
    );

    // Filter usable actions
    const usableActions = monsterActions.filter(
      (action) => action.getCurrentUse() > 0
    );
    // console.log(
    //   "Bot Usable Actions:",
    //   usableActions.map((action) => action.getName())
    // );
    if (usableActions.length == 0) {
      console.log(`No Random Action Selected: No Usable Actions`);
      return;
    }

    // Pick a random usable action
    const randomIndex = Math.floor(Math.random() * usableActions.length);
    const actionToAdd = usableActions[randomIndex];
    console.log("Random Action Selected:", actionToAdd.getName());

    //Used to test slime boost
    // player.addAction(usableActions[usableActions.length - 1]);

    player.addAction(actionToAdd);
  }
}
