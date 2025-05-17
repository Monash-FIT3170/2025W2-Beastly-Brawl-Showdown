import React from 'react';
import { ButtonGeneric } from './ButtonGeneric';
import { GenericIcon } from '../icons/GenericIcon';

interface IconProps {
  style: 'arrowleft' | 'arrowright' | 'arrowup' | 'arrowdown' | 'x' | 'bars' | 'info' | 'cog'
  buttonColour: 'lightorange' | 'blue' | 'red'
  iconColour: 'black' | 'stroked'
}

export const IconButton = ({style, buttonColour, iconColour}: IconProps) => {
    return (
        <ButtonGeneric size='square' color={buttonColour} >
            <GenericIcon style={style} colour={iconColour} />
        </ButtonGeneric>
    );
};

