import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";

interface AbilityButtonProp{
    ability: string;
    imageName: string;
    onClick: () => void;
}

export const AbilityButton = ({onClick, imageName, ability}: AbilityButtonProp) => {
    
    const image =
        `
        mx-13
        w-[30%]
        h-auto
        object-contain
        `;

    return(
        <ButtonGeneric color='purple' size='large' isDisabled={false} onClick={onClick}>
            <div className="w-[50%] h-auto ">
                <OutlineText size = 'large'>
                    <span className="whitespace-normal leading-[0.8]">
                        {ability}
                    </span>
                </OutlineText>
            </div>
            <img className = {`${image}`} src={`${imageName}.png`} alt={`${imageName} image`}/>
        </ButtonGeneric>
    )

}