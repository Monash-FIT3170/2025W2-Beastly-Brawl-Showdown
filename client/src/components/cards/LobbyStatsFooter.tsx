import React, {ReactNode} from "react";
import { GenericFooter } from "./GenericFooter";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";

interface LobbyStatsFooterProps{
    /**This will be type monster*/
    monster: string;
}

export const LobbyStatsFooter = ({ monster } : LobbyStatsFooterProps) => {
    return (

        <div>
        <GenericFooter>
            <OutlineText size = 'large'>
                Lobby Stats
            </OutlineText>
            <div className="text-center">
            <OutlineText size = 'medium'>
                Battles Won: <br/>
                Most Damage Dealt: <br/>
                Ability Uses: <br/>
                Critical Hits Dealt: <br/>
                Successful Blocks: <br/>
                {monster}
            </OutlineText>
            </div>
            <ButtonGeneric color='red' size='medium'>
                <OutlineText size = 'large'>
                    Exit Lobby
                </OutlineText>
            </ButtonGeneric>
        </GenericFooter>
        </div>
        
    );
}
