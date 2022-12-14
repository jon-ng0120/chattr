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

  const {
    loggedInUser,
    activeChatUser,
    db,
    checkMobileView,
    mobileChatRoomView,
    darkMode,
  } = firebaseProviderCtx;

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
    <React.Fragment>
      {activeChatUser && (
        <div
          className={`${classes.chat_room_container} ${
            mobileChatRoomView ? classes.active : classes.hidden
          } ${darkMode || classes.light}`}
        >
          <div
            className={`${classes.display_info} ${darkMode || classes.light}`}
          >
            <button
              className={`material-icons ${classes.back_button} ${
                darkMode || classes.light
              }`}
              onClick={() => checkMobileView()}
            >
              arrow_back
            </button>
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
    </React.Fragment>
  );
};

export default ChatRoom;
