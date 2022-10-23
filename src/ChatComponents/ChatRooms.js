import React, { useEffect, useState } from 'react';
import UserSearch from '../Search/UserSearch';
import ChatRoom from './ChatRoom';
import classes from './ChatRooms.module.css';
import ChatsList from './ChatsList';

const ChatRooms = () => {
  const [activeChatUser, setActiveChatUser] = useState();

  const setActiveChatHandler = (user) => {
    setActiveChatUser(user);
  };

  return (
    <div>
      <UserSearch setActiveChatHandler={setActiveChatHandler} />
      <div>
        <ChatsList />
        {activeChatUser && <ChatRoom user={activeChatUser} />}
      </div>
    </div>
  );
};

export default ChatRooms;
