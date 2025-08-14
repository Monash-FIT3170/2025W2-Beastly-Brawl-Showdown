import { io } from "socket.io-client";

const socket = process.env.NODE_ENV === "development"
  ? io("http://localhost:3002") // For local development
  : io("/", { path: "/socket.io", transports: ["websocket", "polling"] }); // For production

export default socket;
