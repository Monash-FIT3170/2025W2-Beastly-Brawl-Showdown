import React from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";

export const JoinLobby = () => (
  <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
    <button
      onClick={() => {}}
      className="absolute top-4 left-4 bg-red-400 text-black px-4 py-3 rounded hover:bg-red-500 text-3xl font-bold"
    >
      ←
    </button>

    <LogoDisplay size="3xl"/>

    <div className="w-full max-w-xs mb-6">
      <h3 className="text-left text-xl font-bold mb-2">Please Enter Room Code:</h3>
      <input
        type="text"
        id="code"
        className="border-2 border-green-500 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Enter 6-Digit Code"
      />
    </div>

    <div className="w-full max-w-xs mb-6">
      <h3 className="text-left text-xl font-bold mb-2">Name:</h3>
      <input
        type="text"
        id="name"
        className="border-2 border-green-500 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Enter Your Name"
      />
    </div>

    <div className="mt-8">
      <ButtonDemo text="JOIN ROOM" onClick={() => {}} />
    </div>
  </div>
);
