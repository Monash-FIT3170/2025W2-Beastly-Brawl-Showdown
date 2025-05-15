import React, { MouseEventHandler } from 'react';

interface IconXProps {
    onClick?: MouseEventHandler<SVGSVGElement>;
  }

export const IconXPopup = ({ onClick }: IconXProps) => {
  return(
    <svg className="text-darkpurple size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={onClick}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
};