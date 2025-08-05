import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { PopupClean } from "./PopupClean";

interface AuthPopupProps {
  onAuthSuccess: (username: string) => void;
  onClose: () => void;
}

export const AuthPopup: React.FC<AuthPopupProps> = ({ onAuthSuccess, onClose }) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // only for register
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loginHandler = (data: { success: boolean; message: string; username?: string }) => {
      setMessage(data.message);
      if (data.success && data.username) {
        onAuthSuccess(data.username);
      }
    };

    const registerHandler = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        // after successful registration, switch to login or auto-login
        setMode("login");
        setMessage("Registration successful! Please log in.");
      }
    };

    socket.on("loginResponse", loginHandler);
    socket.on("registerResponse", registerHandler);

    return () => {
      socket.off("loginResponse", loginHandler);
      socket.off("registerResponse", registerHandler);
    };
  }, [onAuthSuccess]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("login", { email, password });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("register", { email, username, password });
  };

  return (
    <PopupClean>
      {mode === "login" ? (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded border"
          />
          <button type="submit" className="bg-[#403245] text-white py-2 rounded">
            Log In
          </button>
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
              className="underline"
            >
              Register here
            </button>
          </p>
          {message && <p className="text-red-600">{message}</p>}
          <button
            type="button"
            onClick={onClose}
            className="mt-2 underline text-sm"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 rounded border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded border"
          />
          <button type="submit" className="bg-[#403245] text-white py-2 rounded">
            Register
          </button>
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
              className="underline"
            >
              Log in here
            </button>
          </p>
          {message && <p className="text-red-600">{message}</p>}
          <button
            type="button"
            onClick={onClose}
            className="mt-2 underline text-sm"
          >
            Cancel
          </button>
        </form>
      )}
    </PopupClean>
  );
};
