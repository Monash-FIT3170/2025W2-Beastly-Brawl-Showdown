import React from 'react';
import { ButtonGeneric } from './ButtonGeneric';
import { GenericIcon } from '../icons/GenericIcon';

interface IconProps {
  style: 'arrowleft' | 'arrowright' | 'arrowup' | 'arrowdown' | 'x' | 'bars' | 'info' | 'cog'
  buttonColour: 'ronchi' | 'blue' | 'red'
  iconColour: 'black' | 'stroked'
  isDisabled?: boolean
  onClick?: () => void;
}

export const IconButton = ({style, buttonColour, iconColour, isDisabled, onClick}: IconProps) => {
    return (
        <ButtonGeneric size='square' color={buttonColour} isDisabled={isDisabled} onClick={onClick}>
            <GenericIcon style={style} colour={iconColour} />
        </ButtonGeneric>
    );
};

