import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { IconButton } from "../../components/buttons/IconButton";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
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

  const handleClick = (ach: AchievementSchema) => setSelected(ach);
  const closePopup = () => setSelected(null);

  return (
    <BlankPage>
      <div className="flex flex-col w-full h-full p-4">
        {/* Back button */}
        <div className="flex flex-row w-full mb-4">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="large"
            onClick={() => FlowRouter.go("/")}
          />
        </div>

        {/* Header */}
        <BaseCard color="peach" width={70} height={8} className="mb-6">
          <OutlineText size="extraLarge">Achievements</OutlineText>
        </BaseCard>

        {/* Scrollable achievements grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map((ach) => (
              <BaseCard
                key={ach._id}
                color={ach.status ? "green" : "gray"}
                width={50}
                height={5}
                className="cursor-pointer flex flex-col justify-center items-center p-2 hover:scale-105 transition-transform"
                onClick={() => handleClick(ach)}
              >
                <OutlineText size="medium">
                  {ach.hidden ? "Hidden Achievement" : ach.name}
                </OutlineText>
                <p className="text-sm text-center mt-1">
                  {ach.hidden
                    ? "Unlock achievement to see"
                    : `${ach.progress} / ${ach.goal}`}
                </p>
              </BaseCard>
            ))}
          </div>
        </div>

        {/* Achievement Popup */}
        {selected && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            onClick={closePopup}
          >
            <BaseCard
              color="peach"
              width={60}
              height={40}
              className="p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <OutlineText size="extraLarge" className="mb-4">
                {selected.name}
              </OutlineText>
              <p className="mb-2">{selected.description}</p>
              <p>
                Progress: {selected.progress} / {selected.goal}
              </p>
              <button
                className="absolute top-2 right-2 text-red-600 font-bold"
                onClick={closePopup}
              >
                X
              </button>
            </BaseCard>
          </div>
        )}
      </div>
    </BlankPage>
  );
};
