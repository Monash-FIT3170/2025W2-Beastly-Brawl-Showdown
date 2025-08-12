import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";
import { GenericIcon } from "../../components/icons/GenericIcon";

export const Account = () => {
  interface PlayerAccount {
    email: string;
    username: string;
    password: string;
    level: number;
    stats: {
      numGamesPlayed: number;
      numGamesWon: number;
    };
    achievments: string[];
    monstersStat: PlayerMonsterStat[];
  }

  // Schema for the Player's monsters stats customization
  interface PlayerMonsterStat {
    monsterId: string;
    maxHealth: number;
    attackBonus: number;
    armourClass: number;
  }

  const [userData, setUserData] = useState<PlayerAccount | null>(null);

  useEffect(() => {
    socket.emit("fetchUserData");

    const handler = ({ user }) => {
      setUserData(user);
    };

    socket.on("userData", handler);

    return () => {
      socket.off("userData", handler);
    };
  }, []);

  return (
    <BlankPage>
      {!userData ? (
        <p>Loading account details...</p>
      ) : (
        <div>
          <h1>Account Details</h1>
          <div style={{ position: "absolute", top: "50px", left: "100px" }}>
            <ButtonGeneric
              color="red"
              size="small"
              onClick={() => {
                FlowRouter.go(`/`);
              }}
            >
              <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
                <GenericIcon style="x" colour="stroked" />
              </div>
            </ButtonGeneric>
          </div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Level: {userData.level}</p>
          <p>Games Played: {userData.stats.numGamesPlayed}</p>
          <p>Games Won: {userData.stats.numGamesWon}</p>
          <p>Achievements: {userData.achievments}</p>
        </div>
      )}
    </BlankPage>
  );
};
