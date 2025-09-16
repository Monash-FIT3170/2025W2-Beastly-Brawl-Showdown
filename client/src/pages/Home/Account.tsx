import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { InputBox } from "../../components/inputs/InputBox";
import { IconButton } from "../../components/buttons/IconButton";
import { GenericHeader } from "../../components/cards/GenericHeader";

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
    FlowRouter.go("/");
  };

  const handleSave = () => {
    if (formData) {
      const updatedUser = {
        ...userData,
        username: formData.username || userData?.username,
        email: formData.email || userData?.email,
        password: formData.password || userData?.password,
      };
      socket.emit("updatePlayer", updatedUser);
      setUserData(updatedUser);
      setEditing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full border-b  shadow z-20">
        {/* Return button */}
        <div className="absolute top-2 sm:top-6 left-2 sm:left-6 z-50">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/")}
          />
        </div>

        {/* Header text */}
        <div className="py-6 sm:py-8">
          <GenericHeader color="lightYellow">
            <OutlineText size="extraLarge">Account Details</OutlineText>
          </GenericHeader>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-6 sm:gap-8 mt-[120px] sm:mt-[160px]">
        {!userData ? (
          <p>Loading account details...</p>
        ) : editing ? (
          <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[600px] sm:max-w-[900px] mx-auto">
            {/* Profile Editing */}
            <div className="mt-4 sm:mt-0 p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] flex flex-col gap-4 sm:gap-6 border-2 border-black">
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
                  setFormData((prev) => ({ ...prev!, email: e.target.value }))
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
              <ButtonGeneric color="blue" size="medium" onClick={handleSave}>
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
          <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[600px] sm:max-w-[900px] mx-auto">
            {/* Profile Info */}
            <div className="relative p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center mb-4">
                <OutlineText size="large">Profile</OutlineText>
              </div>
              <OutlineText size="medium">
                Username: {userData.username}
              </OutlineText>
              <OutlineText size="medium">Email: {userData.email}</OutlineText>

              {/* Edit Button in bottom-right */}
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
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
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

            {/* Achievements */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center mb-4">
                <OutlineText size="large">Achievements</OutlineText>
              </div>
              {userData.achievements?.length ? (
                <ul className="list-disc ml-4 sm:ml-6">
                  {userData.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No achievements yet.</p>
              )}
            </div>

            {/* Adventure Progression */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center mb-4">
                <OutlineText size="large">Adventure Progression</OutlineText>
              </div>
              {userData.adventureProgression ? (
                <>
                  <OutlineText size="medium">
                    Stage: {userData.adventureProgression.stage}
                  </OutlineText>
                  <OutlineText size="medium">
                    Levels Unlocked:{" "}
                    {userData.adventureProgression.unlockedLevels.length
                      ? userData.adventureProgression.unlockedLevels.join(", ")
                      : "None"}
                  </OutlineText>
                  <OutlineText size="medium">
                    Monsters Unlocked:{" "}
                    {Object.entries(
                      userData.adventureProgression.unlockedMonsters
                    )
                      .filter(([_, unlocked]) => unlocked)
                      .map(([name]) => name)
                      .join(", ") || "None"}
                  </OutlineText>
                  <OutlineText size="medium">
                    Adventure Achievements:{" "}
                    {userData.adventureProgression.achievements
                      ? userData.adventureProgression.achievements.join(", ")
                      : "None"}
                  </OutlineText>
                </>
              ) : (
                <OutlineText size="medium">
                  No adventure progression yet.
                </OutlineText>
              )}
            </div>
            <ButtonGeneric color="red" size="medium" onClick={Logout}>
              Logout
            </ButtonGeneric>
          </div>
        )}
      </div>
    </div>
  );
};
