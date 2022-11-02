import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import classes from './ChatRoom.module.css';
import Message from './Message';
import SendMessage from './SendMessage';
import FirebaseContext from '../store/firebase-context';

const ChatRoom = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const activeChatUser = firebaseProviderCtx.activeChatUser;

  useEffect(() => {}, [activeChatUser]);

  return (
    <div className={classes.chat_room}>
      <div className={classes.chat_room_container}>
        <div>
          <p>{activeChatUser && activeChatUser.displayName}</p>
        </div>
        {/* {messages.map(({ id, uid, displayName, photoURL, message }) => {
          return (
            <Message
              key={id}
              id={id}
              uid={uid}
              displayName={displayName}
              photoURL={photoURL}
              message={message}
            />
          );
        })} */}
      </div>

      <SendMessage />
    </div>
  );
};

export default ChatRoom;
