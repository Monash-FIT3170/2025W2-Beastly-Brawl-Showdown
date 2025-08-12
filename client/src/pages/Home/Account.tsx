import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";

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
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </BlankPage>
  );
};
