import React, {useEffect, useState} from "react";
import { BlueButton } from "./BlueButton";

interface DefendButtonProps{
    charges: number;
}

export const DefendButton = ({charges}: DefendButtonProps) => {

    const [defenceCharges, setDefenceCharges] = useState(charges);
    useEffect(() =>{
        setDefenceCharges(charges)
    }, [charges]
    )

    return(
        

        <div>
            <BlueButton text = 'DEFEND' onClick={() => console.log("This is defence")}/>
            <div 
                className="bg-plainyellow 
                            font-[Jua] font-medium
                            text-black
                            rounded-full
                            border border-[4px] border-darkpurple
                            w-min
                            content-center">
                {defenceCharges}
            </div>
        </div>
    )
};