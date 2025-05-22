import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";

interface AttackButtonProp{
    onClick: () => void;
}

export const AttackButton = ({onClick}: AttackButtonProp) => {
    
    const image =
		`
		ml-auto
        w-[30%]
        h-[auto%]
        object-contain
		`;

    return(
        <ButtonGeneric color='red' size='battle' isDisabled={false} onClick={onClick}>
            <OutlineText size = 'medium'>
                ATTACK
            </OutlineText>
            
            <img className = {`${image}`} src={`AttackButtonImage.png`} alt={`AttackButtonImage image`}/>
        </ButtonGeneric>
    )

}