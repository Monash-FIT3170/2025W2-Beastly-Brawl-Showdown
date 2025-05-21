import { io } from "socket.io-client";
import { local_ipv4 } from "../IPtest";

const local_port = "3002";
const socket = io(`${local_ipv4}:${local_port}`);

//@ uni
//anika 118.138.113.235
//derek 118.138.0.106

export default socket;
