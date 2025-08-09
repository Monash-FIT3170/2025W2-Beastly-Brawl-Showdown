import { Server, Socket } from "socket.io";
import { getPlayerData,insertNewPlayerAccount } from "../../database/dbManager";

export const registerHandler = (io: Server, socket: Socket) => {
    socket.on('register', async (data) => {
        const  {email,username,password} = data;
        if(!email || !username|| !password){
            socket.emit('registerResponse',{success:false,message: 'Missing Fields'});
            return;
        }

        const user = await getPlayerData(email);
        if(user){
            socket.emit('registerResponse',{success:false,message:'User already exists'});
            return;
        }
        try{
            insertNewPlayerAccount(email,username,password);
            socket.emit('registerResponse',{success:true,message:'Registration Successful'});
        } catch (error){
            socket.emit('registerResponse',{success:false,message:error.message});
        }
        
    });
}