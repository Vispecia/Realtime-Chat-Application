import React from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import CreateRoom from './components/CreateRoom';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/chat"  component={Chat}/>
      <Route path='/create-room' component={CreateRoom}/>
    </Router>
  );
}

export default App;
