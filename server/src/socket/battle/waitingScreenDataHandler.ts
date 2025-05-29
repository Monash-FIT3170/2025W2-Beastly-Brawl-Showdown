import { players, activeGameSessions } from "../../../main";


// Used to handle the Lobby's stats page + Display Player's current monster 
export const waitingScreenDataHandler = (io: Server, socket: Socket) => {

    // Receives request for returning player's information
    socket.on("request_waiting_screen_data", () => {
        console.log(`Received request for waiting screen data from ${socket.id}`);

        // Get player based on socket ID
        const player = players.get(socket.id);
        if (!player) {
            console.error(`Player ${socket.id} not found`);
            return;
        }

        // Get the player's monster 
        // NOTE: For future, we could instead send a Monster object if we need additional information to display on stats page
        const monster = player.getMonster()?.getId();
        console.log(`Player's monster name: ${monster}`);

        // Emit the result back to the client
        io.to(socket.id).emit("waiting_screen_data", {
            monsterName: monster,
        });
    }); 

};