import React from "react";
import { BlueButton } from "./BlueButton";

export const DefendButton = (charges: number) => {
    return(
        <div>
            <BlueButton text = 'DEFEND' onClick={() => console.log("This is defence")}/>
            <div>
                {charges}
            </div>
        </div>
    )
};