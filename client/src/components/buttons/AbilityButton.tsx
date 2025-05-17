import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";

interface AbilityButtonProp{
    ability: string;
    imageName: string;
    onClick: () => void;
}

export const AbilityButton = ({onClick, imageName, ability}: AbilityButtonProp) => {
    
    const image =
        `
        mx-13
        w-[25%]
        h-auto
        object-contain
        `;

    return(
        <ButtonGeneric color='purple' size='large' isDisabled={false} >
            <div className="w-[50%] h-auto leading-[0.8]">{ability}</div>
            <img className = {`${image}`} src={`${imageName}.png`} alt={`${imageName} image`}/>
        </ButtonGeneric>
    )

}