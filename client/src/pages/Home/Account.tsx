import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { InputBox } from "../../components/inputs/InputBox";
import { IconButton } from "../../components/buttons/IconButton";

export const Account = () => {
  interface PlayerAccount {
    _id: string;
    email?: string;
    username?: string;
    password?: string;
    level?: number;
    stats?: {
      numGamesPlayed?: number;
      numGamesWon?: number;
    };
    achievments?: string[];
    monstersStat?: PlayerMonsterStat[];
  }

  // Schema for the Player's monsters stats customization
  interface PlayerMonsterStat {
    monsterId: string;
    maxHealth: number;
    attackBonus: number;
    armourClass: number;
  }

  const [userData, setUserData] = useState<PlayerAccount | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    socket.emit("fetchUserData");

    const handler = ({ user }) => {
      setUserData(user);
    };

    socket.on("userData", handler);
  }, []);

  return (
    <BlankPage>
      {!userData ? (
        <p>Loading account details...</p>
      ) : (
        <div>
          <h1>Account Details</h1>

          {/* Exit Button */}
          <div style={{ position: "absolute", top: "50px", left: "50px" }}>
            <IconButton
              style="arrowleft"
              iconColour="black"
              buttonColour="red"
              size="medium"
              onClick={() => FlowRouter.go("/")}
            />
          </div>

          {/* Details */}
          {editing ? (
            <div className="flex flex-col gap-4">
              <InputBox
                value={formData?.username ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                maxLength={50}
                placeholder="Enter New Username"
              />
              <InputBox
                value={formData?.email ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                maxLength={50}
                placeholder="Enter New Email"
              />
              <InputBox
                value={formData?.password ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                maxLength={50}
                placeholder="Enter New Password"
              />

              <div className="flex gap-4">
                <ButtonGeneric
                  color="blue"
                  size="medium"
                  onClick={() => {
                    socket.emit("updatePlayer", formData); // send to server
                    setUserData((prev) => ({ ...prev, ...formData }));
                    setEditing(false);
                  }}
                >
                  Save
                </ButtonGeneric>

                <ButtonGeneric
                  color="red"
                  size="medium"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </ButtonGeneric>
              </div>
            </div>
          ) : (
            <>
              <OutlineText size="large">
                Username: {userData.username}
              </OutlineText>
              <OutlineText size="large">Email: {userData.email}</OutlineText>
              <OutlineText size="large">Level: {userData.level}</OutlineText>
              <OutlineText size="large">
                Games Played: {userData.stats?.numGamesPlayed}
              </OutlineText>
              <OutlineText size="large">
                Games Won: {userData.stats?.numGamesWon}
              </OutlineText>
              <OutlineText size="large">
                Achievements: {userData.achievments?.join(", ")}
              </OutlineText>
            </>
          )}
          {/* Edit Button */}
          {!editing && (
            <ButtonGeneric
              color="blue"
              size="medium"
              onClick={() => setEditing(true)}
            >
              Edit
            </ButtonGeneric>
          )}
        </div>
      )}
    </BlankPage>
  );
};
