import { BotPlayer } from "./botplayer";
import { Player } from "./player";
import { Action } from "./action/action";

export class ActionRandomiser {
    constructor(private botPlayer: BotPlayer) {}

    public randomaction(player: Player) {
        if (!player) return;

        const monster = this.botPlayer.getMonster();
        if (!monster) return;

        // Get the current possible actions
        const possibleActions: Action[] = monster.getPossibleActions() ?? [];
        if (possibleActions.length === 0) return;

        // Filter usable actions
        const usableActions = possibleActions.filter(
            action => action.getCurrentUse() > 0
        );
        if (usableActions.length === 0) return;

        // Pick a random usable action
        console.log("erjnfikjeunfikeujn")
        const randomIndex = Math.floor(Math.random() * usableActions.length);
        const actionToAdd = usableActions[randomIndex];

        player.addAction(actionToAdd);
    }
}

