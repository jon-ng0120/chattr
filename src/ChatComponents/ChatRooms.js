import React, { useEffect, useState } from 'react';
import UserSearch from '../Search/UserSearch';
import ChatRoom from './ChatRoom';
import classes from './ChatRooms.module.css';

const ChatRooms = () => {
  const [activeChatUser, setActiveChatUser] = useState();

  const setActiveChatHandler = (user) => {
    setActiveChatUser(user);
  };

  return (
    <div className={classes.chat_rooms}>
      <UserSearch setActiveChatHandler={setActiveChatHandler} />
      {activeChatUser && <ChatRoom user={activeChatUser} />}
    </div>
  );
};

export default ChatRooms;
