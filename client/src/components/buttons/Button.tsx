
import React from "react";

interface ButtonProps{
    text: string;
    onClick: () => void;
}

export const ButtonDemo = () => {
    return(
        <>
            <button type="button" className="btnAction btnBlue">DEFEND</button> 
            <button type="button" className="btnAction btnRed">ATTACK</button>
            <button type="button" className="btnAction btnDarkYellow">JOIN ROOM</button>

            <button type="button" className="btnGeneric btnRed">CANCEL</button>

            <button type="button" className="btnGeneric btnBlue">SELECT</button>

            <button type="button" className="btnGeneric btnRed">EXIT LOBBY</button>
            <button type="button" className="btnGeneric btnRed">RETURN TO LOBBY</button>
            <button type="button" className="btnUtility btnDarkYellow">MENU</button>
        </>
    );
};