import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";

interface AttackButtonProp{
    onClick: () => void;
}

export const AttackButton = ({onClick}: AttackButtonProp) => {
    
    const image =
		`
		ml-auto
        w-[25%]
        h-[auto%]
        object-contain
		`;

    return(
        <ButtonGeneric color='red' size='large' isDisabled={false} >
            Attack 
            <img className = {`${image}`} src={`AttackButtonImage.png`} alt={`AttackButtonImage image`}/>
        </ButtonGeneric>
    )

}