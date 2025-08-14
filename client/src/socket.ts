import { io } from "socket.io-client";
import { local_ipv4 } from "../IPtest";

const local_port = "3000"; // socket port
const socket = io(`${local_ipv4}:${local_port}`);

export default socket;
