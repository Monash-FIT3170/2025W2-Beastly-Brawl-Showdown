import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";

const WinnerScreen: React.FC = () => {
  const [playerMonster, setPlayerMonster] = useState<string>("");

  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });

  const leave = () => {
    socket.emit('leave-game', {userID:socket.id})
    FlowRouter.go("/")
  };

  useEffect(() => {
    // TO DO: Replace this with real player's monster data
  });
  
  return (
      <div className="bg-peach lg:p-[1.25rem] sm:p-[3rem] h-screen w-min-screen overflow-hidden flex flex-col justify-around">
        {/* Monster Image - Centered */}
        <div className="flex justify-center">
          {/* Currently no image to show for draw. Showing Loser screen for now since the monster still dies */}
          <MonsterImageResizable name="LOSER" width={30} height={30} /> 
        </div>

        <div className="flex justify-center">
          <BlackText size="large">IT'S A DRAW!</BlackText>
        </div>
  
        <div className="bg-goldenRod outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center p-4">
          {/* For now, EXIT just changes the screen to the home page. TODO: Route users who exit the game appropriately + disconnects them from battle appropriately */}
          <ButtonGeneric
            color="red"
            size="medium"
            onClick={() => leave()}
          >
            <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
              <div>
                <OutlineText size="medium">EXIT LOBBY</OutlineText>
              </div>
            </div>
          </ButtonGeneric>
        </div>
      </div>
    );
};

export default WinnerScreen;