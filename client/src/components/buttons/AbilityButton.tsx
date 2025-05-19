import React, { useState } from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";

interface AbilityButtonProp{
    ability: string;
    imageName: string;
    amountAllowed: number;
    onClick: () => void;
}

export const AbilityButton = ({onClick, imageName, ability, amountAllowed}: AbilityButtonProp) => {

    const [count, setCount] = useState(0);
    const isDisabled = count >= amountAllowed;

    const handleClick = () => {
        if (isDisabled) return;
        setCount(count + 1);
        onClick();
    };
    
    const image =
        `
        mx-13
        w-[30%]
        h-auto
        object-contain
        `;

    return(
        <ButtonGeneric color='purple' size='large' isDisabled={isDisabled} onClick={handleClick}>
            <div className="w-[50%] h-auto leading-[0.8]">
                <OutlineText size = 'large'>
                    {ability}
                </OutlineText>
            </div>
            <img className = {`${image}`} src={`${imageName}.png`} alt={`${imageName} image`}/>
        </ButtonGeneric>
    )

}