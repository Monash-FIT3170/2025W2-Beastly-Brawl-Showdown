import React from "react";

interface ButtonProps {
  text: string;       // Accept the text prop
  onClick: () => void; // Accept the onClick prop
}

export const ButtonDemo = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick} // Use the onClick handler passed as a prop
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-sans font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {text} {/* Render the custom button text */}
    </button>
  );
};
