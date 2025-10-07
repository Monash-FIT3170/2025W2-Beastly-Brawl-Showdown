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
      <div className="flex flex-col w-full p-4">
        {/* Back button */}
        <div className="flex flex-row w-full mb-4">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="large"
            onClick={() => FlowRouter.go("/Account")}
          />
        </div>

        {/* Achievements Header */}
        <BaseCard color="peach" width={70} height={8} className="mb-6 mx-auto flex justify-center">
          <OutlineText size="extraLarge">Achievements</OutlineText>
        </BaseCard>

        {/* Outer container for achievement cards with static size */}
        <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black mx-auto flex flex-col items-center"
             style={{ width: "90%", maxWidth: "900px", height: "500px" }}>
          <div className="w-full overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
              {achievements.map((ach) => (
                <BaseCard
                  key={ach._id}
                  color="peach"
                  width={50}
                  height={5}
                  className="cursor-pointer flex flex-col justify-center items-center p-2 hover:scale-105 transition-transform"
                  onClick={() => handleClick(ach)}
                >
                  <OutlineText size="medium" className="text-center">
                    {ach.hidden ? "Hidden Achievement" : ach.name}
                  </OutlineText>
                  <OutlineText size="tiny" className="text-center">
                    {ach.hidden ? "Unlock achievement to see" : `${ach.progress} / ${ach.goal}`}
                  </OutlineText>
                </BaseCard>
              ))}
            </div>
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
              className="p-6 relative flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <OutlineText size="extraLarge" className="mb-4 text-center">
                {selected.name}
              </OutlineText>
              <p className="mb-2 text-center">{selected.description}</p>
              <p className="text-center">
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
