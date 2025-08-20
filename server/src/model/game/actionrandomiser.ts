import { BotPlayer } from "./botplayer";
import { Player } from "./player";
import { Action } from "./action/action";

export class ActionRandomiser {
    private possibleActions: Action[];

    constructor(player: BotPlayer) {
        const monster = player.getMonster();
        this.possibleActions = monster?.getPossibleActions() ?? [];
    }

    public randomaction(player: Player) {
        if (!player || this.possibleActions.length === 0) return;

        // Filter only actions that can still be used
        const usableActions = this.possibleActions.filter(
            action => action.getCurrentUse() < action.getMaxUse()
        );

        if (usableActions.length === 0) return; // no actions available

        // Pick a random usable action
        const randomIndex = Math.floor(Math.random() * usableActions.length);
        const actionToAdd = usableActions[randomIndex];

        player.addAction(actionToAdd);
    }
}

