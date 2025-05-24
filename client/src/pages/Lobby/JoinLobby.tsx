import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import LogoResizable from "../../components/logos/LogoResizable";
import { IconButton } from "../../components/buttons/IconButton";
import { InputBox } from "../../components/inputs/InputBox";
import { BlackText } from "../../components/texts/BlackText";

// Used for auto-filling the game code from the URL / QR code
interface JoinLobbyProps {
  gameCode?: string;
}

const JoinLobby: React.FC<JoinLobbyProps> = ({ gameCode }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  // On mount, prefill code from prop
  useEffect(() => {
    if (gameCode) {
      setCode(gameCode);
    }
  }, [gameCode]);

  // Called when 'JOIN ROOM' button is clicked
  const joinSession = () => {
    socket.emit("join-game", { gameCode: code, name: name });
  };

  // Listen for the "join-accept" event from the server
  socket.on("join-accept", ({ gameSessionId }) => {
    console.log(gameSessionId);
    FlowRouter.go(`/session/${gameSessionId}`);
  });

  return (
    <BlankPage>
      <div className="flex lg:flex-row lg:h-1/2 sm:flex-col w-full">
        <div className="flex flex-row w-1/4 sm:h-1/4">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <IconButton
              style="arrowleft"
              iconColour="black"
              buttonColour="red"
              size="medium"
              onClick={() => FlowRouter.go("/")}
            />
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-1/2 sm:h-3/4 lg:items-center sm:items-end justify-around">
          <LogoResizable className="lg:w-1/2 h-full"></LogoResizable> 
        </div>
      </div>
      <div className="flex flex-row h-1/2 w-full items-center justify-around">
        <div className="flex flex-col h-full lg:space-y-6 lg:w-1/4.8 sm:w-1/2 items-center sm:justify-around">
          <div className="w-full lg:max-w-xs">
            <BlackText size="medium">
              Please Enter Room Code:
            </BlackText>
            <InputBox 
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); // remove non-digits
                setCode(numericValue);
              }}
              placeholder="Enter 6-Digit Code"
            />
          </div>

          <div className="w-full lg:max-w-xs">
            <BlackText size="medium">
              Name:
            </BlackText>
            <InputBox 
              maxLength={8}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>

          <ButtonGeneric color="blue" size="medium" onClick={joinSession}>
              <OutlineText size="medium">
                JOIN ROOM
              </OutlineText>
          </ButtonGeneric>
        </div>
      </div>
    </BlankPage>
  );
};

export default JoinLobby;
