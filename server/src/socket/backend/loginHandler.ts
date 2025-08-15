import { Server, Socket } from "socket.io";
import { getPlayerData, updatePlayerAccount } from "../../database/dbManager";
import { playerAccounts } from "../../../main";

export const loginHandler = (io: Server, socket: Socket) => {
  socket.on("login", async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      socket.emit("loginResponse", {
        success: false,
        message: "Missing Fields",
      });
      return;
    }

    // Verify user credentials
    const user = await getPlayerData(email);
    if (!user || user.password !== password) {
      socket.emit("loginResponse", {
        success: false,
        message: "Invalid Email or Password",
      });
      return;
    }

    // Successful login
    socket.emit("loginResponse", {
      success: true,
      message: "Login Successful",
    });

    // Update the player account in the playerAccounts{socketID: PlayerAccount} map with the logged-in user data
    playerAccounts.set(socket.id, user);
    console.log(
      `Login Successful: Player account updated for socket ID: ${socket.id} with email: ${user.email}`
    );
  });
};

export const accountHandler = (io: Server, socket: Socket) => {
  socket.on("fetchUserData", async () => {
    const user = playerAccounts.get(socket.id);
    console.log(`Emitting player: ${user?.username} data`);

    // Emit event named "userData" with the user object in the payload
    socket.emit("userData", { user });
  });

  socket.on("updatePlayer", async (updates) => {
    const user = playerAccounts.get(socket.id);

    if (!user || !user.email) {
      console.error(`No logged-in player found for socket ${socket.id}`);
      return;
    }

    console.log(`Updating player: ${user.username} with`, updates);

    try {
      await updatePlayerAccount(user._id, updates);
      Object.assign(user, updates);
      playerAccounts.set(socket.id, user);
      console.log(`Player ${user.username} updated successfully.`);
    } catch (error) {
      console.error(`Error updating player ${user.username}: ${error.message}`);
    }
  });
};

export const startChecker = (io: Server, socket: Socket) => {
  socket.on("check-login", async () => {
    const user = playerAccounts.get(socket.id);
    const check = user?.username !== "Default";
    socket.emit("login-status", { loggedIn: Boolean(check) });
  });
};
