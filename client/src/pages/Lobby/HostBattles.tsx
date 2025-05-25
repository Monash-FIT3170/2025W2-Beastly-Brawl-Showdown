import React, { useState } from "react";
import Battle from "../../types/battle";
import { BattleState } from "/types/composite/battleState";
import { LogoDisplay } from "../../components/logo/Logo";
import socket from "../../socket";

interface HostBattlesProps {
  gameCode?: string;
}

const HostBattles: React.FC<HostBattlesProps> = ({ gameCode }) => {
  const code = gameCode; // Currently unused, used for potential page changes
  const [battles, setBattles] = useState<BattleState[]>([]);
  const [battleCount, setBattleCount] = useState(0);

  // LISTENERS:
  // Listen for the "battles-created" event from the server
  socket.on("battles-created", ({ message, battles }) => {
    console.log(message);

    // Update page contents according to session
    console.log("players from server:", battles);
    if (Array.isArray(battles)) {
      setBattles(battles);
      setBattleCount(battles.length);
    } else {
      console.error("'battles' is not an array", battles);
    }
  });

  return (
    <div className="min-h-screen p-4">
      {/* Responsive header section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0"></div>

        {/* Heading in the center */}
        <div className="flex-1 min-w-[200px] text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
            Game Has Started! <p></p>
          </h2>
        </div>

        {/* Something on the right */}
        <div className="flex-shrink-0"></div>
      </div>

      {/* Lobby Info */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
          {battles.map((battle) => (
            <div
              key={battle.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 shadow-sm"
            >
              <p className="text-lg font-medium truncate">
                {battle.yourPlayer.name} vs {battle.opponentPlayer.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostBattles;
