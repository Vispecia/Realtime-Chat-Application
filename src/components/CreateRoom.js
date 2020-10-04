import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import './Home.css';
const room = uuidv4();
function CreateRoom()
{
    const [name,setName] = useState('');
    
    
    return(
        <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <p className="heading">Room id: {room}</p>
          </div>
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className={'button mt-20'} type="submit">Join In</button>
          </Link>
        </div>
      </div>
    );
}

export default CreateRoom;