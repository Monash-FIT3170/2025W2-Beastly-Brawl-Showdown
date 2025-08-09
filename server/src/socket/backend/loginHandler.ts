import { Server, Socket } from "socket.io";
import { getPlayerData } from "../../database/dbManager";
import { playerAccounts } from "../../../main";

export const loginHandler = (io: Server, socket: Socket) => {
    socket.on('login', async (data) => {
        const  {email,password} = data;
        if(!email || !password){
            socket.emit('loginResponse',{success:false,message: 'Missing Fields'});
            return;
        }
        
        // Verify user credentials
        const user = await getPlayerData(email);
        if(!user||user.password !== password){
            socket.emit('loginResponse',{success:false,message:'Invalid Email or Password'});
            return;
        }

        // Successful login
        socket.emit('loginResponse',{success:true,message:'Login Successful'});

        // Update the player account in the playerAccounts{socketID: PlayerAccount} map with the logged-in user data
        playerAccounts.set(socket.id, user);
        console.log(`Login Successful: Player account updated for socket ID: ${socket.id} with email: ${user.email}`);
    });
}