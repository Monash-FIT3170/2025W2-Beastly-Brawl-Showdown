import { Server, Socket } from "socket.io";
import { getPlayerData } from "../../database/dbManager";

export const loginHandler = (io: Server, socket: Socket) => {
    socket.on('login',(data) => {
        const  {email,password} = data;
        if(!email || !password){
            socket.emit('loginResponse',{success:false,message: 'Missing Fields'});
            return;
        }

        const user = getPlayerData(email);
        if(!user||user.password !== password){
            socket.emit('loginResponse',{success:false,message:'Invalid Email or Password'});
            return;
        }
        socket.emit('loginResponse',{success:true,message:'Login Successful'});
    });
}