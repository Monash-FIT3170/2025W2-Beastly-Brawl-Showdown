import React, { useState } from 'react';

interface InputBoxProps {
}

export const InputBox = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        className='bg-whiteish text=[24px] text-darkpurple font-[Jua] p-1 pl-4 rounded-[15px] border border-[2px] border-darkpurple'
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id='1'
      />
    </div>
  );
};
