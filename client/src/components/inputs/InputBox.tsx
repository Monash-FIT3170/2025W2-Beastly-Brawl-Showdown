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
        className='bg-merino text=[24px] w-full text-blackCurrant font-[Jua] p-1 pl-4 rounded-[15px] border-[2px] border-blackCurrant focus:outline-none'
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
