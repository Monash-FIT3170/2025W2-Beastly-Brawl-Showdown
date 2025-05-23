import React from 'react';
import { ButtonGeneric } from './ButtonGeneric';
import { GenericIcon } from '../icons/GenericIcon';

interface IconProps {
  style: 'arrowleft' | 'arrowright' | 'arrowup' | 'arrowdown' | 'x' | 'bars' | 'info' | 'cog'
  buttonColour: 'ronchi' | 'blue' | 'red'
  iconColour: 'black' | 'stroked'
  size: 'small' | 'medium'
  isDisabled?: boolean
  onClick?: () => void;
}

export const IconButton = ({style, buttonColour, iconColour, size, isDisabled, onClick}: IconProps) => {

    const buttonSize = {
		'small': "square",
        'medium': "squaremedium"
		}

    return (
        <ButtonGeneric size={buttonSize[size]} color={buttonColour} isDisabled={isDisabled} onClick={onClick}>
            <GenericIcon style={style} colour={iconColour} />
        </ButtonGeneric>
    );
};

