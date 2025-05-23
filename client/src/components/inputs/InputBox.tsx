import React, { useState } from 'react';

export const InputBox = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        className='bg-merino text=[24px] text-blackCurrant font-[Jua] p-1 pl-4 rounded-[15px] border-[2px] border-blackCurrant'
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id='1'
      />
    </div>
  );
};
