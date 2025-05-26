import { Input } from 'postcss';
import React, { useState } from 'react';

interface InputProps {
    value?: string
    maxLength?: number
    placeholder?: string
    pattern?: string
    onChange?: (e: any) => void
}

export const InputBox = ({value, maxLength, placeholder, pattern, onChange}: InputProps) => {

  return (
    <div>
      <input
        className='bg-merino lg:text-tiny sm:text-large w-full lg:h-8 sm:h-30 text-blackCurrant font-[Jua] p-1 pl-4 lg:rounded-[15px] sm:rounded-[6rem] border-[2px] border-blackCurrant focus:outline-none'
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
      />
    </div>
  );
};
