import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { InputBox } from "../../components/inputs/InputBox";
import { IconButton } from "../../components/buttons/IconButton";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";

// -----------------------------
// Hook to get window width for responsiveness
const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

// -----------------------------
// Schema types
interface PlayerAccountSchema {
  _id: string;
  email?: string;
  username?: string;
  password?: string;
  stats?: {
    numGamesPlayed?: number;
    numGamesWon?: number;
  };
}

// -----------------------------
// Profile Edit Form
const ProfileEditForm = ({
  formData,
  setFormData,
  handleSave,
  setEditing,
  isMobile,
}: {
  formData: PlayerAccountSchema | null;
  setFormData: React.Dispatch<React.SetStateAction<PlayerAccountSchema | null>>;
  handleSave: () => void;
  setEditing: (editing: boolean) => void;
  isMobile: boolean;
}) => (
  <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] flex flex-col gap-4 sm:gap-6 border-2 border-black max-w-[800px] w-full">
    <div className="text-center">
      <OutlineText size={isMobile ? "large" : "large"}>Profile</OutlineText>
    </div>

    <OutlineText size={isMobile ? "medium" : "medium"}>Username:</OutlineText>
    <InputBox
      id="username"
      value={formData?.username ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev!, username: e.target.value }))
      }
      maxLength={50}
      placeholder="Enter New Username"
    />

    <OutlineText size={isMobile ? "medium" : "medium"}>Email:</OutlineText>
    <InputBox
      id="email"
      type="email"
      value={formData?.email ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev!, email: e.target.value }))
      }
      maxLength={50}
      placeholder="Enter New Email"
    />

    <OutlineText size={isMobile ? "medium" : "medium"}>Password:</OutlineText>
    <InputBox
      id="password"
      type="password"
      value={formData?.password ?? ""}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev!, password: e.target.value }))
      }
      maxLength={50}
      placeholder="Enter New Password"
    />

    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
      <ButtonGeneric
        color="blue"
        size={isMobile ? "battle" : "medium"}
        onClick={handleSave}
      >
        Save
      </ButtonGeneric>
      <ButtonGeneric
        color="red"
        size={isMobile ? "battle" : "medium"}
        onClick={() => setEditing(false)}
      >
        Cancel
      </ButtonGeneric>
    </div>
  </div>
);

// -----------------------------
// Profile View Form
const ProfileView = ({
  userData,
  isMobile,
  startEditing,
  Logout,
}: {
  userData: PlayerAccountSchema | null;
  isMobile: boolean;
  startEditing: () => void;
  Logout: () => void;
}) => (
  <>
    <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black max-w-[800px] w-full relative ">
      <div className="text-center mb-4">
        <OutlineText size={isMobile ? "large" : "large"}>Profile</OutlineText>
      </div>
      <OutlineText size={isMobile ? "medium" : "medium"}>
        Username: {userData?.username}
      </OutlineText>
      <OutlineText size={isMobile ? "medium" : "medium"}>
        Email: {userData?.email}
      </OutlineText>

      {/* Only show the edit button on desktop */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4">
          <ButtonGeneric color="blue" size="medium" onClick={startEditing}>
            Edit Profile
          </ButtonGeneric>
        </div>
      )}
    </div>

    {/* Mobile-only Edit Profile button */}
    {isMobile && (
      <div className="block lg:hidden mt-2">
        <ButtonGeneric color="blue" size="battle" onClick={startEditing}>
          Edit Profile
        </ButtonGeneric>
      </div>
    )}

    <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black max-w-[800px] w-full mt-4 ">
      <div className="text-center mb-4">
        <OutlineText size={isMobile ? "large" : "large"}>Stats</OutlineText>
      </div>
      <OutlineText size={isMobile ? "medium" : "medium"}>
        Games Played: {userData?.stats?.numGamesPlayed ?? 0}
      </OutlineText>
      <OutlineText size={isMobile ? "medium" : "medium"}>
        Games Won: {userData?.stats?.numGamesWon ?? 0}
      </OutlineText>
    </div>

    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4 ">
      <ButtonGeneric
        color="purple"
        size={isMobile ? "battle" : "large"}
        onClick={() => FlowRouter.go("/achievements")}
      >
        Achievements
      </ButtonGeneric>
      <ButtonGeneric
        color="red"
        size={isMobile ? "battle" : "large"}
        onClick={Logout}
      >
        Logout
      </ButtonGeneric>
    </div>
  </>
);

// -----------------------------
// Main Account Page
export const Account = () => {
  const width = useWindowSize();
  const isMobile = width < 1024;

  const [userData, setUserData] = useState<PlayerAccountSchema | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<PlayerAccountSchema | null>(null);

  useEffect(() => {
    socket.emit("fetchUserData");
    const handler = ({ user }) => setUserData(user);
    socket.on("userData", handler);
    return () => socket.off("userData", handler);
  }, []);

  // -----------------------------
  // FIXED: Keep input focus while editing
  const startEditing = () => {
    setFormData({ ...userData }); // preserve existing values
    setEditing(true);
  };

  const Logout = () => {
    socket.emit("logout");
    socket.on("logoutSuccessful", () => FlowRouter.go("/"));
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
      <div className="flex flex-row w-full p-4">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size={isMobile ? "large" : "large"}
          onClick={() => FlowRouter.go("/")}
        />
      </div>

      <div className="flex flex-col h-screen lg:p-[1rem] p-[2rem] relative -top-12 items-center gap-6">
        <BaseCard color="peach" width={isMobile ? 50 : 70} height={8}>
          <OutlineText size={isMobile ? "large" : "extraLarge"}>
            MY ACCOUNT
          </OutlineText>
        </BaseCard>

        {editing ? (
          <ProfileEditForm
            formData={formData}
            setFormData={setFormData}
            handleSave={handleSave}
            setEditing={setEditing}
            isMobile={isMobile}
          />
        ) : (
          <ProfileView
            userData={userData}
            isMobile={isMobile}
            startEditing={startEditing}
            Logout={Logout}
          />
        )}
      </div>
    </BlankPage>
  );
};
