import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { InputBox } from "../../components/inputs/InputBox";
import { IconButton } from "../../components/buttons/IconButton";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
// Schema types
interface PlayerMonsterStatSchema {
  monsterId: string;
  monsterName: string;
  maxHealth: number;
  attackBonus: number;
  armourClass: number;
}

interface AdventureProgressionSchema {
  unlockedMonsters: Record<string, boolean>;
  unlockedLevels: number[];
  stage: number;
  achievements: string[];
  savedGameState: {};
}

interface PlayerAccountSchema {
  _id: string;
  email?: string;
  username?: string;
  password?: string;
  level?: number;
  online?: boolean;
  stats?: {
    numGamesPlayed?: number;
    numGamesWon?: number;
  };
  achievements?: string[];
  monstersStat?: PlayerMonsterStatSchema[];
  adventureProgression?: AdventureProgressionSchema;
}

export const Account = () => {
  const [userData, setUserData] = useState<PlayerAccountSchema | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<PlayerAccountSchema | null>(null);

  useEffect(() => {
    socket.emit("fetchUserData");

    const handler = ({ user }) => {
      setUserData(user);
    };

    socket.on("userData", handler);
    return () => socket.off("userData", handler);
  }, []);

  const startEditing = () => {
    setFormData({
      ...userData,
      username: "",
      email: "",
      password: "",
    });
    setEditing(true);
  };

  const Logout = () => {
    socket.emit("logout");
    socket.on("logoutSuccessful", () => {
      FlowRouter.go("/");
    });
  };

  const handleSave = () => {
    if (formData) {
      const updatedUser = {
        ...userData,
        username: formData.username || userData?.username,
        email: formData.email || userData?.email,
        password: formData.password || null,
      };
      socket.emit("updatePlayer", updatedUser);
      setUserData(updatedUser);
      setEditing(false);
    }
  };

  return (
    <BlankPage>
      <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
        {/* Back button stays exactly as-is */}
        <div className="flex flex-row w-1/8 sm:h-1/2">
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

        {/* Center everything else */}
        <div className="flex flex-col items-center w-full mt-4 sm:mt-6 gap-8 ml-0 sm:ml-[-100px]">
          {" "}
          {/* Header */}
          <div className="flex justify-center">
            <BaseCard color="peach" width={50} height={8}>
              <OutlineText size="extraLarge">MY ACCOUNT</OutlineText>
            </BaseCard>
          </div>
          {/* Profile + Stats + Buttons */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 mt-8 w-full">
            {!userData ? (
              <p>Loading account details...</p>
            ) : editing ? (
              <>
                {/* Profile Editing */}
                <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] flex flex-col gap-4 sm:gap-6 border-2 border-black max-w-[600px] w-full">
                  <div className="text-center">
                    <OutlineText size="large">Profile</OutlineText>
                  </div>

                  <OutlineText size="medium">Username:</OutlineText>
                  <InputBox
                    value={formData?.username ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        username: e.target.value,
                      }))
                    }
                    maxLength={50}
                    placeholder="Enter New Username"
                  />

                  <OutlineText size="medium">Email:</OutlineText>
                  <InputBox
                    value={formData?.email ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        email: e.target.value,
                      }))
                    }
                    maxLength={50}
                    placeholder="Enter New Email"
                  />

                  <OutlineText size="medium">Password:</OutlineText>
                  <InputBox
                    value={formData?.password ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        password: e.target.value,
                      }))
                    }
                    maxLength={50}
                    placeholder="Enter New Password"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ButtonGeneric
                    color="blue"
                    size="medium"
                    onClick={handleSave}
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
              </>
            ) : (
              <>
                {/* Profile Info */}
                <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black max-w-[600px] w-full relative">
                  <div className="text-center mb-4">
                    <OutlineText size="large">Profile</OutlineText>
                  </div>
                  <OutlineText size="medium">
                    Username: {userData.username}
                  </OutlineText>
                  <OutlineText size="medium">
                    Email: {userData.email}
                  </OutlineText>

                  {/* Edit button bottom-right */}
                  <div className="absolute bottom-4 right-4">
                    <ButtonGeneric
                      color="blue"
                      size="medium"
                      onClick={startEditing}
                    >
                      Edit Profile
                    </ButtonGeneric>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black max-w-[600px] w-full">
                  <div className="text-center mb-4">
                    <OutlineText size="large">Stats</OutlineText>
                  </div>
                  <OutlineText size="medium">
                    Games Played: {userData.stats?.numGamesPlayed ?? 0}
                  </OutlineText>
                  <OutlineText size="medium">
                    Games Won: {userData.stats?.numGamesWon ?? 0}
                  </OutlineText>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ButtonGeneric
                    color="purple"
                    size="medium"
                    onClick={() => FlowRouter.go("/achievements")}
                  >
                    Achievements
                  </ButtonGeneric>
                  <ButtonGeneric color="red" size="medium" onClick={Logout}>
                    Logout
                  </ButtonGeneric>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </BlankPage>
  );
};
