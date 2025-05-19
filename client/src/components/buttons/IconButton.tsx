import React from 'react';
import { ButtonGeneric } from './ButtonGeneric';
import { GenericIcon } from '../icons/GenericIcon';

interface IconProps {
  style: 'arrowleft' | 'arrowright' | 'arrowup' | 'arrowdown' | 'x' | 'bars' | 'info' | 'cog'
  buttonColour: 'ronchi' | 'blue' | 'red'
  iconColour: 'black' | 'stroked'
  isDisabled?: boolean
}

export const IconButton = ({style, buttonColour, iconColour, isDisabled}: IconProps) => {
    return (
        <ButtonGeneric size='square' color={buttonColour} isDisabled={isDisabled}>
            <GenericIcon style={style} colour={iconColour} />
        </ButtonGeneric>
    );
};

