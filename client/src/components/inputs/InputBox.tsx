import React from "react";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  pattern?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  id,
  name,
  value,
  maxLength,
  placeholder,
  pattern,
  type = "text",
  onChange,
}: InputProps) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        className="bg-merino lg:text-tiny sm:text-large w-full lg:h-8 sm:h-30 text-blackCurrant font-[Jua] p-1 pl-4 lg:rounded-[15px] sm:rounded-[6rem] border-[2px] border-blackCurrant focus:outline-none"
        type={type}
        value={value ?? ""}
        maxLength={maxLength}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
      />
    </div>
  );
};
