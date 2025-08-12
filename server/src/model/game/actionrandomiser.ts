import { Player } from "./player";
import { ActionIdentifier } from "/types/single/actionState";
export class ActionRandomiser{
    public randomaction(player:Player){
            var actionToAdd = player?.getMonster().getAction(ActionIdentifier.ATTACK);
        
            if (actionToAdd) {
                player?.addAction(actionToAdd);
            }
    }
}