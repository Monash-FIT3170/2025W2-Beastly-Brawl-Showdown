import React from "react";
import { InputBox } from "../inputs/InputBox";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";

const JoinGameForm = () => {

    return (
        <div className='flex flex-col items-center w-1/3 h-72 space-y-4 m-1 rounded-2xl'>
            <div className="pr-18">
                <BlackText text='Enter Room Code:' size='Medium' />
            </div>
            <InputBox />
            <div className="pr-30">
                <BlackText text='Your Name:' size='Medium' />
            </div>
            <InputBox />
            <ButtonGeneric color='lightorange' size='medium' >
                <OutlineText text='Join' size="medium" />
            </ButtonGeneric>
        </div>
    );
};

export default JoinGameForm;