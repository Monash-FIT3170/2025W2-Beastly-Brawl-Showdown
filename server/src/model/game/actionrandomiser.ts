import { BotPlayer } from "./botplayer";
import { Player } from "./player";
import { ActionIdentifier } from "/types/single/actionState";
import { Action } from "./action/action";
export class ActionRandomiser{
    private possibleActions: Action[]
    constructor(player: BotPlayer){
        this.possibleActions = player.getMonster().getPossibleActions()
    }
    public randomaction(player: Player) {
        if (!player) return;


        const usableActions = this.possibleActions.filter(
            action => action.getCurrentUse() < action.getMaxUse()
        );

        const randomIndex = Math.floor(Math.random() * usableActions.length);
        const actionToAdd = usableActions[randomIndex];

        player.addAction(actionToAdd);
            }
    }

