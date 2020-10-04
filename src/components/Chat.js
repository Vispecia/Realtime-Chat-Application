import React,{useEffect,useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from './Infobar';
import Input from './Input';
import './Chat.css';
import Messages from './Messages';
import Users from './Users';


let socket;
const ENDPOINT = 'localhost:5000';

function Chat({ location })  
{

    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [roomData,setRoomData] = useState([]);


    useEffect(()=>{
        const {name,room} = queryString.parse(location.search); 
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},()=>{

        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT,location.search] );


    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    useEffect(()=>{
        socket.on('roomData',(data)=>{
            setRoomData(data.users);
        })
    },[roomData]);



    const sendMessage = (e)=>{
        e.preventDefault();

        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    console.log(messages,message);


    return(
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
            </div>

            <div className="container" style={{margin:10,width:200}}>
                <Users users={roomData}/>
            </div>

        </div>
    );
}

export default Chat;