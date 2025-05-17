import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";

interface AttackButtonProp{
    onClick: () => void;
}

export const AttackButton = ({onClick}: AttackButtonProp) => {
    
    const image =
		`
		ml-2 
        w-[100%]
        h-[100%]
        object-contain
		`;

    return(
        <ButtonGeneric color='red' size='medium' isDisabled={false} >
            Attack 
            <img className = {`${image}`} src={`AttackButtonImage.png`} alt={`AttackButtonImage image`}/>
        </ButtonGeneric>
    )

}