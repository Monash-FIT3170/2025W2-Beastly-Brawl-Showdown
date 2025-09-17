import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
export const Achievements = () => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Ask server for login status
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
      setLoading(false); // Done loading once we get response
    };

    socket.on("login-status", handleLoginStatus);

    return () => socket.off("login-status", handleLoginStatus);
  }, []);

  return (
    <BlankPage>
      <div className="py-6 sm:py-8">
        <GenericHeader color="lightYellow">
          <OutlineText size="extraLarge">Achievements</OutlineText>
        </GenericHeader>
      </div>

      {/* <div className="p-4 sm:p-6 rounded-2xl shadow bg-[#EDAF55] border-2 border-black">
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
      </div> */}
    </BlankPage>
  );
};
