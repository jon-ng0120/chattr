import React, { useState, useEffect, useRef } from 'react';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import classes from './ChatRoom.module.css';
import Message from './Message';
import UserInput from './UserInput';

const ChatRoom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const { uid } = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const joinedIDs = [user.uid, uid].sort().join('');
      const chatRef = doc(db, 'chatrooms', joinedIDs);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        setMessages([]);
      }

      onSnapshot(chatRef, (snapshot) => {
        if (snapshot.data()) {
          setMessages(snapshot.data().messages);
        }
      });
    };
    fetchData();
  }, [user]);

  return (
    <div className={classes.chat_room}>
      <div className={classes.chat_room_container}>
        {messages.map(({ id, uid, displayName, photoURL, message }) => {
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
        })}
      </div>

      <UserInput chatUser={user} />
    </div>
  );
};

export default ChatRoom;
