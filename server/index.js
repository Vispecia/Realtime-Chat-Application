const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const server = http.createServer(app);
const io = socketio(server);
const {addUser,removeUser,getUsersInRoom, getuser} = require('./users');
const PORT = process.env.PORT || 5000;

app.use(router)

io.on('connection',socket=>{
       socket.on('join',({name,room},callback)=>{
        
        const {error,user} = addUser({id:socket.id , name,room});

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text:`${user.name} welcome!`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined!`});
        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room,users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user = getuser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message});
               
        callback();
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('message',{user:'admin', text:`${user.name} has left!`});
            // make a list which contains all the active users in client side chat component. 
            io.to(user.room).emit('roomData',{room:user.room,users: getUsersInRoom(user.room)});
        }
  
    })
})

server.listen(PORT,()=>{
    console.log("server is running");
})
