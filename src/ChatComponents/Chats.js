import React, { useContext } from 'react';
import UserSearch from '../Search/UserSearch';
import ChatRoom from './ChatRoom';

const Chats = () => {
  return (
    <div>
      <UserSearch />
      <ChatRoom />
    </div>
  );
};

export default Chats;
