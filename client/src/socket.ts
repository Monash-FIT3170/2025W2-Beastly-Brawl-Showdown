import { io } from "socket.io-client";
import { Meteor } from "meteor/meteor";

console.log("SOCKET URL: ", Meteor.settings.public.SOCKET_URL);
const socket = io(Meteor.settings.public.SOCKET_URL);

export default socket;
