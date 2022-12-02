import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import classes from './ChatRoom.module.css';
import Message from './Message';
import SendMessage from './SendMessage';
import FirebaseContext from '../store/firebase-context';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const firebaseProviderCtx = useContext(FirebaseContext);
  const bottomRef = useRef(null);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  return (
    <div className={classes.chat_room}>
      {activeChatUser && (
        <div className={classes.chat_room_container}>
          <div className={classes.display_info}>
            <img
              src={activeChatUser.photoURL}
              className={classes.display_photo}
            />
            <p className={classes.display_name}>
              {activeChatUser && activeChatUser.displayName}
            </p>
          </div>
          <div className={classes.chats_container}>
            {messages.map((message) => {
              const messageData = message.data();

              return (
                <Message
                  key={messageData.id}
                  id={messageData.id}
                  uid={messageData.uid}
                  timestamp={messageData.sentAt}
                  displayName={
                    loggedInUser.uid === messageData.uid
                      ? loggedInUser.displayName
                      : activeChatUser.displayName
                  }
                  photoURL={
                    loggedInUser.uid === messageData.uid
                      ? loggedInUser.photoURL
                      : activeChatUser.photoURL
                  }
                  message={messageData.message}
                />
              );
            })}
            <span ref={bottomRef} />
          </div>

          {activeChatUser && <SendMessage />}
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
