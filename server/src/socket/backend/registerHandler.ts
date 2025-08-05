import { Server, Socket } from "socket.io";
import { getPlayerData,insertNewPlayer } from "../../database/dbManager";

export const registerHandler = (io: Server, socket: Socket) => {
    socket.on('register',(data) => {
        const  {email,username,password} = data;
        if(!email || !username|| !password){
            socket.emit('registerResponse',{success:false,message: 'Missing Fields'});
            return;
        }

        const user = getPlayerData(email);
        if(user){
            socket.emit('registerResponse',{success:false,message:'User already exists'});
            return;
        }
        try{
            insertNewPlayer(email,username,password);
            socket.emit('registerResponse',{success:true,message:'Registration Successful'});
        } catch (error){
            socket.emit('registerResponse',{success:false,message:error.message});
        }
        
    });
}