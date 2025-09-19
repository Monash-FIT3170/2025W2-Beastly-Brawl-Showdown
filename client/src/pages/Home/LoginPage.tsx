import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { BlackText } from "../../components/texts/BlackText";
import { InputBox } from "../../components/inputs/InputBox";
import { IconButton } from "../../components/buttons/IconButton";
import { OutlineTextResizable } from "../../components/texts/ResizableOutlineText";

export const LoginPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loginListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        FlowRouter.go("/"); // Redirect to home on success
      }
    };

    const registerListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        setMode("login");
        setMessage("Registration successful! Please log in.");
      }
    };

    socket.on("loginResponse", loginListener);
    socket.on("registerResponse", registerListener);

    return () => {
      socket.off("loginResponse", loginListener);
      socket.off("registerResponse", registerListener);
    };
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (mode === "login") {
      socket.emit("login", { email, password });
    } else {
      socket.emit("register", { email, username, password });
    }
  };

  return (
    <BlankPage>
      {/* Scrollable container */}
      <div className="flex flex-col items-center justify-start w-full h-screen overflow-y-auto pt-4 pb-8">
        {/* Top-Left return button */}
        <div className="absolute top-15 left-15 z-20">
          <IconButton
            style="x"
            buttonColour="red"
            iconColour="stroked"
            size="small"
            isDisabled={false}
            onClick={() => FlowRouter.go("/")}
          ></IconButton>
        </div>

        {/* Logo section */}
        <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around mt-8">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 mt-6 px-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Email */}
            <label className="flex flex-col gap-1 text-black">
              <BlackText size="medium">Email:</BlackText>
              <InputBox
                value={email}
                placeholder="Email"
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                type="Email"
              />
            </label>

            {/* Username (register only) */}
            {mode === "register" && (
              <label className="flex flex-col gap-1 text-black">
                <BlackText size="medium">Username:</BlackText>
                <InputBox
                  value={username}
                  placeholder="Username"
                  maxLength={50}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            )}

            {/* Password */}
            <label className="flex flex-col gap-1 text-black">
              <BlackText size="medium">Password:</BlackText>
              <InputBox
                value={password}
                placeholder="Password"
                maxLength={50}
                onChange={(e) => setPassword(e.target.value)}
                type="Password"
              />
            </label>

            {/* Submit Button */}
            <div className="flex justify-center my-6">
              <ButtonGeneric
                color="ronchi"
                size="battle"
                onClick={() => handleSubmit()}
              >
                <OutlineText size="medium-battle-text">
                  {mode === "login" ? "LOG IN" : "REGISTER"}
                </OutlineText>
              </ButtonGeneric>
            </div>

            {/* Message */}
            {message && <p className="text-red-600 text-center">{message}</p>}

            {/* Toggle mode */}
            <div className="text-center mt-3">
              <div className="flex justify-center mt-3">
                <div className="text-center text-sm md:text-base lg:text-lg break-words max-w-full">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <span
                        onClick={() => {
                          setMessage("");
                          setMode("register");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="underline cursor-pointer text-red-600"
                      >
                        Register
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <span
                        onClick={() => {
                          setMessage("");
                          setMode("login");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="underline cursor-pointer text-red-600"
                      >
                        Log in
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BlankPage>
  );
};
