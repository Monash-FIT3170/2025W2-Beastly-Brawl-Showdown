import { Meteor } from "meteor/meteor";
import { Link, LinksCollection } from "/imports/api/links";
import { Task, TasksCollection } from "/imports/api/tasks";
import "/imports/api/tasksMethods";
import http from "node:http";
import { Server } from "socket.io";
import { User } from "./user";
import { Room } from "./room";

const users = new Map<string, User>();
const rooms = new Map<string, Room>();

async function insertLink({ title, url }: Pick<Link, "title" | "url">) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

export async function insertTask({ text }: Pick<Task, "text">) {
  await TasksCollection.insertAsync({ text });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com",
    });

    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // If the Tasks collection is empty, add some data.
  if ((await TasksCollection.find().countAsync()) === 0) {
    await insertTask({
      text: "Sample Task 1!",
    });

    await insertTask({
      text: "Sample Task 2!",
    });
  }

  // We publish the entire Tasks collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("tasks", function () {
    return TasksCollection.find();
  });

  const server = http.createServer();
  const PORT = 3002;
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("create_user", (data: { user: string }) => {
      // Create the user
      let user = new User(socket.id, data.user);
      users.set(socket.id, user);
    });

    socket.on("join_room", (data: { room: string }) => {
      // Get the user, do nothing if user doesn't exist yet
      let user = users.get(socket.id);

      if (user) {
        // Join the room, create it if it doesn't exist

        // Room already exists
        if (rooms.has(data.room)) {
          let room = rooms.get(data.room);
          if (room) {
            // Add user to the room
            room.addUser(user);
          }

          // Room doesn't exist
        } else {
          let room = new Room(data.room);
          rooms.set(data.room, room);

          // Add user to the room
          room.addUser(user);
        }

        // Now let the socket join the room
        socket.join(data.room);
      }
    });

    socket.on(
      "send_message",
      (data: { user: string; sendToRoom: string; message: string }) => {
        // Client sends to server, then server redirects message to the room
        socket.to(data.sendToRoom).emit("receive_message", {
          user: data.user,
          room: data.sendToRoom,
          message: data.message,
        });
      }
    );

    socket.on("disconnect", () => {});
  });

  server.listen(PORT, () => {});
});
