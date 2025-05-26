import React from 'react';

interface IconProps {
  style: 'arrowleft' | 'arrowright' | 'arrowup' | 'arrowdown' | 'x' | 'bars' | 'info' | 'cog'
  colour: 'black' | 'stroked'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const GenericIcon = ({style, colour, size}: IconProps) => {

  const styles = {
    'arrowleft': 'M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18',
    'arrowright': 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3',
    'arrowup': 'M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18',
    'arrowdown': 'M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3',
    'x': 'M6 18 18 6M6 6l12 12',
    'bars': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
    'info': 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
    'cog': 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'  
  }

  const colours = {
    'black': 'text-blackCurrant size-8',
    'stroked': 'text-merino size-8'
  }

  const sizes = {
  sm: 'lg:w-4 lg:h-4 sm:w-8 sm:h-8',
  md: 'lg:w-6 lg:h-6 sm:w-16 sm:h-16',  
  lg: 'lg:w-8 lg:h-8 sm:w-24 sm:h-24',   
  xl: 'lg:w-12 lg:h-12 sm:w-26 sm:h-26', 
  }
 
  return(
    <svg 
      className={`${colours[colour]} ${sizes[size]}`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="#403245" 
      viewBox="0 0 24 24" 
      >
      <path 
        fill="none"
        stroke="#403245"
        strokeWidth={4} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d={styles[style]} 
      />
      <path
        fill="none"
        stroke="currentColor" 
        strokeWidth={2} 
        strokeLinecap="round"
        strokeLinejoin="round"
        d={styles[style]} 
      />
    </svg>
  )
  
};