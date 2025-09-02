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
  maxHealth: number;
  attackBonus: number;
  armourClass: number;
}

interface AdventureProgressionSchema {
  unlockedMonsters: Record<string, boolean>;
  unlockedLevels: number[];
  stage: number;
  achievments: string[];
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
  achievments?: string[];
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
      <div className="flex-shrink-0 relative py-4 sm:py-6 border-b bg-springLeaves shadow">
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/")}
          />
        </div>
        <GenericHeader color="lightYellow">
          <OutlineText size="extraLarge">Account Details</OutlineText>
        </GenericHeader>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-4 sm:gap-6 pt-[100px] sm:pt-[120px]">
        {!userData ? (
          <p>Loading account details...</p>
        ) : editing ? (
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[600px] sm:max-w-[900px] mx-auto">
            {/* Profile Editing */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] flex flex-col gap-3 sm:gap-4 border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">Profile</OutlineText>
              </div>
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
              <InputBox
                value={formData?.email ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev!, email: e.target.value }))
                }
                maxLength={50}
                placeholder="Enter New Email"
              />
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[600px] sm:max-w-[900px] mx-auto">
            {/* Profile Info */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">Profile</OutlineText>
              </div>
              <OutlineText size="large">
                Username: {userData.username}
              </OutlineText>
              <OutlineText size="large">Email: {userData.email}</OutlineText>
              <OutlineText size="large">Level: {userData.level}</OutlineText>
            </div>

            {/* Stats */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">Stats</OutlineText>
              </div>
              <OutlineText size="large">
                Games Played: {userData.stats?.numGamesPlayed ?? 0}
              </OutlineText>
              <OutlineText size="large">
                Games Won: {userData.stats?.numGamesWon ?? 0}
              </OutlineText>
            </div>

            {/* Achievements */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">Achievements</OutlineText>
              </div>
              {userData.achievments?.length ? (
                <ul className="list-disc ml-4 sm:ml-6">
                  {userData.achievments.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              ) : (
                <p>No achievements yet.</p>
              )}
            </div>

            {/* Monsters */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">Monster Stats</OutlineText>
              </div>
              {userData.monstersStat?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {userData.monstersStat.map((m, idx) => (
                    <div key={idx} className="border p-2 sm:p-3 rounded-lg">
                      <p className="font-bold">{m.monsterId}</p>
                      <p>Health: {m.maxHealth}</p>
                      <p>Attack Bonus: {m.attackBonus}</p>
                      <p>Armour Class: {m.armourClass}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No monster stats yet.</p>
              )}
            </div>

            {/* Adventure Progression */}
            <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
              <div className="text-center font-bold">
                <OutlineText size="extraLarge">
                  Adventure Progression
                </OutlineText>
              </div>
              {userData.adventureProgression ? (
                <>
                  <p>Stage: {userData.adventureProgression.stage}</p>
                  <p>
                    Levels Unlocked:{" "}
                    {userData.adventureProgression.unlockedLevels.length
                      ? userData.adventureProgression.unlockedLevels.join(", ")
                      : "None"}
                  </p>
                  <p>
                    Monsters Unlocked:{" "}
                    {Object.entries(
                      userData.adventureProgression.unlockedMonsters
                    )
                      .filter(([_, unlocked]) => unlocked)
                      .map(([name]) => name)
                      .join(", ") || "None"}
                  </p>
                  <p>
                    Adventure Achievements:{" "}
                    {userData.adventureProgression.achievments.length
                      ? userData.adventureProgression.achievments.join(", ")
                      : "None"}
                  </p>
                </>
              ) : (
                <p>No adventure progression yet.</p>
              )}
            </div>

            {/* Edit Button */}
            <div className="flex justify-center">
              <ButtonGeneric color="blue" size="medium" onClick={startEditing}>
                Edit Profile
              </ButtonGeneric>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
