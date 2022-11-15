import React, { useContext, useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  orderBy,
  QuerySnapshot,
} from 'firebase/firestore';
import classes from './ChatRoom.module.css';
import Message from './Message';
import SendMessage from './SendMessage';
import FirebaseContext from '../store/firebase-context';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const firebaseProviderCtx = useContext(FirebaseContext);

  const { loggedInUser, activeChatUser, db } = firebaseProviderCtx;

  useEffect(() => {
    const getMessages = async () => {
      const joinedIDs = [loggedInUser.uid, activeChatUser.uid].sort().join('');

      const messagesRef = collection(db, 'messages');
      const messagesQuery = query(
        messagesRef,
        where('chatRoomId', '==', joinedIDs),
        orderBy('sentAt')
      );

      onSnapshot(messagesQuery, (querySnapshot) => {
        setMessages(querySnapshot.docs);
      });
    };

    activeChatUser && getMessages();
  }, [activeChatUser]);
  console.log(messages);

  return (
    <div className={classes.chat_room}>
      <div className={classes.chat_room_container}>
        <div>
          <p>{activeChatUser && activeChatUser.displayName}</p>
        </div>
        {messages.map((message) => {
          const messageData = message.data();

          return (
            <Message
              key={messageData.id}
              id={messageData.id}
              uid={messageData.uid}
              displayName={messageData.displayName}
              photoURL={messageData.photoURL}
              message={messageData.message}
            />
          );
        })}
      </div>

      <SendMessage />
    </div>
  );
};

export default ChatRoom;
