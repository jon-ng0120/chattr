import React, { useContext } from 'react';
import ChatRoom from './ChatRoom';
import ChatsList from './ChatsList';
import classes from './ChatsHome.module.css';

const Chats = () => {
  return (
    <div className={classes.chats_home_container}>
      <ChatsList />
      <ChatRoom />
    </div>
  );
};

export default Chats;
