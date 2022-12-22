import React, { useContext } from 'react';
import ChatRoom from './ChatRoom';
import ChatsList from './ChatsList';
import classes from './ChatsHome.module.css';
import FirebaseContext from '../store/firebase-context';

const Chats = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { activeProfileMenu, activeProfileMenuHandler } = firebaseProviderCtx;

  return (
    <div className={classes.chats_home_container}>
      <ChatsList />
      <ChatRoom />
    </div>
  );
};

export default Chats;
