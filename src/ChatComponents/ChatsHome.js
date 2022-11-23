import React, { useContext } from 'react';
import UserSearch from '../Search/UserSearch';
import ChatRoom from './ChatRoom';
import ChatsList from './ChatsList';

const Chats = () => {
  return (
    <div>
      <UserSearch />
      <ChatsList />
      <ChatRoom />
    </div>
  );
};

export default Chats;
