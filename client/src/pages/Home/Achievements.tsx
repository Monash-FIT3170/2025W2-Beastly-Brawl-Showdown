// Achievements.tsx
import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { IconButton } from "../../components/buttons/IconButton";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
import { BlackText } from "../../components/texts/BlackText";
import { OutlineText } from "../../components/texts/OutlineText";

interface AchievementSchema {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  progress: number;
  goal: number;
  objectives: Record<string, boolean | number>;
  hidden: boolean;
}

export const Achievements = () => {
  const [achievements, setAchievements] = useState<AchievementSchema[]>([]);
  const [selected, setSelected] = useState<AchievementSchema | null>(null);

  useEffect(() => {
    socket.emit("fetchAchievement");
    const handler = ({ achievements }) => setAchievements(achievements);
    socket.on("achievementData", handler);
    return () => socket.off("achievementData", handler);
  }, []);

  const handleClick = (ach: AchievementSchema) => {
    if (!ach.hidden) {
      setSelected(ach);
    }
  };
  const closePopup = () => setSelected(null);

  // Desktop Layout
  const DesktopView = () => (
    <div className="hidden lg:flex flex-col items-center w-full gap-6">
      <BaseCard
        color="peach"
        width={70}
        height={8}
        className="flex justify-center mb-4"
      >
        <OutlineText size="extraLarge">Achievements</OutlineText>
      </BaseCard>

      <div
        className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] outline-consistent w-full max-w-[900px] flex flex-col items-center"
        style={{ height: "500px" }}
      >
        <div className="w-full overflow-y-auto flex flex-col gap-4">
          {achievements.map((ach) => (
            <BaseCard
              key={ach._id}
              color={ach.status ? "pictonBlue" : "peach"}
              width={53}
              height={5}
              className="cursor-pointer flex flex-col justify-center items-center p-2 hover:shadow-lg hover:border-yellow-400 transition-all"
              onClick={() => handleClick(ach)}
            >
              <OutlineText size="medium" className="text-center">
                {ach.hidden ? "Hidden Achievement" : ach.name}
              </OutlineText>
              <BlackText size="tiny" className="text-center">
                {ach.hidden
                  ? "Unlock achievement to see"
                  : `${ach.progress} / ${ach.goal}`}
              </BlackText>
            </BaseCard>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile Layout
  const MobileView = () => (
    <div className="flex lg:hidden flex-col items-center w-full gap-6">
      <BaseCard
        color="peach"
        width={50}
        height={8}
        className="flex justify-center mb-4"
      >
        <OutlineText size="large">Achievements</OutlineText>
      </BaseCard>

      <div
        className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] outline-consistent w-full flex flex-col items-center"
        style={{ height: "1300px" }}
      >
        <div className="w-full overflow-y-auto flex flex-col gap-4">
          {achievements.map((ach) => (
            <BaseCard
              key={ach._id}
              color="peach"
              width={50}
              height={8}
              className="cursor-pointer flex flex-col justify-center items-center p-2 hover:scale-105 transition-transform"
              onClick={() => handleClick(ach)}
            >
              <OutlineText size="medium" className="text-center">
                {ach.hidden ? "Hidden Achievement" : ach.name}
              </OutlineText>
              <OutlineText size="tiny" className="text-center">
                {ach.hidden
                  ? "Unlock achievement to see"
                  : `${ach.progress} / ${ach.goal}`}
              </OutlineText>
            </BaseCard>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <BlankPage>
      <div className="flex flex-col w-full p-4 overflow-auto">
        {/* Back button */}
        <div className="flex flex-row w-full mb-4">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/Account")}
          />
        </div>

        <DesktopView />
        <MobileView />

        {/* Achievement Popup */}
        {selected && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50"
            onClick={closePopup}
          >
            <BaseCard
              color="peach"
              width={60}
              height={40}
              className="p-6 relative flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top-left close button */}
              <div className="absolute top-2 left-2">
                <IconButton
                  style="arrowleft"
                  iconColour="black"
                  buttonColour="red"
                  size="large"
                  onClick={closePopup}
                />
              </div>

              {/* Achievement content */}
              <div className="absolute top-2 ">
                <OutlineText size="extraLarge">{selected.name}</OutlineText>
              </div>

              <OutlineText size="large">{selected.description}</OutlineText>
              <OutlineText size="large">
                {"Progress: " + selected.progress + " / " + selected.goal}
              </OutlineText>
            </BaseCard>
          </div>
        )}
      </div>
    </BlankPage>
  );
};
