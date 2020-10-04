import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import User from './User';

import './Messages.css';

const Users = ({ users }) => (
  <ScrollToBottom className="messages">
    {users.map((user, i) => <div key={i}><User user={user.name}/></div>)}
  </ScrollToBottom>
);

export default Users;